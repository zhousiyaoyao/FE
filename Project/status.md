### vuex
1. 当store的状态变化，对应组件也会更新
2. 改变store状态的唯一途径就是commit和mutation
3. 单一状态树，一个对象包含全部的应用层级状态，每个应用只包含一个store实例
4. 从store实例中读取状态最简单的方法就是在computed返回
5. 当一个组件含有多个状态时，使用mapstate帮助生成计算属性
6. 不需要将所有状态都放在vuex，如果有些状态严格属于单个组件，还是作为局部组件比较好
7. Getter接受state作为第一个参数，从state中派生一些状态，可以用store.getters访问属性或者函数，也可以接受其他getter作为第二个参数。
8. mapGetter函数将store的getter映射到局部计算属性
9. 改变状态的方法mutation，有一个type和handler，这个handler就是实际进行状态更改的地方，接受state作为第一个参数。要唤醒handler，需要以相应的type调用store.commit
10. 可以在commit中加入额外的参数，既mutation的payload，payload是一个对象，可以包含多个字段并且记录的mutation会更易读。
11. 提交mutation的另一种方式是直接使用包含type属性的对象，此时整个对象都作为payload创给mutation函数，因此handler不变。（type:’function’或者直接’function)
12. 因为store状态是响应式的，代表着更新state时，组件也会更新，所以store中要初始化好所有属性，添加新属性需要使用set或者用新对象代替老对象。
13. Mutation必须是同步函数，任何在回调函数中进行的状态的改变都是不可追踪的
14. Action提交的是mutation，可以包含任意异步操作，接受一个与store实例具有相同方法和属性的context对象，再用context.commit来提交commit

### Mobx
1. Action定义状态的动作函数，包括如何变更状态
2. Store集中管理state和action
3. Derivation从state派生出来，没有其他影响的数据，computed values（纯函数从可观察状态中获取）和reactions（state变化时的副作用，需要实现读写）
4. 多个独立store，可观察对象，监听可观察对象，自动触发监听
5. 直接使用新值更新状态对象
6. Provider将所有stores注入应用，用inject将特定store注入某组件，store可以传递状态或action，使用observer保证组件可以响应可观察对象变更

### Redux
react项目中，用this.setState()和this.state处理或访问组件内状态，但状态变复杂之后，某个状态需要在多个组件之间共享（访问，更新），某组件内交互需要触发其他组件的状态更新，而且状态提升已经无法解决复杂问题，状态难以同步，操作，到处是回调，发布，订阅，于是需要状态管理库。
这个库的作用在于
* 统一维护管理应用状态
* 某一状态只有一个可信数据来源（store，状态容器）
* 操作更新状态方式统一，并且可控（通常用action）
* 支持与react组件连接，之后组件分为容器组件（负责处理具体业务和状态数据，将业务或状态处理函数传入展示型组件）和展示型组件（负责展示视图，视图交互回调内调用传入的处理函数
1. Action描述动作相关信息，包括type属性表示action类型，payload属性表示负载数据
2. Reducer定义state如何response action，如何更新state,必须是纯函数（函数的调用参数相同，则永远返回相同的结果，不依赖于程序执行期间函数外部任何状态或数据的变化，必须只依赖于其输入参数）
3. Store管理action和reducer及其关系的对象，提供维护state并支持访问状态getState()，支持监听action的分发，更新状态dispatch(action)，支持订阅store的变更(subscribe(listener))
4. 异步流，不让业务或数据相关任务混入组件，需要redux-saga或者thunk
5. 单个store，js原生对象形式存储数据，需要手动追踪所有状态对象的变更
6. 对象状态不可变，不能直接操作状态对象，在原来状态对象基础返回新的状态对象，可以很方便的返回应用上一状态
7. Provider将store注入react应用，connect将store state注入容器组件，并选择特定状态作为容器组件props传递
8. Reducer只是返回更改数据，对state的更改还是在store中，store拿到reducer的数据，自己对自己更新
9. window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()调试工具,同时加入thunk和调试工具，需要加入增强函数compose
10. Redux-thunk在dispatch一个action之后，到达reducer之前，进行额外的操作，需要用到middleware，比如日志记录，创建崩溃报告，调用异步接口或者路由
Redux-saga也是一个，和thunk基本一样
11. React-Redux是简化redux的流程，常见的组件。provider, connect, 映射. connect是把UI组件（无状态组件）和业务逻辑代码分开，通过connect链接在一起