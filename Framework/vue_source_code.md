### vue3.0
option api不方便做tree-shaking而且拆的太碎了, composition api更好


### vue常见api
1. Mixin：全局注册一个混入，影响注册后的每一个vue实例，一般验证的函数可以写在里面
2. Method: 自动混入到vue实例中，直接通过实例访问这些方法，this自动绑定为vue实例
3. Computed：this自动绑定为vue实例，结果会缓存，除非依赖的响应式属性变化才会重新计算
4. Watch：观察vue实例的一个表达式或者一个函数计算结果的变化，回调函数得到的参数为新值和旧值。deep选项监听对象内部值，immediate选项以表达式当前值触发回调
5. Emit：触发当前实例的事件，附加参数会传给监听器回调
6. mount：如果vue实例化的时候没有收到el选项，则处于未挂载状态，没有关联DOM元素，可以用mount手动挂载
7. slot插槽：可以插入任何模板代码，HTML，组件。使用数据时，可以使用本身的实例数据，但是不能访问父级。子作用域和父作用域。
8. Ref: 给元素或子组件注册引用信息，引用信息将会注册在父组件的$refs对象上。如果在普通的DOM元素上使用，引用指向的就是DOM元素，如果用在子组件上，引用就指向组件实例。

# Diff算法

### 原因
渲染真实DOM的开销很大，修改某个数据，可能会引起整棵树的重绘和重排，diff算法可以只更新修改的那一块

1. 根据DOM树生成虚拟DOM树，和上次的虚拟dom树进行对比
2. 某个节点变化，会变成Vnode
3. Vnode和oldVnode对比
4. 调用patch函数，比较新旧节点，得到差异结果
5. 一次性对DOM进行批量操作

```javascript
<div>
    <p>123</p>
</div>
var Vnode = {
    tag: 'div',
    Children: [
        {tag: 'p', text: '123'}
    ]
}
```
Vnode主要属性，tagName，props（包括id，class），children


1. diff比较新旧节点，只会比较同层
2. 当数据发送改变，set方法调用Dep.notify通知所有watcher，订阅者就会调用patch给真实DOM打补丁
3. 判断isSameNode
4. 不是，新Vnode的换旧Vnode的，return Vnode
5. 是，分4种情况
6. 第一种：老节点有子节点，新节点没有，删除真实dom el的子节点
7. 第二种：老节点没有子节点，新节点有，将Vnode子节点真实化后添加到el
8. 第三种：都只有文本节点，且不相等，将el的文本节点设为vnode的
9. 第四种：都有子节点，执行updateChildren比较子节点

### patch函数
接受新旧两个节点作为参数，先判断sameVnode（key，标签，是否为注释节点，是否定义了data，input标签type是否相同）
不同的话，用新node换老node，获取老node的父元素，根据新vnode生成新元素，把新元素添加进老元素附近，删除老元素
相同的话，执行patchVnode，四种情况同上.

### updateChildren函数
新Vnode -> 子节点Vch -> new startIdx, new endIdx （ns，ne）
旧Vnode -> 子节点oldCh -> old startIdx, old endIdx （os，oe）
4个变量相互比较，4种比较都没有匹配，如果设置了key，就用key比较
比较过程变量会往中间靠拢，一旦startIdx > endIdx，表示两个子节点至少有一个遍历完了，算法结束

### 比较过程（两个指针都是往中间靠拢）
1. 旧头和新头对比，相同直接patchVnode，都+1
2. 旧尾和新尾对比，相同直接patchVnode，都-1
3. 旧头和新尾对比，相同直接patchVnode，旧头插到旧尾后面，旧头+1，新尾-1
4. 旧尾和新头对比，相同直接patchVnode，旧尾插到旧头后面，旧尾-1，新头+1
5. 如果以上都不符合，创建一个哈希表，key为旧的VNode，value为对应index序列，来找到与new node一致的旧节点index，如果找到且满足samenode，会把这个旧节点移到前面。如果找不到或者找到了也不是samenode，会创建一个新的dom节点，createElm
6. 遍历结束，如果新节点没有遍历完，按顺序加入到dom里去，addVnodes，如果老节点没有遍历完，直接删了，removeVnodes

### key的作用
如果存在key，且满足sameVnode，会对改节点进行复用，否则会创建新的节点

