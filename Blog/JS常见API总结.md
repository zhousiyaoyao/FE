---
title: BOM常见对象和方法总结
type: categories
copyright: true
date: 2020-05-25 23:36:45
tags: 浏览器
categories: 浏览器
---
### 前言
依然是取材于那一次不太满意的面试，setInterval误差问题和requestAnimationFrame，了解的很少，需要学习一下

### BOM对象总结
浏览器对象模型，浏览器对象模型提供了独立于内容的、可以与浏览器窗口进行互动的对象结构。
BOM由多个对象组成，其中代表浏览器窗口的Window对象是BOM的顶层对象，其他对象都是该对象的自对象。

#### Window对象方法
* alert
* requestAnimationFrame(callBack)：告诉浏览器您希望执行动画并请求浏览器在下一次重绘之前调用指定的函数来更新动画
* cancelAnimationFrame(callBack)：取消之前的动画帧请求
* requestIdleCallback：在浏览器空闲期依次调用函数，这样可以把低优先级的任务不会导致动画和交互延迟触发
* setImmediate(func)：把需要长时间运行的函数放到回调函数里，在浏览器完成后面的其他语句之后，立即执行这个回调
* setInterval(callback)：重复调用一个函数或执行一个代码段，在每次调用之间有一定的事件延迟
* clearInterval(intervalID)：取消用setInterval设置的重复定时任务
* fetch：用于发起获取资源的请求，返回一个promise对象
* postMessage：安全的实现跨源通信
* getSelection：返回selection对象，表示用户选择的文本范围或者光标的当前位置

**setInterval计时不准确问题**：因为其回调函数不是到时执行，这个时间代表的是延迟多少秒，把回调函数放到异步队列，等待主线程空闲再被执行，如果这个callback过于耗时或者有其他耗时任务，会越来越不准确。

当使用setInterval时，***仅当没有该定时器的任何其他代码实例时，才将定时器代码添加到队列中***，这确保了定时器代码加入到队列中的最小时间间隔为指定间隔。***如果当前事件队列中，存在当前定时器的回调函数，即使到了规定的间隔事件，也不会把这个时间点的回调函数放到事件队列，这样的机制会导致一些间隔被跳过***。

解决方法用迭代setTimeout,好处是在前一个定时器执行完之前，不会向队列插入新的定时器代码，确保没有缺失的间隔，而且可以保证在下一次定时器代码执行之前，至少要等待指定的间隔，避免了连续的运行。每次执行setTimeout，创建一个定时器，到达间隔时间时，把定时器回调加入队列，当主线程空闲时，可以执行这个回调函数，因为这个回调函数包含另一个setTimeout，因此可以把这个回调函数放到事件队列，这样执行上一个回调函数的时候，才会把下一个回调函数加入到队列，这样可以避免跳过某些时间点，也可以避免连续执行。**因此setTimeout比setInterval稳定**

具体写法：计算一个offset，为当前时间减去开始时间，再减去count时间，nextTime为1000减去offset，如果小于0，nexttime为0，setTimeout这个方法，间隔为nextTime。从而计算出下次触发的时间，修正了当前触发的延迟。

```javascript
function fix(){
    count++;
    var offset = new Date().getTime() - (startTime + count * 1000)
    var nextTime = 1000 - offset
    if(nextTime < 0) nextTime = 0
    setTimeout(fix, nextTime);
}
setTimeout(fix, 1000)
```

**requestAnimationFrame三大好处**
1. 把每一帧的dom操作集中，一次重绘或回流中完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率
2. 在隐藏或不可见的元素中，不会回流或重绘，意味着更少的CPU，GPU和内存使用量
3. 浏览器专门为动画提供的api，在运行时浏览器会自动优化方法的调用，如果页面不是激活状态的话，动画会自动暂停，有效节省CPU的开销

#### Location对象方法
* reload：重载来自当前URL的资源，可以接受一个布尔参数，为true表示一定会从服务器拿资源，如果是false或者没有，就可能来自缓存
* assign：加载给定URL的内容资源到这个location对象所关联到对象
* replace：用给定的URL替换掉当前的资源，与assign方法不同的是，replace替换掉的页面不会出现在history中，不能用回退回到该页面

#### History对象方法
* back：前往上一页，类似于go（-1），也就是页面返回按钮
* forward：前往下一页，类似于go（1），也就是页面前进按钮
* go：在当前页面的相对位置，从浏览记录加载页面
* pushState：按指定的名称和URL把数据push进历史栈
* replaceState：更新历史栈的记录
* hashChange事件：location.hash触发，前端哈希路由的实现原理
* popState事件：pushState或replaceState触发

#### Navigator对象
1. onLine属性：返回浏览器是否在线
2. battery属性：充电信息
3. connection属性：网络连接信息
4. geolocation属性：地理位置信息

* vibrate（pattern）：调用设备的震动
* getUserMedia（）：通过提示获取用户许可，返回一个音频或摄像头的调用

#### Screen对象
1. availTop属性：返回屏幕上边有效的距离
2. availHeight属性：返回屏幕有效的高度

* lockOrientation（orientation）：锁定屏幕到某个方向
* unlockOrientation：解锁
* onorientationchange：屏幕方向改变时触发事件

#### Document对象
* createAttribute（name）：创建并返回一个新的属性节点
* createDocumentFragment（）：创建一个新的空白的文档片段
* createElement（tagName[,options]）：创建由tagname指定的html元素
* querySelector（selectors）：返回文档中匹配指定的选择器组的第一个元素
* write（markup）：将一个文本字符串写入由document.open（）打开的一个文档流
* writeln（line）：同上，但会换行
* append：在parentNode最后一个子节点之后插入一组Node对象或者DOMString对象
* getAnimations：返回所运用的css动画，css过渡的元素集合
* getElementsBy系列：不解释
