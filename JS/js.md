### 1.实现new
```javascript
function new_new(){
    let obj = {}
    const Constructor = [].shift.call(arguments);// 取出第一个参数为构造函数
    obj.__proto__ = Constructor.prototype;
    var result = Constructor.apply(obj, arguments);
    return typeof result === 'object' ? result : obj;
}
```
### 2.实现bind
```javascript
Function.prototype.bind_bind = function (context, ...bindArgs) {
	let _me = this
    function Fn() {}
    let fBound = function(...args) {
        return _me.apply(this instanceof fBound ? this : context, bindArgs.concat(args))
    }
    Fn.prototype = this.prototype
    fBound.prototype = new Fn();
    return fBound
}
```

### 3.实现apply
```javascript
Function.prototype.apply_apply = function (context, arr) {
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
### 4.实现call
```javascript 
Function.prototype.call_call = function(context){
    context = context ? Object(context) : window
    context.fn = this
    let args = [...arguments].slice(1)
    let r = context.fn(args)
    delete context.fn
    return r
} 
```
### 5.实现instanceof
```javascript
function instance_of(L, R) {
    var prototype = R.prototype
    L = L.__proto__
    while (true) { 
     if (L === null) {
       return false
     }
     if (prototype === L) {
       return true
     } 
     L = L.__proto__
    } 
}
```
### 6.实现promise
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
### 7.手写深拷贝
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
### 8.手写浅拷贝
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
### 9.手写jsonp
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
### 10.手写继承
### 11.手写节流
### 12.手写防抖
### 13.手写函数柯里化
### 14.手写函数compose
### 15.手写链式调用
### 16.手写eventEmitter
### 17.数组拍平
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
### 18.数组乱序
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