### 例子
没有key：
old:  a b c d
new:  b e d c
1. a和b对比，不同
2. d和c对比，不同
3. a和c对比，不同
4. d和b对比，不同
5. 创建一个b在前面
6. 同理创建一个e在前面
7. d匹配成功，d移到abc前面
8. c匹配成功，c移到ab前面
9. 删掉ab，最后结果b e d c (a b)

有key：
old:  a b c d
new:  b e d c
1. b匹配失败，但key找到了b，b移到acd前面
2. e匹配失败，且key没找到，创建e在b后面
3. d匹配成功，d移到ac前面
4. c匹配成功，c移到a前面，a删除
5. 结果是b e d c

# 虚拟DOM
目的：提高页面渲染和更新的速度

dom操作很昂贵
1. dom的实现和js引擎是分离的，如果用js频繁调用dom，相当于让两个相对独立的模块发送交互，性能损耗
2. dom操作会引起浏览器的重绘和重排，更大的性能损耗
3. 渲染过程中一次DOM更新，整个浏览器渲染的流程会重走一遍


# vue模版渲染过程

1. 数据绑定initstate
2. 模版编译compileToFunctions生成render,mount
3. render生成虚拟dom，vnode
4. diff算法得到差异patch
5. 虚拟dom映射到真实DOM

new Vue -> vm._init() -> vm.$mount(el) -> vm._render() ->vm._update(vnode)

### 数据绑定(vue实例绑定data)，initstate阶段
1. vue构造函数传入el和data，_init函数开始一系列的初始化
2. initstate负责数据，判断有没有props，methods，computed，watch，data，有的话init没有的话observe。data init调用initDate().
3. initDate把传入的data赋给vm._data，然后执行proxy.
4. proxy在vm上定义get和set（通过object.defineproperty），代理vm._data上的值.
5. _data是方法内部用的，也就是我们通过this.message获取到的值.

vue实例 -> _init -> initstate -> initDate -> proxy把data绑定到vm._data (this.message === vm.data.message === vm._data.message)

### 生成render函数(渲染数据到页面)$mount
1. _init函数初始化结束判断是否传入el，传入了就执行挂载函数$mount
2. $mount首先通过query函数对传入的el进行处理，如果有render option，直接生成，否则走程序。el是不string的话，首先定位el的dom元素，不是dom元素就创建div，return，是的话直接return这个dom元素。不是string的话，直接return el。
3. 最终都是用一个dom元素来挂载实例，但不能挂在body和html上，因为会把dom对象替换成新的div。
4. 模版提取：如果没传template，就获取el对应元素的全部内容，如果传了template，且以#开头，就找这个元素的innerHTML，如果是dom节点就把innerHTMl节点赋给template变量
5. 调用compileToFunction函数将模版编译为render函数，分为parse，optimize和generate三步
6. parse，用正则等方式对template模版进行字符串解析，得到指令，class，style等数据，形成AST抽象语法树，不断调用advance函数移动指针。把template解析成一个对象，对象包括模版的信息
7. optimize，为节点添加static属性，表示这个节点是静态的，初始化渲染只会就不会变化，diff算法会跳过静态节点
8. generate，把AST转化成render code, 然后成renderfunction

$mount -> 没传template拿el，传了template拿template -> 得到模版字符串 -> parse成抽象语法树 -> 抽象语法书优化加static -> generate render code,得到render函数
       -> 传入了render方法，直接生成render函数，好处是不会出现使用插值的时候，{{message}}的情况，因为会render执行结束才替换message，render会替换el

------响应式在这里开始------------（beforeMount)

### render到VNode的生成
1. 调用 render.call(vm._renderProxy, vm.$createElement)函数并返回生成的虚拟节点(vnode)，createElement函数生成vnode
2. createElement函数接受参数：vm实例，tag标签，data，children等
3. vnode的参数: children，context，data，key，isStatic等

render -> VNode

### 虚拟DOM映射为真实DOM，patch
1. vm._render生成vnode，vm._update把vnode渲染成真实dom节点
2. update在初始化和更新数据时调用，会调用patch
3. patch是createPatchFunction内部返回的一个方法
4. createPatchFunction对象有两个属性，nodeops封装dom原始操作的方法，modules数组集合，包括dom属性对应的钩子方法
5. createPatchFunction返回一个createElm函数来生成真实DOM，分成元素节点和组件两种方式
6. 元素节点就是先创建根节点父元素，createElm传入vnode创建三种节点：注释节点，文本节点，元素节点，前两种直接插父节点，元素节点创建父，再创子，子插父递归，然后再把vnode创建的节点都插到根节点父元素下面
7. 组件vnode，先创建组件，组件init钩子，初始化，实例化，mount，render，update里的patch遇到子组件，重新会init，循环，最后插入body
8. 最后把创建的dom插入到body


