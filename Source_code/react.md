核心思想
	将页面拆分为一堆独立的，可复用的组件，用自顶向下的单向数据流的形式将组件串联起来
	教程知识
	三大体系：React.js, ReactNative, ReactVR
	主打函数式编程风格，使用人数最多
	Jsx是js和xml结合的格式
	自定义组件首字母要大写，而JSX小写字母开头
	必须在一个组件的最外层进行包裹，布局不能要如flax，就用frament
	不直接操作DOM元素，数据驱动，根据数据的变化而变化
	数据绑定和vue一样，用{:}来标注值，把值绑定到html中
	React禁止直接操作state，list:this.state.list不要用
	{/* 正确注释的写法 */}
	Label属性点击激活文本框，方便输入，与htmlfor配合，需要设id
	父组件向子组件传递内容，靠属性的形式传递，props.值或方法
	子组件不能操作父组件的数据，需要借助父组件的方法，来修改其内容
	onchange或者其他函数记得加.bind(this)
	任何值或者函数面前都要加this
	函数式编程的好处，让代码更清晰，每个功能都是一个函数，方便测试
	React developer tools插件调试
	Proptypes用来检验数据类型是否传对，isRequired表示不传递就报错
Ref使代码语义化和优雅，ref={(input)=>{this.input=input}}
Npm install -save: package依赖写入，-save-dev: 另一个文件
	动画库可以看react-transition-group
	一个class组件的构成，构造函数（里面有props给子组件传值，也就是属性，还有state，状态，bind this也写在里面），渲染函数render，返回HTML和JS
渲染属性
	用一个值为function的prop来传递需要动态渲染的组件或者nodes
高阶组件
	Function接受一个组件作为参数，加工之后，返回另一个组件
Hooks
不需要写class，在function中写有状态组件（一般class为有状态组件，function为无状态组件）
不需要生命周期钩子函数
不需要this
原因：class组件难以复用，需要用到渲染属性和高阶组件，笨重，组件嵌套
useState
声明状态变量，const [count, setCount] = useState(0) 
接受初始状态值（可以是任何类型），返回一个数组
读取变量值只是单纯的变量，更新状态就调用函数
直接替换老状态，返回新状态
插拔式，不同组件调用同一个hooks也可以保证各自状态独立
根据useState出现顺序来保证读到对应state，所以不能写在条件语句中，写进去会报错
useEffect
	useEffect(() => {语句});
写side effect函数，比如ajax请求，监听的注册和取消注册，手动修改dom
	每个副作用给一个单独的useEffect
	参数写法${参数名}
	React更新完dom后会执行副作用函数，异步执行，不同于之前didmount和didupdate都是同步执行，如果是根据页面大小绘制弹出窗口的大小，异步就不好操作，有利有弊。
	默认每次渲染会调用一次effect函数
	解绑，在effect中return一个函数取消注册
	跳过一些函数，传第二个参数表示只有修改这个参数改变才会执行,如果为空，表示当组件将被销毁时才进行解绑
	useEffect(() => {语句}，[参数]);当为空[]表示只在首次渲染执行
`useEffect=>You clicked ${count} times`，``符号内可以写参数
useEffect默认t实现componentDidmount, componentDidupdate，第一次渲染和每次更新都会执行，但useEffect是异步，后者是同步
useEffect实现componentWillUnmount需要加入[]参数，表示只有状态值变化才进行解绑，如果没有参数，表示只在首次渲染执行，更新不会执行了，然后解绑（解绑时会执行return），如果有参数，参数改变时，会先return，再console。
总结，加 [ ] 表示只会第一次执行，不加 [ ] 表示每次渲染都会执行，加 [ count ] 表示只有count改变才会执行。取消订阅写法，直接return () => { 我要取消订阅 }, 然后加上 [ ]

useContext可以跨越组件层级直接传递变量，和redux的区别，一个解决组件之间值传递的问题，一个是同一管理状态的问题，但和useReducer配合，可以实现Redux。Context就是对它所包含的组件树提供全局共享数据的一种技术。用法先引入createContext函数，然后在html写入CountContext.Provider组件，传入count值，包裹子组件
useReducer与userContext合作可以完成类似redux库的操作。
useMemo用来解决使用React hooks产生的无用渲染的性能问题。
useRef获取jsx中的dom元素，但不建议，一般通过状态来控制，可以保存变量，但也很少用。


生命周期
指在某一个时刻组件会自动调用执行的函数
render()在state发生改变时自动执行，就是生命周期函数
constructor不是，但性质一样，可以看出Ini阶段，定义props和state
Initialization初始化阶段
Mounting挂在阶段
	componentWillMount在组件即将被挂载到页面的时刻执行，只在页面刷新时执行一次
	render页面state或props发生改变执行
	componentDidMount组件挂载完成时执行，只在页面刷新时执行一次, ajax请求发出的地方
	没有顺序
Updating更新阶段
	shouldComponentUpdate在组件更新之前，自动执行，必须有返回值布尔，返回false不跟新，返回true更新
	componentWillUpdate在shouldComponentUpdate之后，返回false就不执行
	render页面state或props发生改变执行
	componentDidUpdate在组件更新之后执行
	componentWillReceiveProps第一次不会执行，重新渲染才会执行
Unmounting销毁阶段
	componentWillUnmount组件从页面中删除时执行，删除定时器或者取消登录状态