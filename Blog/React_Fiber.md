---
title: React Fiber初探
type: categories
copyright: true
date: 2020-05-16 9:34:00
tags: React架构
categories: React
---
### scheduler
1. fiber reconcifer的过程，决定什么时候做什么
2. stack reconcifer是一气呵成的，但需要考虑一些情况，不是所有的state更新都要实时显示，不同state更新的优先级应该不同，高优先级可以打断低优先级
3. 在fiber reconcifer，每次做一个小任务，再回主线程看看有没有更高优先级的任务需要处理，有的话优先执行，没有的话继续

假如我们安排100ms来更新视图和虚拟dom，40ms给浏览器做其他事情，如果我们不需要100ms来更新或者浏览器需要超过40ms，就需要进行时间的调度，浏览器有一些api可供选择

1. requestAnimationFrame：帧数控制调用，做动画
2. requestIdleCallback：闲时调用
3. web worker：多线程调用
4. intersectionObserver：进入可视区调用，比如虚拟列表

客户端线程执行任务以帧为单位，30-60不会影响用户体验，每两个帧之间主线程会有空闲，这时候requestIdleCallback可以调用回调，执行任务。
* requestIdleCallback来处理低优先级任务，提高deadline，任务执行限制时间来切分任务，避免长时间执行，导致阻塞UI渲染而掉帧
* requestAnimationFrame处理高优先级任务

### stack reconciler
1. 工作流程类似函数调用，从父节点进行遍历，找出不同，才能找出需要修改的信息，传递给renderer，进行渲染，再显示在屏幕上
2. 这个过程主线程被react占住，大型项目中会出现屏幕卡顿
3. 代码中有元素的创建或者更新，react会根据这些元素创建虚拟dom，diff算法，更新真实dom，dom的更新是同步的，也就意味着在diff过程中，发现不同的instance，立刻执行dom操作

### fiber reconciler
1. 操作可以分成小部分，可以被中断
2. fiber有四个属性，stateNode管理instance自身的特性，通过child（第一个孩子）和sibling（右边的兄弟）表示下一个工作单位，return（父节点）表示返回结果需要合并的目标。整个结构是个链表树，每个fiber单位执行完，会查看是否拥有主线程时间片，有的话继续，没有的话先处理高优先级事务
3. 页面渲染，react生成一个fiber tree，类似虚拟dom树，同时维护一个workInProgressTree，用于计算更新

### fiber工作流程
1. 组件更新，更新的state加入当前组件的update queue，交给scheduler
2. 使用requestIdleCallback api，浏览器不支持用pollyfill，scheduler根据主线程的情况处理这次update
3. reconciliation过程得到时间片，进入work loop（让react在计算状态和等待状态间切换）
4. 每个loop需要追踪下一个工作单元和当前还能占据主线程的时间
5. 第一个loop，下一个待处理单元为根节点，因为根节点对应的update队列为空，直接将根节点复制到workInProgrssTree
6. 再复制其子节点，子节点向其父节点返回，标志父节点处理结束，此时react检查时间片是否用完，没有用完处理下一个
7. 子节点包含更新，react会调用setState的updater函数获得最新state值，需要传入一个函数
```javascript
setState({}, callback); // stack conciler
setState(() => { return {} }, callback); // fiber conciler
```
8. 得到最新的state，react会更新props和state，调用render，得到elements，然后决定是否可以重用，需要更新的节点会打上标签
9. 如果此时用户点击放大字体的按钮，操作不能立即实现，因为时间片被react占住。处理完一个节点看时间够不够用。
10. 通过shouldComponentUpdate钩子可以根据传入的props判断其是否需要改变，返回ture表示要，打上标签
11. react会维护一个effect list列表，记录所有标签元素
12. 当所有节点标记完成，react将workInProgressTree标记为pendingCommit，可以进入commit阶段
13. 此时还是检查时间够不够用，够时间的话根据effect list更新Dom
14. 此时workInProgress和DOM保持一致，交换current和workInProgress两个指针
15. commit完执行componentDidMount函数

### fiber优先级策略
核心：低优先级会被高优先级操作打断，并让主线程执行高优先级的更新，当主线程重新分配给低优先级的操作时，会重新开始
```javascript
module.exports = {
  NoWork: 0, // No work is pending.
  SynchronousPriority: 1, // For controlled text inputs. Synchronous side-effects.
  AnimationPriority: 2, // Needs to complete before the next frame.
  HighPriority: 3, // Interaction that needs to complete pretty soon to feel responsive.
  LowPriority: 4, // Data fetching, or result from updating stores.
  OffscreenPriority: 5, // Won't be visible but do the work in case it becomes visible.
};
```
