Enzyme是react自带的测试工具，支持三种渲染：
1. shallow：浅渲染，对官方的shallow renderer的封装，将组件渲染成虚拟DOM对象，只会渲染第一层，子组件将不会被渲染出来，效率很高，不需要DOM环境，可以使用jQuery方式访问。
2. render：静态渲染，将React组件渲染成静态的HTML字符串，然后使用Cheerio这个库解析字符串，返回一个Cheerio的实例对象，来分析组件的HTML结构
3. mount： 完全渲染，将组件渲染加载成一个真实的DOM节点，用来测试DOM API的交互和组件的生命周期，用到了jsdom来模拟浏览器环境
4. shallow最快，但无法交互测试。因为只渲染第一层，render的效率是mount的两倍
5. simulate(event, mock)：用来模拟事件触发，event为事件名称，mock为一个event object；
6. find(selector)：根据选择器查找节点，selector可以是CSS中的选择器，也可以是组件的构造函数，以及组件的display name等；