# vue小知识
runtime和runtimeonly的区别
1. runtimeonly是那天晚上踩坑的版本，需要webpack的vue-loader，默认带render，项目体积更小，运行速度更快，因为离线时编译
2. runtime是常用的版本，默认不带render，包括complier，帮助把template编译成render函数，但体积大，运行时complier消耗性能

# vue双向绑定原理，响应式解析
假设time是data的属性（Model），绑定了一个{{time}} （View）,time每一秒钟加1，没有dom操作，但视图也会加1
1. 通过Observer对data进行监听，提供订阅某个数据项变化的能力（view改变Model，input标签监听input事件就行，这个简单）
2. 把template解析成一段document fragment，解析其中的指令，得到每一个指令依赖的数据项和update方法
3. 通过watcher链接以上2者，把指令中的数据依赖通过watcher订阅在对应数据的Observer Dep上
4. 当数据变化，会触发Observer Dep上的notify方法通知对应的watcher进行update，更新DOM视图（Model改变view，这个是重点）

proxy不是真的proxy，只是通过object.defineProperty

### 添加observer（劫持并监听所有属性，有变动，通知订阅者）
init方法最后调用了observe
observe创建Dep对象实例，walk方法对obj的key遍历，每个调用convert
convert调用了defineReactive，加上get和set方法，这样属性被访问或者更新，可以追踪变化
当Dep.target不为空时，调用dep.depend和childObj.dep.depend收集依赖
改变data，会调用了setter方法，从而调用dep.notify通知（model - view）
Dep类是简单观察者模式的实现。只有id属性和subs数组，存储着订阅它的watcher，Dep.target表示当前正在计算的watcher，每时刻只有一个
depend方法把当前的dep实例加入到正在计算的watcher依赖中
notify遍历所有的watcher，调用他们的update

vue._init() -> observe(监听器) -> walk -> convert -> defineReactive -> getter and setter (数据劫持，监听到数据的变化，改变视图)
                              -> 创建Dep(id, subs)(消息订阅器)
            -> 属性被访问, getter, depend加入当前watcher依赖 
            -> 数据改变setter notify遍历watcher(发布订阅)
            -> watcher(订阅者)

### 指令编译complier（扫描和解析每个节点的相关指令，并根据初始化模板数据以及初始化相应的订阅器）
调用vm.compile对模版进行编译，变成一个document fragment，拿到el对象。
深度遍历递归调用compileNode
如果node.nodeType===1，表示非script普通节点，比如<p>,</div>，compileElement进行解析
如果node.nodeType===3，表示非空的文本节点，调用compileTextNode进行解析
对每个节点扫描，解析，将相关指令初始化为watcher，并替换模版数据或者绑定对应函数

### watcher（订阅者）
收到属性的变化，并通知执行相应函数，从而更新视图
update改变视图，text和input

### Dep 消息订阅器
subs数组存watcher
Dep.target表示当前watcher
getter里把watcher加入subs
setter里调用notify，也就是每一个watch都update

model改变view的过程
1. observer劫持监听属性，通知Dep变化
2. Dep通知watcher变化
3. watcher变化改变view
4. compiler初始化为view，且把指令初始化为watcher，getter会把watcher加入到Dep的subs里，setter调用notify，触发watcher

view改变model的过程
靠v-model，获取v-model对应的属性值，赋给元素的value，设置watcher，变化触发，通知属性更改

# vue数组劫持
```javascript
const arrayProto = Array.prototype
const arrayMethods = Object.create(arrayProto)
;[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
].forEach(item=>{
	Object.defineProperty(arrayMethods,item,{
	    value:function mutator(){
	    	//缓存原生方法，之后调用
	    	const original = arrayProto[item]	
	    	let args = Array.from(arguments)
		    original.apply(this,args)
	    },
	})
})
function protoAugment (target,src) {
  target.__proto__ = src
}
// 调用
let obarr = []
protoAugment(obarr, arrayMethods)
```


subs:[watch1:[],watch2:[]]
set: 设置Dep.target的值，收集依赖
get：notify这个watcher，执行update
