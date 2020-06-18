# 目录
* [1.浏览器缓存](#浏览器缓存)
* [2.跨域](#跨域)
* [3.事件循环](#事件循环)
* [4.模块化](#模块化)
* [5.let和const](#let和const)
* [6.数据类型](#数据类型)
* [7.vue组件通信](#vue组件通信)
* [8.vue生命周期](#vue生命周期)
* [9.路由](#路由)
* [10.本地存储](#本地存储)
* [11.Webpack](#Webpack)
* [12.URL输入过程](#URL输入过程)
* [13.加载](#加载)
* [14.前端鉴权](#前端鉴权)
* [15.Websocket](#Websocket)
* [16.雅虎35条军规](#雅虎35条军规)
* [17.事件机制](#事件机制)
* [18.symbol](#symbol)
* [19.箭头函数](#箭头函数)
* [20.super](#super)
* [21.模版字符串](#模版字符串)
* [22.垃圾回收机制](#垃圾回收机制)
* [23.尾递归](#尾递归)
* [24.重绘和回流](#重绘和回流)
* [25.前端测试](#前端测试)
* [26.发布订阅](#发布订阅)
* [27.异步](#异步)
* [28.类数组](#类数组)
* [29.this](#this)
* [30.nextTick](#nextTick)
* [31.HTTP状态码](#HTTP状态码)
* [32.简单请求与非简单请求](#简单请求与非简单请求)
### 浏览器缓存
缓存优点：减少数据冗余传输，缓解网络瓶颈，降低服务器要求，降低请求距离时延
缓存概念：首次发请求，服务器给客户端资源的同时，缓存服务器或本地缓存会保存一份资源副本，下次请求的时候直接使用资源副本
缓存命中：命中就可以用资源副本，否则还是请求服务器
1. 一段时间内保存web资源的副本，如果发送对这个资源的请求，会直接使用缓存副本，可以提高网页打开速度，减少带宽消耗
2. 强缓存，如果没过期，直接使用副本，不需要发请求
3. Expires，指定过期时间，服务器时间，所以可能服务器客户端时间不一致，http1.0的方式
4. Cache-Control，http1.1的方式，比expires优先级高，有不同的值，Max-age，相对的时间大小，Private，只能被客户端缓存，不能被代理服务器
No-store，资源不能缓存，No-cache，能缓存但立即失效
5. 协商缓存，向后台发请求，如果资源没更新，返回304
6. Last-modified，服务器在相应头添加，指出资源上一次修改时间，浏览器下一次发请求，会带上last-modified-since，为上一次服务器的返回值，通过这两个时间的对比，判断有没有发生更改。缺点只能精确到秒，毫秒内last-modified不变
7. Etag，用来唯一标志资源，用法同last-modified，只是请求带的是If-None-Match。优先级比last-modified高。强表示一定要每个字节相同，弱表示只要含义相同
8. 一般是一起合作，先判断强缓存，不命中看协商缓存，再不命中就返回资源。考虑负载平衡不要带etag，因为last-modified要保持一致，一般都对get进行缓存，post需要更改数据库，不能缓存
9. 用户主动刷新，设置长缓存，但entity tags没有移除时，会协商缓存304，HTTP 304：not modified，表示使用缓存。直接点击链接访问，输入网址回车访问，二维码扫描，会强缓存200，HTTP 200：from cache


### 跨域
跨域，一个域下的文档或脚本请求另一个域下的资源，同源策略（端口，域名，协议相同才能发请求，获取本地存储，获取dom和js对象）是浏览器的安全策略，服务器调用http接口是走http协议，不需要执行js，不存在跨越问题。
* 同源策略SOP：协议域名端口三者相同，浏览器最核心安全功能，会限制跨域行为
* SOP是安全策略，不是HTTP协议，服务器调http接口只是使用http协议，不会执行js，不会跨域
1. CORS，服务器端设置Access-Control-Allow-Origin，带cookies，client也要设置，axios.defaults.withCredentials = true
2. Jsonp，只限于get，浏览器对script标签的引入没有跨域的访问限制，在请求的url后指定一个callback函数，服务器返回数据时，构建一个json数据的包装，返回到前端立刻执行，之前定义好的回调函数被调用，实现了跨域请求。通常为了减轻web的负担，把静态资源放在CDN，可以通过标签对其他服务器的资源进行加载。
3. Nginx代理，有跨域的请求操作时，把请求发给后端，后端代为请求，并将最后的结果返回。通过nginx配置一个代理服务器做跳板机（相同域名，不同端口），反向代理访问domain2接口，并且可以修改cookie中domain信息，方便当前域cookie写入，实现跨域登录

### 事件循环
1. Js是单线程运行，代码执行时押入执行栈中进行，先同步代码，遇到异步代码，把其回调放到其他任务队列，先执行同步代码，同步执行完毕，再看看这些任务队列有没有异步任务可以执行，有的话从其他任务队列加入当前执行栈
2. 有两个队列，微任务和宏任务，优先级是同步-微任务-宏任务，微任务的典型是promise的then，宏任务的典型是setTimeout，渲染，js脚本执行
promise会在本轮执行，setTimeout会在下一轮执行.第一次执行也是一个宏任务
3. 宏任务是一个栈按先入先执行的原则，微任务也是一个栈也是先入先执行。 但是每个宏任务都对应会有一个微任务栈，宏任务在执行过程中会先执行同步代码再执行微任务栈。

### 模块化
模块：将复杂的程序封装成几个块，块的内部数据和实现是私有的，只是向外部暴露一些接口（方法）和外部其它模块通信
1. AMD，异步加载js文件，浏览器一般用这个，用define和require。非同步加载模块，允许回调函数，浏览器一般采用AMD规范，代表作require.js
define(function(){ return 模块 }) 定义没有依赖的模块
define([‘module1’ , ‘module2’], function(m1,m2){ return 模块 }) 定义有依赖的模块
require([‘module1’, ‘module2’], function(m1,m2){ 使用m1,m2 })  引入使用模块
2. CMD，异步加载概念，与AMD的区别在于，AMD依赖前置，js可以方便指定依赖模块是谁，立即加载。而CMD就近依赖，要把模块解析完才能指定依赖了哪些模块，延迟执行，就是即插即用，哪里需要插哪里。用define和require
```javascript
define (function(require, exports, module){
	Exports.xxx = value
	Module.exports = value
}) //定义没有依赖的模块
define (function(require, exports, module){
	Var module2 = require(‘./module2’)
	require.async(‘./module3’, function (m3) {})
Exports.xxx = value
}) //定义有依赖的模块
define (function (require) {
	Var m1 = require(‘./module1’)
	Var m4 = require(‘./module4’)
	m1.show()
	m4.show()
}) //引入使用模块
```
3. CommonJs，Node应用由模块组成，每个文件就是一个模块，有自己的作用域，在一个文件里的变量，函数，类都是私有的，在服务器端模块的加载是运行时同步加载的，在浏览器端模块需要提前编译打包处理。同步加载，node端，浏览器不支持module.exports暴露模块，require引入模块，加载模块是同步的. 加载模块是同步的，所以不适用于浏览器环境，require操作是异步的，不能同步加载。
暴露模块 module.exports = value或exports.xxx = value
引入模块 require(xxx)，第三方模块，xxx为模块名，否则为路径
4. ES6 import/export，编译时确定模块的依赖关系和输入输出的变量。ES6模块化思想是尽量静态化，使得编译时就能确定模块的依赖关系和输入输出的变量。commonjs和amd只能在运行时确定。这个是主流，只要export和import。
5. AMD和CMD的区别，对依赖模块的执行时机处理不同，而不是加载的时机或者方式不同，二者皆为异步加载模块，AMD依赖前置，js可以方便指定依赖模块是谁，立即加载。CMD就近依赖，需要把模块变成字符串解析一遍才知道依赖了哪些模块，这也是诟病的地方，牺牲性能带来开发的便利性，实际上解析模块用的时间短到可以忽略
6. UMD是AMD和CommonJS的融合，UMD首先判断支持nodejs的模块是否存在，存在就用，再判断是否支持AMD，存在则用AMD。


### let和const
1. 块级作用域，只在声明的代码块有效
2. 不存在变量提升：可以在变量声明前访问而不报错
3. 不允许重复声明
4. 存在暂时性死区
5. Js引擎发现变量时，var会提升到顶部，let和const会加入暂时性死区，声明后才会拿出来，才能访问
6. es6之前没有块级作用域，只有函数作用域和全局作用域，块状作用域只能靠闭包和立即执行函数实现。
7. Const不可以修改绑定，但可以修改值比如const对象
8. Var的缺点就是变量提示，可以重复声明，在for循环没有作用域

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
    * 客户端对比上次的hash值，一致走缓存，不一致通过ajax和jsonp向webserver静态服务器发请求，返回改动的js文件和json文件, 
    * HMR替换有修改的内容实现局部更新
    * Webpack-dev-middleware负责启动编译，设置文件为内存文件系统，返回编译的文件
    * Complier负责监听本地文件，改变entry属性，注册事件
    * 客户端监听ok和hash

### URL输入过程
1. 解析url，协议或主机名不合法去google
2. 看有无缓存，没缓存请求，有缓存直接用
3. DNS解析域名到IP地址
4. TCP三次握手
5. HTTPS的TLS四次握手
6. Http发请求，服务器处理请求，浏览器接受http响应
6. 浏览器解析渲染页面
    * 解析HTML，构建DOM树，深度优先遍历，遇到js标签，先执行脚本再构建
    * 解析CSS，生成CSS规则树
    * 合并DOM和CSS，生成render树
    * 布局render树（包括reflow和repaint），负责元素尺寸，位置的计算
    * 绘制render树，绘制页面像素信息
    * 浏览器将信息发送给GPU，GPU合成并显示在屏幕
7. TCP四次挥手

### 加载
1. 懒加载，延迟加载，长网页延迟图片的加载，比如电商网站，没滑倒那个地方就不加载。原理是将图片的src属性设为空字符，图片真实路径保存在一个自定义属性，页面滚动进行判断，如果图片进入可视区域，从自定义属性取出真实路径赋值给src
2. 预先加载，将资源提前请求加载到本地，后面用的时候直接缓存取资源。比如js中image对象，通过对image对象设置src来实现预加载

### 前端鉴权
1. HTTP Basic Authentication。基本现在不用了，过程前端发请求，后端返回401，然后弹出登录窗口，用户输入后，用base64加密合并到第一条请求信息再次发送，后端再处理。所以前端没有认证时，此时处于pending状态。
2. Session-cookie。由于http是无状态的，服务器不知道当前请求之前有没有来过，所以如果要记录登录状态，需要在后端创建一个session，每次请求，先看session，有的话认证成功，否则没有认证。过程：前端发请求，后端接到首次创建session，保存在内存或者redis（推荐），然后生成唯一标志字符串sid，加入响应头，发给前端。前端接到响应解析响应头，保存sid到本地cookie，下次请求带上该cookie信息，后端接到请求，解析请求头，拿到sid与后台对比，判断是否合法。
缺点：服务器内存消耗大，每个用户一个session。容易受到CSRF攻击，截获cookie来伪造用户
3. Token验证（包括JWT，SSO）概念：令牌，第一次登录后后台返回一个token，前端下次只要带token，不用账号密码。
    * 组成：uid+time+sign
    * 过程：前端把后台的发的token存到cookie，localstorage或者vuex，然后请求带上token。不合法就返回401（鉴权失败）
    * 优点：可以跨域，cookie不可以，可以避开CSRF，可以手机访问，cookie不可以，后台只需要解密token然后查询用户数据，不需要存数据
    * 缺点：token比session大，耗流量，解密比session时间长，时间换空间
4. JWT（JSON Web Tokens）
    * Token是JSON对象，加上签名，用户无法修改
    * 特点：服务器不保存任何session数据，服务器无状态
    * 结构：header+payload+signature
    * 缺点：无法中途废除某个token，只能等其过期
    * 过程：前端拿到token，存在localstorage或者vuex，每次路由跳转，判断localstorage或者vuex有无token，没有则跳转到登录页，有则请求用户信息，改变登录状态。
    * 每次请求接口，在axios请求头加入token，后台接口判断请求头有无token，没有则返回401，前端得到401，重定向到登录页面。
5. SSO单点登录，用户登录一次可以访问所有相互信任的应用系统。需要一个认证中心passport，子系统的登录需要通过passport，一个子系统登陆成功，passport会颁发令牌给其他子系统。授权后有session，一定时间不需要再发起认证。
6. OAuth（开发授权）允许用户授权第三方网站访问他们存储在另外的服务提供者上的信息，而不需要将用户名和密码提供给第三方网站或分享他们数据的内容。比如QQ，微信，微博。

### Websocket
1. HTTP只能客户端往服务器发请求，而websocket服务器也能往客户端发
2. HTTP是非持久化协议，keep-alive表示一个连接可以发送多个request，但是一个request只能对应一个response
3. websocket是持久化协议，基于HTTP协议，一次http请求告诉后台切换为websocket，就可以用了
4. Http可以用ajax 轮询（每隔一段时间发一个请求）或者long poll（发一个resquest，没有response就一直等着）来实现websocket
5. websocket心跳机制，检测客户端是否还在线

### 雅虎35条军规
1. 移动端
    * 保持单个文件小于25kn
    * 打包内容分段multipart文档
2. 图片
    * 优化图片
    * 优化CSS sprite
    * 不要在HTML中缩放图片
    * 使用体积小可缓存的favicon.ico
3. JS
    * 脚本放在页面底部
    * 使用外部js和css
    * 压缩js和css
    * 移除重复脚本
    * 减少DOM操作
    * 使用高效的事件处理
4. CSS
    * 样式表放在head中
    * 不要用css表达式
    * Link代替import
    * 不用filter
5. 页面内容
    * 减少http请求
    * 合并js和css
    * 雪碧图，css sprite将背景图片合并一个文件，background-image和position控制显示
    * 小图片转换成base64编码，用css文件大小换http请求
    * 减少dns查询
    * 避免重定向
    * 缓存ajax请求
    * 延迟加载
    * 预加载
    * 减少DOM元素数量
    * 划分内容到不同域名
    * 少用iframe
    * 避免404错误
6. 服务器
    * 使用CDN
    * 添加expire或cache-control响应头
    * 启动Gzip
    * 配置Etag
    * 尽早输出缓冲
    * ajax请求使用GET方法
    * 避免图片src为空
6. Cookie
    * 减少cookie大小
    * 静态资源使用无cookie域名

### 事件机制
1. 事件冒泡
微软提出，从最内层的元素发生，一直向上传播，直到document
2. 事件捕获
网景提出，与事件冒泡相反，从最外层开始发生，直到最具体的元素
3. 先捕获再冒泡，从document到target，捕获前进，中途遇到捕获事件立刻触发，到达了target，执行先注册的
Target节点往document方向，冒泡前进，遇到冒泡事件立刻触发
4. addEventListener 默认false冒泡，element.addEventListener(event, function, useCapture)
第一个参数是要绑定的事件，第二个参数是触发事件后执行的函数，第三个参数默认为false，表示在冒泡阶段调用事件处理函数，如果是true，表示事件捕获阶段调用处理函数。
5. 事件绑定，DOM0级，onclick，同一元素的绑定会覆盖，只支持事件冒泡，DOM2级，addeventlistener，可控制冒泡还是捕获
6. 捕获阶段，目标阶段，冒泡阶段，面试题还会加onclick，click也属于冒泡阶段，目标阶段谁先注册，谁先执行，onclick也是，冒泡和onclick的顺序也是谁先注册谁先执行
7. 事件代理/委托（事件冒泡的应用）
利用事件冒泡的特性，将里层的事件委托给外层事件，根据event对象的属性进行事件委托
比如ul里很多li，每个li对应一个event，用事件代理只需要在ul上绑定事件，用e.target
优点：不仅可以减少事件处理函数，还可以对于不同函数不同处理方法，节省内存，适合动态内容
冒泡被所有主流浏览器兼容，所以事件代理推荐用事件冒泡
IE不支持addEventListener，但有attachEvent，三个attachEvent绑定同一个元素不会覆盖，但会冒泡。IE6，7，8只支持事件冒泡

### symbol
1. 由Symbol函数生成，typeof为Symbol，表示独一无二的值
2. 不能使用new，因为symbol是一个原始类型的值，不是对象
3. Instanceof的结果为false
4. 接受一个字符串为参数，方便区分 var s1 = Symbol(‘foo’) // Symbol(foo)
5. 接受一个对象为参数，会调用其toString方法  // Symbol(abc)
6. 即使传入的参数相同，两个Symbol也不相等，用Symbol.for相等
7. 不可以与其他类型值运算，比如string，但可以用String()或者toString()显示转换，转换后还是会有Symbol符号在字符串开头,当成对象的属性名，独一无二

### 箭头函数
1. 简化代码，可以去掉this, 箭头函数被非箭头函数包含，this绑定的就是最近一层非箭头函数的this
2. 箭头函数没有construct，不能new
3. 因为没有new，所以没有new.target，new target一般在构造函数里，返回new命令作用于的那个构造函数，可以用来确定构造函数是怎么调用的。所以也没有原型。
4. 没有super访问其原型的属性。
5. 箭头自执行函数(()=>{})()

### super
1. Super当做函数时，代表父类的构造函数。子类的构造函数必须执行一次super函数，super（）表示子类调用父类构造函数执行，既父类构造函数的this，指向的是子类。super（）只能在子类构造函数
2. Super作为对象，普通方法中指向父类的原型对象。所以父类实例的属性方法无法super调用，调用父类方法时，方法内部的this指向当前子类实例。通过super对某个属性赋值，这时super就是this，赋值结果会成为子类实例的属性。
3. super作为对象，静态方法中指向父类。此时，this指向当前的子类，而不是子类的实例
4. 静态方法static，class就是实例的原型，以前类中定义的方法都会被实例继承，在方法前加static，表示该方法不会被实例继承，而是直接通过类来调用。但父类的静态方法，可以被子类继承。

### 模版字符串
1. ``，中间可以转义，空格缩进和换行都会保留
2. 用${}嵌入变量，甚至js表达式

### 垃圾回收机制
1. 对象要占用内存，内存资源有限。js会周期性的销毁没在使用的对象，释放内存，垃圾对象指的是没有引用或者循环引的对象。垃圾回收2种机制：
2. 标记清除法, JS的主要收集方式，从全局对象开始，扫描能到达的对象，到达了标记，没到达就回收，然后把之前的标记除掉。缺陷是内存碎片。
3. 引用计数法, 最初级的，没用了。无法处理循环引用。有引用不回收，没有的话回收
4. Chrome V8垃圾回收, 分代垃圾回收，分新生代和老年代，新生代用scavenge实现，也就是cheney算法，分成from和to空间，检查from的存活对象，赋值到to，然后杀from，再对换。老年代标记清除加上标记压缩。根据是否经历过scavenge和内存占比来决定是否晋升。

### 尾递归
一个函数所有递归形式的调用都在函数的末尾。只存在一个调用记录永远不会栈溢出
```javascript
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
} // o(n)

function factorial(n, total) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
} // o(1)

factorial(5) // 120
factorial(5 , 1) // 120
```

### 重绘和回流
1. 重绘：改变颜色，不影响元素布局属性，会重绘
2. 回流：元素的尺寸或者布局改变，会重新计算渲染树，消耗大于重绘

### 前端测试
单元测试：以函数，组件或者模块为单位，进行测试，输入不变，必然返回同样的输出。方便维护和调试代码，好的单元测试可以当成开发文档.断言是单元测试的核心，通过断言可以判断代码是否达到目的.代码覆盖率，衡量测试完整性的指标，包括代码行的覆盖率和函数的覆盖率。一般覆盖的代码行数越多，测试越完整，但单元测试的首要模板应该是尝试函数逻辑的各种可能性，进而辅助性增强代码质量。
功能测试：黑盒测试，对UI，功能进行测试
集成测试：在单元测试基础上，把模块组成子系统或系统进行测试
冒烟测试：在全面测试前，对主要功能进行的测试，看功能是否满足需求
TDD：测试驱动开发，先根据接口写测试，再开发通过测试，快速开发为目的
BDD：测试写的像自然语言，大家都能看懂，偏向系统功能和业务逻辑自动测试设计

### 发布订阅
1. 不直接互相依赖，但却可以相互传递信息
2. 订阅者通过渠道得到通知，渠道位于发布者和订阅者之间并来回传递信息. 一个发布者，一个订阅者，一些存储订阅者所注册的回调函数的空间
3. 发布函数publish参数为事件名和值, 订阅函数subscribe参数为事件名和函数
```javascript
function pubSub() {
  //函数中声明本地变量，来保存订阅的回调函数
  const subscribers = {}
  //负责在subscribers中插入回调函数
  function subscribe(eventName, callback) {
  //添加新的事件订阅前，检查是不是已经有了，没有的话，先加上空的订阅，否则在对应的事件队列中加入新的订阅回调函数callback
    if (!Array.isArray(subscribers[eventName])) {
      subscribers[eventName] = []
    }
    subscribers[eventName].push(callback)
  }
  //当publish事件被触发，会收到eventName和该事件下所有回调函数的data

  function publish(eventName, data) {
  //检查对象中该属性是否是数组，不是表示这个没有被注册过，直接return
    if (!Array.isArray(subscribers[eventName])) {
      return
    }
    subscribers[eventName].forEach((callback) => {
      callback(data)
    })
  }

  return {
    subscribe,
    public,
  }
}
function showMeTheMoney(money) {
  console.log(money)
}

const ps = pubSub()
ps.subscribe('show-money', showMeTheMoney)
ps.publish('show-money', 1000000)
```
定义一个pubSub函数，并在函数内将回调函数存储到本地，提供subscribe方法注册回调函数，用publish方法来遍历并使用数据来调用所有注册过的回调函数

### 异步
JS是单线程环境，一次只能完成一个任务，多个任务就需要排队，前一个完成，再后一个，所以如果一个任务时间很长，后面必须排队，浏览器就会无响应卡死，所以js提供很多异步方案，异步任务不会堵塞，前一个异步任务没有执行完，后面的任务也可以执行，在服务器端，异步模式是唯一模式，如果同步执行http请求，服务器会失去响应。常见的解决方案有回调函数，事件监听，发布订阅，promise，生成器，async/await六种。基本都是相当于一个异步任务分成2部分，执行完第一部分，去做其他任务，等时机成熟了，再执行第二段，后面的任务不用等第二段任务结束，就可以执行。
JS最初用途是实现用户与浏览器的交互，所以设置为单线程，同步要排队，卡在那里，异步不用排队，可以先去做点别的。如果js是同步的，对用户而言就会阻塞卡死，用户体验很差。JS通过事件循环机制（event loop）实现异步。虽然js是单线程，但浏览器内核是多线程，onclick，setTimeout，ajax等异步操作都是内核webcore来执行的。异步操作会将相关回调添加到任务队列中。
Js执行机制：
先判断代码是同步还是异步，同步进入主进程，异步进入event table
异步任务在event table注册函数，满足触发条件后，被推入event queue
同步任务进入主线程之后一直执行，直到主线程空闲时，才会去event queue查看是否有可执行的异步任务，如果有就推进主进程中。
三步循环执行，就是event loop
同步可以保证顺序，但是会阻塞，异步可以解决阻塞，但会改变顺序

Promise
	出现的原因：出现之前，处理一个异步网络请求，需要根据第一个请求的结果，执行第二个网络请求，然后继续下一个，造成回调地狱，代码臃肿，可读性差，耦合度高，复用性差，bug多。为了解决异步嵌套问题，有了promise，业界还有Q和bluebird解决方案。
	Promise是异步编程的解决方案，比传统的异步解决方案回调函数和事件更加合理和强大，写法 
new Promise(请求1)
.then(请求2(请求结果1))
.then(请求3(请求结果2))
.catch(处理异常(异常信息))
Promise.resolve(value), 如果value是promise对象，则该对象作为Promise.resolve方法的返回值返回。如果value是thenable对象，返回Promise对象跟随thenable对象的最终状态。如果value是其他情况，返回一个promise对象。构造函数内部的代码是立即执行的
Promise.reject，返回的promise对象的状态为rejected
Promise.prototype.then，实例方法，为promise注册回调函数，一定要return一个结果或者一个新的promise对象，才可以让接下来的then回调接受
Promise.prototype.catch，实例方法，捕获异常，注册之前的回调抛出的异常信息
Promise.race，多个promise任务同时执行，返回最先执行结束的promise任务的结果，不管这个promise结果是成功还是失败
Promise.all，多个promise任务同时执行，如果全部执行成功，以数组的形式返回所有的执行结果，有一个rejected，就只返回rejected任务的结果
Promise对象的三个状态：
	Pending，异步任务正在执行
	Resolved（fulfilled） ，异步任务执行成功
	Rejected，异步任务执行失败
状态一旦改变，便不能再被更改为其他状态
第一步：Promise初始化的两种方式：
	new Promise（fn）
	Promise.resolve（fn）
第二步：调用上一步返回的promise对象的then方法，注册回调函数，回调函数可以有一个参数或者没有参数，如果then中的回调函数依赖上一步的返回结果，要带参数
第三步：注册catch异常处理函数，处理前面回调中可能抛出的异常
缺点无法取消Promise，如果出现某种情况是这个任务悬而未决，无法从外部停止它的进程，错误需要通过回调函数捕获，容易被无意忽略，单一值，只能有一个完成值或者拒绝利用，如果想收到多个结果只能用数组或者对象封装传递结果。性能的性能慢一些对比回调。
Promise和回调的关系：
	Promise不是回调的代替，而是在回调和后面的代码直接提供了中间机制来管理回调，监听request，得到通知后，根据情况进行回调，一旦决议，就保持在这个状态，就变成immutable value
ajax(url)
 .then(res => {
     console.log(res)
     return ajax(url1)
 }).then(res => {
     console.log(res)
     return ajax(url2)
 }).then(res => console.log(res))
 


生成器，yield，迭代器
Yield关键字，用来生成es6的生成器，yield暂停函数，next启动函数，返回yield后的表达式结果，yield本身没有返回值或者返回undefined，next可以带参数，会被当做上一个yield表达式的返回值。
一个函数function前或后有个*表示这个函数就是生成器，该函数只运行函数的一部分，剩余部分通过next控制执行。生成器是一种返回迭代器的函数。可以控制函数的执行
迭代器是一种对象，具有一些专门为迭代过程设计的专有接口，所有迭代器对象都有一个next方法，每次调用都返回一个结果对象。next（）返回两个参数，done和value，done为false表示函数没有执行完毕，没有更多可返回数据，value表示函数yield后面的值，到最后done为true，value是return的值
可迭代对象具有Symbol.iterator属性，通过指定的函数可以返回一个作用于附属对象的迭代器。比如集合对象（数组，set或map）和字符串，通过生成器创建的迭代器都是可迭代对象
for-of循环每次都会调用可迭代对象的迭代器接口的next（）方法，并将返回结果对象的value属性存储在一个变量，持续到返回对象属性值为true。
一般next调用要比yield多一个，第一个next会启动一个生成器，运行到第一个yield，每个yield表示：这里我应该插入什么值，然后下一个next回答。插入之后，yield后面的表达式就不用看了，比如x=yeild 2，next（3)，结果就是3，value就是插入上一个yield后，yield后面的表达式的值
function *foo() {
   var x = yield 2;
   console.log(x)
   var y = x * (yield x + 1)
   console.log(y)
   console.log( x, y );
   return x + y
}
 
var it = foo();
it.next()// {value: 2, done: false}
it.next(4)// {value：5, done: false}
it.next(3)// {value: 16, done: true}
 
Foo是生成器, it是foo的迭代器，可以用生成器创建可迭代对象
手动迭代生成器函数很麻烦，一般会配合co库使用，更优雅的编写非阻塞代码
function *fetch() {
 yield ajax(url, () => {})
 yield ajax(url1, () => {})
 yield ajax(url2, () => {})
}
let it = fetch()
let result1 = it.next()
let result2 = it.next()
let result3 = it.next()

async 和 await
	编写异步或者非阻塞代码的最终解决方案，建立在promise之上，可读性和间接性更好，可以轻松地达成之前使用生成器和co函数所做到的工作。使异步代码看上去像同步代码，将生成器函数和自动执行器包装在一个函数里。
	用try和catch捕获异常
	await关键字只能在async方法中使用
	使用async申明函数会隐式返回一个promise
	Await会等待右侧表达式返回之后，再执行下一行
	async就是生成器函数的语法糖，只是*变成了async，yeild变成了await，不用实现promise和generator的结合，async执行时，一旦遇到await，就会先返回，等异步操作完成，再接着执行函数体内后面的语句，并返回一个promise对象。
	正常情况下，await后面是一个promise对象，如果不是，会转成一个立即resolve的promise对象，如果这个对象reject，reject的参数会被catch方法的回调接受到。
	对比生成器的优点，内置执行器，免去手动迭代生成器，更好的语义，yield后面只能是thunk函数或promise对象，await后面是promise对象或者原始类型的值。async返回值是promise对象，而生成器函数式iterator对象。
	注意，await后面的promise对象，可能是rejected，所以最好放在try catch中。对个await命令后面的异步操作，如果不存在继发关系，最好同时触发
缺点就是将异步代码改造成了同步代码，如果多个异步代码没有依赖性却用了await会有性能的降低，如果没有依赖性完全可以使用promise.all

### 类数组
类数组转数组可以用
Array.prototype.slice.call(arraylike) 
Array.prototype.splice.call(arraylike,0)
Array.from(arraylike)
Array.prototype.concat.apply([],arraylike)
[...arguments]，可以直接转成数组 
Arguments对象就是类数组对象，经常用第一种方法转成数组
Length属性返回实参的长度，function的length返回形参长度
Callee属性可以调用函数自身

### this
This永远指向最后调用它的那个对象，a()等于window.a()，window.a.fn()算对象a的调用
如何改变this的指向：
使用箭头函数
函数内部使用_this = this
使用apply，call，bind
	匿名函数的this永远指向window
	This作为对象调用，指向该对象，作为函数调用，指向全局window，作为构造函数调用，指向当前实例对象，作为call与apply调用，指向当前object

### nextTick
在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM.
1. vue用异步队列的方式来控制dom的更新和nexttick回调先后执行（把nexttick当成dom更新宏任务的微任务）
2. vue的降级策略：开始用promise的then兼容性，mutationObserver有bug。所以只能降级到宏任务
3. setImmediate第一优先级，只有IE和nodejs支持，MessageChannel第二优先级，但也有兼容性问题，所以一般用settimeout，虽然其有执行延迟，可能造成多次渲染
4. 如果同一个 watcher 被多次触发，只会被推入到队列中一次
5. process.nextTick属于微任务，但是作为微任务第一个执行，所以如果希望异步任务尽可能快，就用它

### HTTP状态码
1xx: 临时响应
100:请求者继续发请求，加大力度，服务器已经收到一部分，但还没收完
101:切换协议，比如websocket

2xx：成功
200:成功
201:服务端已创建
202:服务器已接受请求，但未处理
203:服务器已处理请求，但返回信息来自其他源
204:无内容，服务器成功处理，但没有返回内容
205:重置内容，服务器成功处理，但没有返回内容
206:部分内容，已经处理部分get请求

3xx：重定向，完成请求需要进一步操作
300:多种选择
301：永久移动
302:临时移动
303:查看其他位置
304:未修改，缓存击中
305:使用代理
307:临时重定向

4xx：请求错误
400:bad request
401:未授权
403:禁止
404:未找到
405:方法禁用
406:不接受
407:需要代理授权
408:请求超时
409:冲突
410:已删除

5xx：服务器错误
500:后台错误
501:未实施
502:错误网关
503:服务器暂时不可用
504:网关超时
505:服务器不支持http版本

### 简单请求与非简单请求
非简单请求下会发options请求，在跨域之前，进行预检，不带cookie，返回允许的方法，origin和认证信息等
简单请求：GET，POST或head，application/x-www-form-urlencoded、multipart/form-data、text/plain，Accept、Accept-Language、Content-Language、Content-Type、Last-Event-ID
除此之外，都是非简单请求