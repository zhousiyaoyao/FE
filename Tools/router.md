### React-router
1. 应用中快速添加视图和数据流，保持页面和URL间的同步
2. Exact精准匹配，只有路径信息完全匹配才能跳转，匹配一部分不行
3. 重定向和跳转的区别，重定向无法回退，跳转可以，业务不复杂时建议使用
4. 业务复杂直接用编程式重定向，history.push
5. 注意component拼错了不会报错但跑不通

### History API
React-router依赖于history包，区别于浏览器的window.history，history包含window.history，history有三种类型browser（支持H5的浏览器，主流），hash（不支持history功能的浏览器），memory（没有dom环境例如node，react-native）
* block用于地址改变之前的截取
* Listener用于监听地址栏的变化
* Push添加新历史记录
* Replace替换当前历史记录
* go(n)跳转到某条历史路由
* go(back)返回上一条历史记录
原理
1. pushState对应push，replaceState对应replace，添加window.history历史记录
2. pushState接受三个参数，第一个为状态对象，第二个是标题，就写”“，第三个为URL，新的历史url记录，调用后url会更新，但页面不会重新加载，而且不会调用popstate
3. popstate监听历史记录的改变window.addEventListener(‘popstate’,callback)
4. forceNextPop自定义变量，用于判断是否跳过弹出框
5. allKeys自定义变量，和历史记录同步，数组
6. 当历史记录更改，触发popstate，而push和replace都不会触发，只有在作出浏览器动作，比如回退才会
路线:
1. push和replace，添加历史记录，key存到window.history中，但不会触发popstate
2. 然后地址改变，添加key到allKeys数组
3. Go和goback，修改历史记录，地址改变，触发popstate，更新history
属性:
* length历史栈数量
* Action，动作名称比如push，replace
* createHref，创建新路径
* Location，当前的location
* Path，search，hash，state
* Block，阻止浏览器的默认导航
