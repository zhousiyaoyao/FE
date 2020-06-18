# 目录
* [1. 实现new](#1-实现new)
* [2. 实现bind](#2-实现bind)
* [3. 实现apply](#3-实现apply)
* [4. 实现call](#4-实现call)
* [5. 实现instanceof](#5-实现instanceof)
* [6. 实现promise](#6-实现promise)
* [7. 手写深拷贝](#7-手写深拷贝)
* [8. 手写浅拷贝](#8-手写浅拷贝)
* [9. 手写jsonp](#9-手写jsonp)
* [10. 手写继承](#10-手写继承)
* [11. 手写节流](#11-手写节流)
* [12. 手写防抖](#12-手写防抖)
* [13. 手写函数柯里化](#13-手写函数柯里化)
* [14. 手写函数compose](#14-手写函数compose)
* [15. 手写链式调用](#15-手写链式调用)
* [16. 手写eventEmitter](#16-手写eventEmitter)
* [17. 数组拍平](#17-数组拍平)
* [18. 数组乱序](#18-数组乱序)
* [19. 扁平数组和树](#19-扁平数组和树)
* [20. 遍历dom树](#20-遍历dom树)
* [21. 实现getElementById](#21-实现getElementById)
* [22. 实现promise all](#22-实现promise_all)
* [23. 实现promise race](#23-实现promise_race)
* [24. 手写ajax原生请求](#24-手写ajax原生请求)
* [25. 千分位转换](#25-千分位转换)
* [26. promise_all并发限制](#26-promise_all并发限制)
* [27. promise控制并发面试题](#27-promise控制并发面试题)


### 1. 实现new
1. 创建新对象
2. prototype连接
3. 将这个对象绑定到构造函数的this中
4. 如果函数没有返回其他对象，直接返回这个对象，否则返回result对象
```javascript
function new_new(){
    let obj = {}
    const Constructor = [].shift.call(arguments);// 取出第一个参数为构造函数
    obj.__proto__ = Constructor.prototype;
    var result = Constructor.apply(obj, arguments);
    return typeof result === 'object' ? result : obj;
}

```
### 2. 实现bind
1. 改变原函数this的指向
2. 返回原函数的拷贝
3. new调用时，thisArg参数无效，new操作符修改的this优先级更高
```javascript
Function.prototype.bind_bind = function (context, ...bindArgs) {
	let self = this 
  let fBound = function(...args) {
      return self.apply(this instanceof self ? this : context, bindArgs.concat(args))
  }
  function Fn() {}
  Fn.prototype = this.prototype
  fBound.prototype = new Fn();
  // fBound.prototype = this.prototype ，需要一个空函数作为中间人，防止fBound修改，原函数也修改
  return fBound
}
function foo(name) {
    this.name = name;
} // self的引用就是foo
var obj = {};
var bar = foo.myBind(obj); // bar就是fBound
bar('Jack');  // 此时this指向全局变量，判断为false，绑定函数的this指向context
console.log(obj.name);  // Jack
var alice = new bar('Alice'); // 此时this指向new表达式返回的对象alice，判断为true，得到的值还是指定的对象，所以要原型连接
console.log(obj.name);  // Jack
console.log(alice.name);    // Alice
```

### 3. 实现apply
```javascript
Function.prototype.apply_apply = function (context) {
    context = context ? Object(context) : window
    context.fn = this
    let args = [...arguments][1]
    if (!args) {
        return context.fn()
    }
    let r = context.fn(args)
    delete context.fn;
    return r
}
```
### 4. 实现call
```javascript 
Function.prototype.call_call = function(context){
    context = context ? Object(context) : window //判断是否为null或者undefined,同时考虑传递参数不是对象情况
    context.fn = this
    let args = [...arguments].slice(1)
    let r = context.fn(args)
    delete context.fn
    return r
} 
```
### 5. 实现instanceof
```javascript
function instance_of(L, R) {
    L = L.__proto__
    while (true) { 
     if (L === null) {
       return false
     }
     if (L === R.prototype) {
       return true
     } 
     L = L.__proto__
    } 
}
```
### 6. 实现promise
1. 自身属性value，reason，status，resolve的callback数组，reject的callback数组
2. resolve方法，status为pending时，赋值value，status，执行resolve全部方法
3. reject方法，status为pending时，赋值reason，status，执行reject全部方法
4. 执行执行器函数
5. 原型上定义then方法，传入onFulfilled和onRejected作为参数
6. status为resolve，执行onFulfilled，为reject，执行onRejected，为pending时，resolve的数组加入onFulfilled，reject数组加入onRejected
```javascript
function MyPromise(executor){
    let self = this
    self.value = undefined
    self.reason = undefined
    // 默认promise状态是pending
    self.status = 'pending'
    // 用来保存then 方法中，第一个参数
    self.onResolvedCallbacks = []
    // 用来保存then 方法中，第二个参数
    self.onRejectedCallbacks = []
    function resolve(value){
      if(self.status === 'pending'){ //保证状态一旦变更，不能再次修改
        self.value = value
        self.status = 'resolved' // 成功状态
        self.onResolvedCallbacks.forEach(fn => {
          fn()
        })
      }
    }
    function reject(reason){
      if(self.status === 'pending'){
        self.reason = reason
        self.status = 'rejected' //失败状态
        self.onRejectedCallbacks.forEach(fn => {
          fn()
        })
      }
    }
    executor(resolve, reject) // 因为会立即执行这个执行器函数
  }
  
  MyPromise.prototype.then = function(onFulfilled, onRejected){
    let self = this
    if(self.status === 'resolved'){
      onFulfilled(self.value)
    }
    if(self.status === 'rejected'){
      onRejected(self.reason)
    }
    if(self.status === 'pending'){
    // 订阅
      self.onResolvedCallbacks.push(function(){
        onFulfilled(self.value)
      })
      self.onRejectedCallbacks.push(function(){
        onRejected(self.reason)
      })
    }
  }
```
### 7. 手写深拷贝
```javascript
// 1
var b = JSON.parse(JSON.stringify(obj))
// DFS
var deepCopyDFS = function() {
    let res = new Map()
    return function(obj){
        if(res.has(obj)){
            return obj
        }
        res.set(obj,obj)
        if(obj === null){
            return null
        }
        var newObj = Array.isArray(obj) ? [] : {}
        for(let i in obj){
            if(i in obj){
                if(typeof obj[i] === 'object'){
                    newObj[i] = deepCopyDFS(obj[i])
                }else{
                    newObj[i] = obj[i]
                }
            }
        }
        return newObj
    }
}()
// BFS
function BFSDeepClone(obj) {
    if(obj === null){
        return null
    }
    let newObj = {}
    const queue = [obj]
    const temp = [newObj]
    const vistied = new Set([obj])
    while (queue.length) {
      const a = queue.shift()
      const copyObj = temp.shift()
      Object.keys(a).forEach(key => {
        const item = a[key]
        if (typeof item === 'Object') {
          if (vistied.has(item)) {
            copyObj[key] = item
          } else {
            vistied.add(item)
            copyObj[key] = typeof item === 'Object' ? {} : []
            queue.push(item)
            temp.push(copyObj[key])
          }
        } else {
          copyObj[key] = item
        }
      })
    }
    return newObj
  }
```
### 8. 手写浅拷贝
```javascript
var shallowCopy = function(obj) {
	if(typeof obj !== 'object') return;
	var newObj = obj instanceof Array ? [] : {};
	for (var key in obj){
		if(obj.hasOwnProperty(key)){
			newObj[key] = obj[key]
		}
	}
	return newObj
}
```
### 9. 手写jsonp
```javascript
// jsonp 在html页面中通过相应的标签从不同域名下加载静态资源文件是被浏览器允许的
// 一般，我们可以动态的创建script标签，再去请求一个带参网址来实现跨域通信
var script = document.createElement("script")
script.src = "http://127.0.0.1:8888/index.php?callback=jsonpCallback"
document.head.appendChild(script);
function jsonpCallback(data){
	var data = JSON.parse(json)
}

this.$axios({
	method: "post",
	url: "http://127.0.0.1:8888/demo/super/saveReply",
	data: this.$qs.stringify({
	})
  }).then(response => {
  }).catch(error => console.log(error, "error"))
```
### 10. 手写继承
```javascript
// 1. 原型链继承，引用类型的属性被所有实例共享，且创建child不能向父类传参
function parent(){
	this.name = ['kevin', 'daisy'];
}
parent.prototype.pro = function(){
	this.age = {age : 12};
}
function child(){}
child.prototype = new parent()
child.prototype.constructor = child
let c1 = new child()
c1.name.push('aini')
let c2 = new child()
console.log(c2.name)

// 2. 构造继承，引用类型的属性不会被所有实例共享
function parent(){
	this.name = ['kevin', 'daisy'];
}
parent.prototype.pro = function(){
	this.age = {age : 12};
}
function child(){
	parent.call(this)
}
var c1 = new child()
c1.name.push('aini')
var c2 = new child()
console.log(c2.name)

// 2. 构造继承，可以传参数
function parent(name){
	this.name = name;
}
function child(name){
	parent.call(this,name)
}
var c1 = new child('cass')
console.log(c1.name)

// 3. 组合继承, 面面俱到，创建实例时，原型中有一份相同的属性，实例的属性覆盖了原型的属性，因为parent构造函数调用了2次，浪费内存
function parent(name){
	this.name = name;
	this.colors = ['red','blue','yellow'];
}
parent.prototype.getName = function(){
	console.log(this.name)
}
function child(name, age){
	parent.call(this, name) //第二次调用
	this.age = age;
}
child.prototype = new parent() //第一次调用
child.prototype.constructor = child
var child1 = new child('woaini','18') //第二次调用
child1.colors.push('good')
console.log(child1.name)
console.log(child1.age)
console.log(child1.colors)
console.log(child1)
var child2 = new child('sisisis','1000')
console.log(child2.name)
console.log(child2.age)
console.log(child2.colors)
console.log(child2)

// 4. 寄生组合继承, 解决了上述问题
function parent(name){
	this.name = name
	this.colors = ['red']
}
parent.prototype.getName = function(){
	console.log(this.name)
}
function child(name,age){
	parent.call(this,name)
	this.age = age
}
var F = function(){}
F.prototype = parent.prototype;
child.prototype = new F();
// child.prtotype = Object.create(parent.prototype)
var child1 = new child('xiaoming','12')
console.log(child1)

// 4. 封装一下
function parent(name){
	this.name = name
	this.colors = ['red']
}
parent.prototype.getName = function(){
	console.log(this.name)
}
function child(name,age){
	parent.call(this,name)
	this.age = age
}
function inherit(child, parent){
	var F = function(){}
	F.prototype = parent.prototype
	child.prototype = new F()
}
inherit(child, parent);
var child1 = new child('xiaoming','12')
console.log(child1)
```
### 11. 手写防抖
```javascript
//debounce，第一个timeout为null，声明一个timeout为计时器，调用fn，10s内再次访问，重新生成timeout， 10s
function debounce1(func, wait) {
	var timeout;
	return function(){
		var content = this;
        var args = arguments;
        if(timeout){
            clearTimeout(timeout)
        }
		timeout = setTimeout(function(){
			func.apply(content,args)
		},wait);
	}
}
container.onmousemove = debounce1(getUserAction, 1000);

// 立即执行，用一个imm为true，第一次timeout为null，flag为true，立刻执行，这时有timeout，flag为false，不能执行
function debounce3(func, wait, immediate) {
	var timeout;
	return function(){
		var content = this;
		var args = arguments;
		if (timeout) clearTimeout(timeout);
		if(immediate){
			var callNow = !timeout;
			timeout = setTimeout(function(){
				timeout = null;
			}, wait)
			if(callNow) func.apply(content, args)
		}
	}
}

// 立即执行且带返回值的debounce
function debounce2(func, wait, immediate) {
	var timeout, result;
	return function(){
		var content = this;
		var args = arguments;
		if (timeout) clearTimeout(timeout);
		if(immediate){
			var callNow = !timeout;
			timeout = setTimeout(function(){
				timeout = null;
			}, wait)
			if(callNow) result = func.apply(content, args)
		}else{
			timeout = setTimeout(function(){
				func.apply(content, args)
			},wait);
		}
		return result
	}
}
```
### 12. 手写节流
```javascript
// 节流 throttle 立即执行，基于时间戳，停止触发后，不会有最后一次
// 以前时间为0，现在时间减去之前，第一次肯定大于wait，执行，previous变成now，再10s执行一次
function throttle1(func, wait){
	var content, args;
	var previous = 0;
	return function(){
		var now = new Date()
		content = this
		args = arguments
		if(now - previous > wait){
			func.apply(content, args);
			previous = now;
		}
	}
}

// 第一次不执行，基于定时器，停止触发后，有最后一次
// timeout开始为0，设置timeout，10s，timeout为null且调用func，所以10s后，调用一次，timeout变null，再调用一次
function throttle2(func, wait){
	var timeout = 0;
	return function(){
		context = this;
		args = arguments;
		if (!timeout){
			timeout = setTimeout(function(){
				timeout = null
				func.apply(context, args)
			}, wait)
		}
	}
}
```
### 13. 手写函数柯里化
```javascript
function curry(fn, ...thisArgs){
    return function(...args){
      if(args.length + thisArgs.length < fn.length){
        return curry(fn, ...thisArgs.concat(args))
      }
      return fn.apply(this, thisArgs.concat(args))
    }
  }
  const add = curry((a, b, c) => a + b + c)
  console.log(add(1,1)(2))
```
### 14. 手写函数compose
```javascript
const add1 = (x) => x + 1
const mul3 = (x) => x * 3
const div2 = (x) => x / 2

function compose(...fn){
  return x => fn.reduceRight((pre,cur) => cur(pre), x)
}

function compose(...fn){
  return function(parameter){
    for(var i = fn.length - 1; i >= 0; i--){
      parameter = fn[i](parameter)
    }
    return parameter
  }
}
const operate = compose(div2, mul3, add1, add1)
console.log(operate(0)) // => 相当于 div2(mul3(add1(add1(0))))
```
### 15. 手写链式调用
```javascript
Function.prototype.method = function(name, fn){
  this.prototype[name] = fn
  return this
}
var a = function(){

}
a.method('start', function(){

}).
method('end', function(){

});

function add(num) {
	var nums = num;
	function twwo(num){
		nums += num;
		return twwo;
	}
	twwo.sum = function() {
		return nums
	}
	return twwo;
}
console.log(add(1)(2)(3).sum())
```
### 16. 手写eventEmitter

```javascript
var events = (function() {
    var topics = {}
    return{
        publish: function(topic, info){
            console.log('public' + topic)
            if(topics.hasOwnProperty(topic)){
                topics[topic].forEach((handler) => {
                    handler(info ? info : {})
                })
            }
        },
        subscribe: function(topic, handler){
            console.log('subscribe' + topic)
            if(!topics.hasOwnProperty(topic)){
                topics[topic] = [];
            }
            topics[topic].push(handler)
        },
        remove: function(topic,handler){
            if(!topics.hasOwnProperty(topic)){
                return;
            }
            var handlerIndex = -1
            topics[topic].forEach((element, index) => {
                if(element === handler){
                    handlerIndex = index;
                }
            })
            if (handlerIndex >= 0){
                topics[topic].splice(handlerIndex, 1)
            }
        },
        removeAll: function(topic){
            console.log('remove all the handler on the topic:' + topic);
            if(topics.hasOwnProperty(topic)){
                topics[topic].length = 0
            }
        }
    }
})()
```
### 17. 数组拍平
```javascript
// 1
var a = [1,[1,2],[1,[1,3],3]]
var b = a.toString().split(',').map((value => parseInt(value)))

// 2
const flatten = (arr) => {
    if(!Array.isArray(arr)){
        return
    }
    var res = []
    res = arr.reduce((pre,cur) => {
        return pre.concat(cur instanceof Array ? flatten(cur) : cur)
    },[])
    return res
  }
var b = flatt(a)
console.log(b)
```
### 18. 数组乱序
```javascript
function random_sort(arr){
    var result = []
    while(arr.length > 0){
        var index = Math.floor(Math.random() * arr.length)
        result.push(arr[index])
        arr.splice(index,1)
    }
    return result
}
```

### 19. 扁平数组和树
```javascript
var arr = [{id: 1, pid: '-1'},{id: 11, pid: '1'},{id: 12, pid: '1'}]
function listToTree(list) {
    var map = {}, node, tree= [], i;
    for (i = 0; i < list.length; i ++) {
        map[list[i].id] = list[i]; 
        list[i].children = []; 
    }
    for (i = 0; i < list.length; i += 1) {
        node = list[i];
        if (node.pid !== '-1') {
            map[node.pid].children.push(node);
        } else {
            tree.push(node);
        }
    }
    return tree;
}
```
```javascript
function listToTreeWithLevel(list, parent, level) {
    var out = []
    for (var node of list) {  
            if (node.pid == parent) {
                node.level = level;
                var children = listToTreeWithLevel(list, node.id, level + 1)
                if (children.length) {
                    node.children = children
                }
                out.push(node)
            }
    }
    return out
}

listToTreeWithLevel(arr, '-1', 0)
```
```javascript
function treeToList(tree) {
  var queen = [];
  var out = [];
  queen = queen.concat(tree);
  while(queen.length) {
      var first = queen.shift();
    if (first.children) {
        queen = queen.concat(first.children)
      delete first['children'];
    }
    
    out.push(first);
  }
  return out;
}
```

### 20.遍历dom树
```javascript
 var list = []; //声明一个数组list,用来存放元素的后代元素.
 function getChildrens(ele){
        var children = ele.children;
        for(var i = 0 ; i < children.length; i++){
          var child = children[i]; //child就是这个ele函数的一个个的子元素.
          list.push(child); //把求出来的子元素存进list数组.
          //求出来的子元素,调用函数求他的子元素.
          getChildrens(child);
        }
      }
    //求body的所有后代. //遍历整个dom树.
  getChildrens(document.body);
  console.log(list);
```

### 21.实现getElementById

```javascript
const cusGetElementByIdByDFS = function (parentNode, id) {
    // 深度优先, 递归实现
    if (parentNode) {
        let target = null;
        const children = Array.from(parentNode.children);
        if (parentNode.id === id) {
            return parentNode;
        }
        for (let i = 0; i < children.length; i++) {
            target = cusGetElementByIdByDFS(children[i], id);
            if (target) {
                return target;
            }
        }
    }
    return null;
}

const cusGetElementByIdByDFS2 = function (parentNode, id) {
    if (!parentNode) {
        return null;
    }
    // 深度优先, 非递归实现， 使用栈
    let stack = [];
    if (parentNode.id === id) {
        return parentNode;
    }
    for (let i = parentNode.children.length; i > 0; i--) {
        stack.push(parentNode.children[i - 1]);
    }
    while (stack.length) {
        let node = stack.pop();
        if (node.id === id) {
            return node;
        } else {
            if (node.children.length > 0) {
                stack = Array.from(node.children).concat(stack);
            }
        }
    }
}

const cusGetElementByIdByBFS = function (parentNode, id) {
    // 广度优先 非递归实现
    // 队列的思想: 采用出队的方式遍历节点，如果遍历到的节点有子节点，则将子节点入队
    const layer = []; // 按照顺序存放每个层级的每个节点
    if (parentNode) {
        // 初始化layer
        // 节点深度从父节点开始算起
        layer.push({
            node: parentNode,
            depth: 1
        });
        while (layer.length > 0) {
            const root = layer.shift(); // 出队
            if (root.node.id === id) {
                return root; // 包括对应节点和节点深度
            } else {
                if (root.node.children.length > 0) {
                    Array.from(root.node.children).forEach(node => {
                        layer.push({
                            node,
                            depth: root.depth + 1
                        })
                    })
                }
            }
        }
    }
    return null;
}
```

### 22.实现promise_all
```javascript
function all(iterable){
  return new Promise((resolve, reject) => {
    let index = 0;
    for(var promise of iterable){
      const currentIndex = index
      promise.then(
        (value) => {
          if(anErrorOccurred) return
          result[currentIndex] = value
          count++
          if(count === result.length){
            resolve(result);
          }
        },
        (err) => {
          if(anErrorOccurred) return
          anErrorOccurred = true
          reject(err)
        }
      )
      index++
    }
    if(index === 0){
      resolve([]),
      return
    }
    let count = 0
    let anErrorOccurred = false
    const result = new Array(index)
  })
}

function promise_all(promises){
  return new Promise(resolve, reject){
    let len = promises.length
    let count = 0
    let res = []
    for(let i = 0; i < len; i++){
      Promise.resolve(promises[i]).then((value) => {
        count++
        res[i] = value
        if(count === len){
          return resolve(res)
        }
      }, (reason) => {
        return reject(reason)
      })
    }
  }
}

const promises = [Promise.resolve('a'),Promise.resolve('b'),Promise.resolve('c')]
Promise.all(promises).then((arr) => {
  console.log(arr)
})
const promises = [Promise.reject('error')]
Promise.all(promises).catch((err) => {
  console.log(err)
})

function downloadText(url){
  return fetch(url)
  .then((response) => {
    if(!response.ok){
      throw new Error(response.status.Text)
    }
    return response.text()
  })
}
const urls = ['1','2']
const promises = urls.map((url) => downloadText(url))
Promise.all(promises)
.then(
  (arr) => console.log(arr)
)
```

### 23.实现promise_race
```javascript
function promise_race(promises){
  return new Promise(resolve, reject) => {
    for(let i = 0; i < promises.length; i++){
      Promise.resolve(promises[i]).then((value) => {
        return resolve(value)
      },(reason) => {
        return reject(reason)
      })
    }
  }
}

function race(iterable){
  return new Promise((resolve, reject) => {
    for(const promise of iterable){
      promise.then(
        (value) => {
          if(settlementOccurred) return
          settlementOccurred = true
          resolve(value)
        },
        (err) => {
          if(settlementOccurred) return
          settlementOccurred = true
          reject(err)
        }
      )
    }
    let settlementOccurred = false
  })
}
const promises = [
  new Promise((resolve, reject) => setTimeout(() => resolve('result'), 100)),
  new Promise((resolve, reject) => setTimeout(() => resolve('ERROR'), 200))
]
Promise.race(promises)
.then(
  (result) => console.log(result),
  (err) => console.log(err))

function resolveAfter(ms, value = undefined){
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(value), ms)
  })
}
function timeout(timeoutInMs, promise){
  return Promise.race([
    promise,
    resolveAfter(timeoutInMs, Promise.reject(new Error('Operation timed out')))
  ])
}
timeout(200, resolveAfter(100, 'Result!'))
.then(result => console.log(result))
timeout(200, resolveAfter(100, 'Result!'))
.catch(result => console.log(result))
```

### 24.手写ajax原生请求
```javascript
const xhr = new XMLHttpRequest()
xhr.open("GET", 'http://www.zhengshengliang.com:9999/')
xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
xhr.send(null) // get
xhr.send("username="+name); // post
xhr.onreadystatechange = () => {
  if(xhr.state === 200 && xhr.readyState === 4){
    console.log(xhr.responseText)
  }
}
```

### 25.千分位转换
```javascript
const num = 1234567
const str = num.toLocaleString()
console.log(str) // 1,234,567
// or
var c = num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
```

### 26.promise_all并发限制
并发限制指的时每个时刻并发执行的promise数量是固定的，10w条并发请求，最终的执行结果也一样
promise不是调用promiseall时执行，而是实例化promise对象的时候执行
所以要并发限制，只能控制promise的实例化，基本步骤为
1. 从array第一个元素开始，初始化promise，用一个executing数组保存正在执行的promise
2. 不断初始化promise，直到limit
3. 使用promise.race，获得executing中promise的执行情况，当有一个promise执行完毕，继续初始化promise并放入executing中
4. 所有的promise都执行完毕后调用promise.all返回
```javascript
function pool(limit, array, func){
  let i = 0
  const ret = [] // promise数组
  const executing = [] // promise执行数组
  const enqueue = function () {
    // 当array为i时，直接resolve
    if( i === array.length){
      return Promise.resolve
    }
    // 每调用一次enqueue，初始化一个promise
    const item = array[i++]
    const p = Promise.resolve().then(() => func(item, array))
    // 放入promise数组
    ret.push(p)
    // promise执行完毕，从executing数组删除
    const e = p.then(() => executing.splice(executing.indexOf(e), 1))
    // 放入promise执行数组
    executing.push(e)
    // 使用promise.race，当执行数组数量低于limit，实例化新的promise并执行
    let r = Promise.resolve()
    if (executing.length >= limit) {
      r = Promise.race(executing)
    }
    // 递归遍历array
    return r.then(() => enqueue())
  }
  return enqueue().then(() => Promise.all(ret))
}
```

### 27.promise控制并发面试题
字节二面致死题，好好学一学
有一个图片url数组，实现一个方法，要求任何时刻同时下载链接不超过三个，下载完成resolve，失败reject
```javascript
function loadImg(url){
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = function(){
      console.log("加载完成")
      resolve()
    }
    img.onerror = reject
    img.src = url
  })
}
// 1. 递归法，开三个func递归，每次递归count+1，如果请求完成了，count-1
function solution1(urls){
    var count = 0
    var bao = function(){
      count++
      if(urls.length > 0 && count <=3){
        loadImg(urls.shift()).then(()=>{
          count--
        }).then(bao)
      }
    }
    for(var i = 0; i < 3; i++){
      bao()
    }
}

// 2. race递归法
function solution2(urls, loadImg){
  let i = 0
  const ret = []
  const executing = []
  const enqueue = function () {
    if( i === urls.length){
      return Promise.resolve
    }
    const item = urls[i++]
    const p = Promise.resolve().then(() => loadImg(item, urls))
    ret.push(p)
    const e = p.then(() => executing.splice(executing.indexOf(e), 1))
    executing.push(e)
    let r = Promise.resolve()
    if (executing.length >= 3) {
      r = Promise.race(executing)
    }
    return r.then(() => enqueue())
  }
  return enqueue().then(() => Promise.all(ret))
}
```