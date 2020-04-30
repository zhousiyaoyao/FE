# 目录
* [浏览器缓存](#浏览器缓存)
* [跨域](#跨域)
* [事件循环](#事件循环)
* [模块化](#模块化)
* [let和const](#let和const)
* [数据类型](#数据类型)
* [vue组件通信](#vue组件通信)
* [vue生命周期](#vue生命周期)
* [路由](#路由)
* [本地存储](#本地存储)
* [Webpack](#Webpack)
* [URL输入过程](#URL输入过程)
* [加载](#加载)


### 浏览器缓存
1. 一段时间内保存web资源的副本，如果发送对这个资源的请求，会直接使用缓存副本，可以提高网页打开速度，减少带宽消耗
2. 强缓存，如果没过期，直接使用副本，不需要发请求
3. Expires，指定过期时间，服务器时间，所以可能服务器客户端时间不一致，http1.0的方式
4. Cache-Control，http1.1的方式，比expires优先级高，有不同的值，Max-age，相对的时间大小，Private，只能被客户端缓存，不能被代理服务器
No-store，资源不能缓存，No-cache，能缓存但立即失效
5. 协商缓存，向后台发请求，如果资源没更新，返回304
6. Last-modified，服务器在相应头添加，指出资源上一次修改时间，浏览器下一次发请求，会带上last-modified-since，为上一次服务器的返回值，通过这两个时间的对比，判断有没有发生更改。缺点只能精确到秒，毫秒内last-modified不变
7. Etag，用来唯一标志资源，用法同last-modified，只是请求带的是If-None-Match。优先级比last-modified高
8. 一般是一起合作，先判断强缓存，不命中看协商缓存，再不命中就返回资源。考虑负载平衡不要带etag，因为last-modified要保持一致，一般都对get进行缓存，post需要更改数据库，不能缓存

### 跨域
1. CORS，服务器端设置Access-Control-Allow-Origin，带cookies，client也要设置，axios.defaults.withCredentials = true
2. Jsonp，只限于get，浏览器对script标签的引入没有跨域的访问限制，在请求的url后指定一个callback函数，服务器返回数据时，构建一个json数据的包装，返回到前端立刻执行，之前定义好的回调函数被调用，实现了跨域请求。通常为了减轻web的负担，把静态资源放在CDN，可以通过标签对其他服务器的资源进行加载。
3. 跨域，一个域下的文档或脚本请求另一个域下的资源，同源策略（端口，域名，协议相同才能发请求，获取本地存储，获取dom和js对象）是浏览器的安全策略，服务器调用http接口是走http协议，不需要执行js，不存在跨越问题。
4. Nginx代理，有跨域的请求操作时，把请求发给后端，后端代为请求，并将最后的结果返回。通过nginx配置一个代理服务器做跳板机（相同域名，不同端口），反向代理访问domain2接口，并且可以修改cookie中domain信息，方便当前域cookie写入，实现跨域登录

### 事件循环
1. Js是单线程运行，代码执行时押入执行栈中进行，先同步代码，遇到异步代码，把其回调放到其他任务队列，先执行同步代码，同步执行完毕，再看看这些任务队列有没有异步任务可以执行，有的话从其他任务队列加入当前执行栈
2. 有两个队列，微任务和宏任务，优先级是同步-微任务-宏任务，微任务的典型是promise的then，宏任务的典型是setTimeout，渲染，js脚本执行
promise会在本轮执行，setTimeout会在下一轮执行.第一次执行也是一个宏任务
3. 宏任务是一个栈按先入先执行的原则，微任务也是一个栈也是先入先执行。 但是每个宏任务都对应会有一个微任务栈，宏任务在执行过程中会先执行同步代码再执行微任务栈。

### 模块化
1. AMD，异步加载js文件，浏览器一般用这个，用define和require。（requirejs）
2. CMD，异步加载概念，与AMD的区别在于，AMD依赖前置，js可以方便指定依赖模块是谁，立即加载。而CMD就近依赖，要把模块解析完才能指定依赖了哪些模块，延迟执行，就是即插即用，哪里需要插哪里。用define和require
3. CommonJs，同步加载，node端，浏览器不支持module.exports暴露模块，require引入模块，加载模块是同步的，在浏览器端模块要提前编译打包
4. ES6 import/export，编译时确定模块的依赖关系和输入输出的变量


### let和const
1. 块级作用域，只在声明的代码块有效
2. 不存在变量提升：可以在变量声明前访问而不报错
3. 不允许重复声明
4. 存在暂时性死区
5. Js引擎发现变量时，var会提升到顶部，let和const会加入暂时性死区，声明后才会拿出来，才能访问
6. es6之前没有块级作用域，只有函数作用域和全局作用域，块状作用域只能靠闭包和立即执行函数实现。

### 数据类型
1. 基本数据类型：6种，null，undefined，string，symbol，number，boolean。除了symbol也可叫原始数据类型，放在栈上
2. 引用数据类型：array，object，function，栈上放指针地址，实际放在堆上
3. Typeof只能检测出null，object，boolean，number，string，function。不可检测具体object
4. Instanof，返回布尔，可以检测object，经常用来检测一个实例是否属于某个类型，判断一个实例是否属于其父类型。用于判断构造函数的prototype属性是否出现在对象的原型链的任何位置。
5. object.prototype.toString.call。所有object内部属性[[class]]，这个可以查看，检测所有object

### vue组件通信
1. 父子，子组件props来接受父组件的数据，emit来触发事件向父组件发送数据，如果子组件修改props，理论是会给出警告，可以把prop当初初始值作为局部数据，或者computed属性，从prop值计算得出，但对象和数组是引用类型，传的是指针，如果是对象或者数组，会改变父组件的状态，所以最好深拷贝一个，纯数据对象的话，可以JSON.parse(JSON.stringify(obj))，带function的话自己写递归。父组件通过$refs获得子组件，子组件通过$parent。父组件provider，子组件injexct。
2. 兄弟，eventBus，创建一个空的vue实例来作为消息传递的对象，然后引入这个组件，来监听和触发。$parent.$refs也可以
3. Vuex，将公共数据抽离出来，作为全局变量来管理，commit和mutation改变状态。mutation同步函数，action提交异步mutation。单向数据流，在组件中dispatch action，action 来commit mutations，mutation改变state，state改变重新渲染组件。实时更新，放在computed（基于依赖进行缓存，依赖变化才会重新计算求值）实时返回变化的数据，在watch（异步或者开销大）中作出相应操作。

### vue生命周期
1. Beforecreate, 实例初始化之前
2. Created，实例创建完触发
3. beforeMount，组件挂载到页面之前。ajax请求数据
4. mounted，组件挂载之后，可以获取到DOM了
5. Beforeupdate，数据更新时除法
6. Updated，虚拟dom重新渲染之后
7. beforeDestroy，实例销毁之前，定时器，解绑
8. Destroyed，销毁之后

### 路由
1. 根据url的不同，返回不同页面，单页面应用，页面结构不变，只是内容变，缺点无法前进后退。url地址变，只是js实现ui的切换，不用请求页面，只需要ajax请求数据。vue默认hash可选history，react history，基于html5。
2. hash，url前有#号，可以前进后退，会增减历史记录
3. History api
4. Pushstate添加历史记录url，更新页面，不刷新
5. Replacestate替换历史记录，都接受3个参数，状态对象，标题，url。
6. popstate监听历史记录的改变

### 本地存储
1. Cookie：数据量小,4KB，保存登录信息，标记用户，数据会自动带到请求头，服务器端不关心，造成带宽浪费，可设置失效时间。所以对于身份认证信息，特别适合放在cookie中，每次发http请求会自动加入请求头。一般浏览器存放个数为20个。常用于登录状态，购物车，主题，游戏分数。
2. Cookie跨域携带：配置withCredentials为true，后台配置access-control-allow-origin和credentials 配置代理，服务器与服务器不存在跨域
3. Session与cookie的区别，Session在后台，cookie在前端，Session是对象，cookie是字符串，Session没有路径区别，一个网站任何一个地方都能访问，cookie设置路径后，有些地方不能访问，session需要借助cookie才能工作，禁用cookie的话session也失效
4. localStorage，可以永久存储，同源下数据多窗口可以共享，但只有5M的大小限制，超过会报错，作用域同一协议主机名端口，但移动设备不可靠，会因为退出app，网络切换，内存不足而清空。键值对存储，setItem(key,value), getItem(key), key(i), removeItem(key), clear()
5. sessionStorage，数据仅本次会话有用，结束后失效，仅在当前窗口有效，新窗口也访问不到其他窗口的数据，作用域同一窗口协议主机名端口，关闭页面就被清空。

### Webpack
1. 简化依赖管理，打包成一个或多个文件，来降低页面加载时请求的资源数
2. 把页面逻辑当作一个整体，通过一个给定的入口文件entry，webpack从这个文件开始，找到所有的依赖文件，依赖文件通过loader和plugins处理，进行打包、编译、压缩，最后输出一个或多个浏览器可识别的JS文件，到output，默认为./dist
3. Loader，相当于编译器，在webpack.config.js里配置，处理非js文件
* Babel-loader，高版本js解析成低版本，.babelrc配合使用
* cache-loader，开启缓存，优化，写在loader最前面，把loader的编译结果写入硬盘缓存，再次构建如果文件没有发生变化就会直接拉取缓存
* css-loader，style-loader配合使用解析css，less-loader
* File-loader解析ico和图片
4. Plugins，打包优化，压缩，定义环境变量等，一般是先使用 npm 包管理器进行安装，然后在配置文件中引入，最后将其实例化后传递给 plugins 数组属性
* Defineplugin，定义全局变量，webpack打包时对这些变量做替换，处理开发环境和生成环境的不同，或者ouput里面加时间戳
* Html-webpack-plugin，当webpack打包时，创建一个html文件，把打包后的静态文件插入到这个html文件中
* Ignoreplugin，由于用到moment库，打包时会把目录所有的locale打包进去，这个插件可以正则匹配忽略文件
5. Happypack，将任务分解成多个子进程并发执行，每个loader都是happypack的实例，用id指定，处理完之后再把结果返回到主进程
* 触发编译，解析loader，创建子进程，监听父子进程通信，初始化子进程，创建complier副本
* 子进程调用complier方法，传入complier副本，loader，loader上下文，进行文件编译。编译完成将结果传给主进程
* loader逐个执行，递归处理依赖
6. HotModuleReplacementPlugin，热加载
* 客户端和本地服务器通过websocket进行通信
* Webpack监听本地文件变化，文件变化，webpack重新编译，生成新的hash值，已改动模块的json文件，已改动模块代码的js文件。
* Socket把hash值推送给客户端浏览器
* 客户端对比上次的hash值，一致走缓存，不一致通过ajax和jsonp向webserver静态服务器发请求，返回改动的js文件和json文件
HMR替换有修改的内容实现局部更新
* Webpack-dev-middleware负责启动编译，设置文件为内存文件系统，返回编译的文件
* Complier负责监听本地文件，改变entry属性，注册事件
* 客户端监听ok和hash

### URL输入过程
1. 解析url，协议或主机名不合法去google
2. 看有无缓存，没缓存请求，有缓存直接用
3. DNS解析域名到IP地址
4. TCP三次握手
5. HTTPS的TLS四次握手
6. 浏览器解析服务器返回的html文件
7. 构建DOM树和CSSOM树，遇到js会先js，除非有defer或async
8. 根据这两个树构造渲染树，然后布局和绘制
9. TCP四次挥手

### 加载
1. 懒加载，延迟加载，长网页延迟图片的加载，比如电商网站，没滑倒那个地方就不加载。原理是将图片的src属性设为空字符，图片真实路径保存在一个自定义属性，页面滚动进行判断，如果图片进入可视区域，从自定义属性取出真实路径赋值给src
2. 预先加载，将资源提前请求加载到本地，后面用的时候直接缓存取资源。比如js中image对象，通过对image对象设置src来实现预加载


