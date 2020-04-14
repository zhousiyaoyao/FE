// 1. ajax
// let xhr = new XMLHttpRequest();
// xhr.withCredentials = true //请求带cookie
// xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
// xhr.open(get, '/product');
// xhr.onreadystatechange = () => {
// 	if(xhr.readyState === 4 && xhr.status === 200 || xhr.status === 304){
// 		console.log(xhr.responseText)
// 	}
// }
// xhr.send()

//2. jsonp 在html页面中通过相应的标签从不同域名下加载静态资源文件是被浏览器允许的
// 一般，我们可以动态的创建script标签，再去请求一个带参网址来实现跨域通信
// var script = document.createElement("script")
// script.src = "http://127.0.0.1:8888/index.php?callback=jsonpCallback"
// document.head.appendChild(script);
// function jsonpCallback(data){
// 	var data = JSON.parse(json)
// }

// $.ajax({
// 	url:"http://www.nealyang.cn/login",
// 	type:'GET',
// 	dataType: 'jsonp',
// 	jsonpCallback: 'callback',
// 	data: {
// 		"username" : "siyao"
// 	}
// })

//3. shallow copy
// var shallowCopy = function(obj) {
// 	if(typeof obj !== 'object') return;
// 	var newObj = obj instanceof Array ? [] : {};
// 	for (var key in obj){
// 		if(obj.hasOwnProperty(key)){
// 			newObj[key] = obj[key]
// 		}
// 	}
// 	return newObj
// }

//4. deep copy
// var deepCopy = function(obj) {
// 	if(typeof obj !== 'object') return;
// 	var newObj = obj instanceof Array ? []:{};
// 	for (var key in obj){
// 		if(obj.hasOwnProperty(key)){
// 			newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
// 		}
// 	}
// 	return newObj
// }
// let arr = {sx : [1,2,3]}
// arrr = shallowCopy(arr)
// arrr.sx[0] = 2
// console.log(arr)
// console.log(arrr)

//5. debounce
// function debounce1(func, wait) {
// 	var timeout;
// 	return function(){
// 		var content = this;
// 		var args = arguments;
// 		clearTimeout(timeout)
// 		timeout = setTimeout(function(){
// 			func.apply(content,args)
// 		},wait);
// 	}
// }
// container.onmousemove = debounce1(getUserAction, 1000);


// 5.1 立即执行且带返回值的debounce
// function debounce2(func, wait, immediate) {
// 	var timeout, result;
// 	return function(){
// 		var content = this;
// 		var args = arguments;
// 		if (timeout) clearTimeout(timeout);
// 		if(immediate){
// 			var callNow = !timeout;
// 			timeout = setTimeout(function(){
// 				timeout = null;
// 			}, wait)
// 			if(callNow) result = func.apply(content, args)
// 		}else{
// 			timeout = setTimeout(function(){
// 				func.apply(content, args)
// 			},wait);
// 		}
// 		return result
// 	}
// }

// 6.1 节流 throttle 立即执行，基于时间戳，停止触发后，不会有最后一次
// function throttle1(func, wait){
// 	var content, args;
// 	var previous = 0;
// 	return function(){
// 		var now = new Date()
// 		content = this
// 		args = arguments
// 		if(now - previous > wait){
// 			func.apply(content, args);
// 			previous = now;
// 		}
// 	}
// }

// 6.2 第一次不执行，基于定时器，停止触发后，有最后一次
// function throttle2(func, wait){
// 	var timeout = 0;
// 	var pervious = 0;
// 	return function(){
// 		context = this;
// 		args = arguments;
// 		if (!timeout){
// 			timeout = setTimeout(function(){
// 				timeout = null
// 				func.apply(context, args)
// 			}, wait)
// 		}
// 	}
// }

// 7. 链式调用
// function wordschain(word){
// 	var words = word;
// 	function chain(word){
// 		words += ' -> ' + word;
// 		return chain;
// 	}
// 	chain.wdisd = function(){
// 		return words;
// 	}
// 	return chain;
// }
// console.log(wordschain('woaini')("wwww")('wwwww').wdisd())

// function add(num) {
// 	var nums = num;
// 	function twwo(num){
// 		nums += num;
// 		return twwo;
// 	}
// 	twwo.valueOf = function() {
// 		return nums
// 	}
// 	return twwo;
// }
// console.log(add(1)(2)(3).valueOf())

// 8.1 美团面试题
// var f1 = (x, y)=> console.log(x, y)
// function f2(func,x,y) {
// 	var args = [].slice.call(arguments, 1);
// 	args[0] = String(args[0]).split()
// 	func.apply(this,args)
// }
// f2(f1,5,6)

// 8.2 美团面试题
// var a = [{id:1, w:2},{id:1, w:3},{id:2, w:4},{id:2, w:11},{id:2, w:12},{id:2, w:11},{id:2, w:13}]
// res = {}
// for(let key in a){
// 	if (a[key].id in res){
// 		if(a[key].w > res[a[key].id]){
// 			res[a[key].id] = a[key].w
// 		}
// 	} 
// 	else{
// 		res[a[key].id] = a[key].w
// 	}
// }
// console.log(res)
// let result = new Array()
// for(let key in res){
// 	console.log(key,res[key])
// 	tmp = {}
// 	tmp.id = key
// 	tmp.w = res[key]
// 	result.push(tmp)
// }
// console.log(result)

// 8.3 美团面试题
// function countbit(num){
// 	dp = [0]
// 	for(var i = 1; i < num + 1; i++){
// 		if(i%2 == 1){
// 			dp.push(dp[i-1] + 1)
// 		}else{
// 			dp.push(dp[i/2])
// 		}
// 	}
// 	console.log(dp[num])
// }
// countbit(18)

// 8.4 美团面试题
// function findone(a){
// 	dic = {}
// for(var i in a){
// 	if(a[i] in dic){
// 		dic[a[i]] += 1
// 	}else{
// 		dic[a[i]] = 1
// 	}
// }
// for(var i in dic){
// 	if(dic[i] === 1){
// 		return i
// 	}
// }
// }
// var b = findone('coco')
// console.log(b)

// 9 继承
// 1. 原型链继承，引用类型的属性被所有实例共享，且创建child不能向父类传参
// function parent(){
// 	this.name = ['kevin', 'daisy'];
// }
// parent.prototype.pro = function(){
// 	this.age = {age : 12};
// }
// function child(){}
// child.prototype = new parent()
// // child.prototype.constructor = child
// let c1 = new child()
// c1.name.push('aini')
// let c2 = new child()
// console.log(c2.name)
// 2. 构造继承，引用类型的属性不会被所有实例共享
// function parent(){
// 	this.name = ['kevin', 'daisy'];
// }
// parent.prototype.pro = function(){
// 	this.age = {age : 12};
// }
// function child(){
// 	parent.call(this)
// }
// var c1 = new child()
// c1.name.push('aini')
// var c2 = new child()
// console.log(c2.name)
// 2. 构造继承，可以传参数
// function parent(name){
// 	this.name = name;
// }
// function child(name){
// 	parent.call(this,name)
// }
// var c1 = new child('cass')
// console.log(c1.name)
// 3. 组合继承, 面面俱到，创建实例时，原型中有一份相同的属性，实例的属性覆盖了原型的属性，因为parent构造函数调用了2次，浪费内存
// function parent(name){
// 	this.name = name;
// 	this.colors = ['red','blue','yellow'];
// }
// parent.prototype.getName = function(){
// 	console.log(this.name)
// }
// function child(name, age){
// 	parent.call(this, name) //第二次调用
// 	this.age = age;
// }
// child.prototype = new parent() //第一次调用
// child.prototype.constructor = child
// var child1 = new child('woaini','18') //第二次调用
// child1.colors.push('good')
// console.log(child1.name)
// console.log(child1.age)
// console.log(child1.colors)
// console.log(child1)
// var child2 = new child('sisisis','1000')
// console.log(child2.name)
// console.log(child2.age)
// console.log(child2.colors)
// console.log(child2)
// 4. 寄生组合继承, 解决了上述问题
// function parent(name){
// 	this.name = name
// 	this.colors = ['red']
// }
// parent.prototype.getName = function(){
// 	console.log(this.name)
// }
// function child(name,age){
// 	parent.call(this,name)
// 	this.age = age
// }
// var F = function(){}
// F.prototype = parent.prototype;
// child.prototype = new F();
// var child1 = new child('xiaoming','12')
// console.log(child1)
// 4. 封装一下
// function parent(name){
// 	this.name = name
// 	this.colors = ['red']
// }
// parent.prototype.getName = function(){
// 	console.log(this.name)s
// }
// function child(name,age){
// 	parent.call(this,name)
// 	this.age = age
// }
// function inherit(child, parent){
// 	var F = function(){}
// 	F.prototype = parent.prototype
// 	child.prototype = new F()
// }
// inherit(child, parent);
// var child1 = new child('xiaoming','12')
// console.log(child1)

// promise 如果传入的 value 本身就是 Promise 对象，则该对象作为 Promise.resolve 方法的返回值返回
// 如果传入的 value 本身就是 thenable 对象，返回的 promise 对象会跟随 thenable 对象的状态
// function fn(resolve){
// 	setTimeout(function(){
// 		resolve(123);
// 	},3000);
// }
// 两种初始化方式
// let p0 = new Promise(fn);
// let p1 = Promise.resolve(p0)
// console.log(p0);
// console.log(p1);
// console.log(p0 === p1);
// 实现promise
// function Promise(excutor) {
// 	var self = this
// 	self.onResolvedCallback = [] // promise resolve的回调函数数组
// 	// 传递给promise处理函数的resolve
// 	// 这里挂个data
// 	// 把回调数组里面一次执行一遍
// 	function resolve(value) {
// 		// 因为异步窒息，所以要settimeout
// 	  setTimeout(() => {
// 		self.data = value
// 		self.onResolvedCallback.forEach(callback => callback(value))
// 	  })
// 	}
// 	// 执行用户传入的函数
// 	excutor(resolve.bind(self))
// }

// Promise.prototype.then = function(onResolved) {
// 	// 保存上下文，那个promise调用then，就指向那个promise
// 	var self = this
// 	// 返回一个新的promise2
// 	return new Promise(resolve => {
// 	  self.onResolvedCallback.push(function() {
// 		  // onResolved对应then传入的函数
// 		var result = onResolved(self.data)
// 		// 返回一个promise3
// 		if (result instanceof Promise) {
// 			// 那么直接把promise2的resolve决定权交给了user promise
// 		  result.then(resolve)
// 		} else {
// 		  resolve(result)
// 		}
// 	  })
// 	})
//   }

//   const excutor = resolve => {
// 	  setTimeout(() => {
// 		  resolve(1)
// 	  }, 500)
//   }

//   var promise1 = new Promise(excutor) // promise构造函数返回的实例 promise1

//   promise1.then(res=>{
// 	  console.log(res)
// 	  // user promise
// 	  return new Promise(resolve =>{
// 		  setTimeout(() => {
// 			  resolve(2)
// 		  }, 500)
// 	  })
//   })

// new Promise(resolve => {
// 	setTimeout(() => {
// 		resolve(1)
// 	}, 500)
// })
// .then(res => {
// 	console.log(res)
// 	return new Promise(resolve => {
// 		setTimeout(() => {
// 			resolve(2)
// 		}, 500)
// 	})
// })
// .then(console.log)

// promise题目
// const promise1 = new Promise((resolve, reject) => {
// 	console.log('promise1')
// })
// console.log('1', promise1)
// 'promise1'
// '1' Promise{<pending>}

// const promise = new Promise((resolve, reject) => {
// 	console.log(1);
// 	resolve('success')
// 	console.log(2);
// });
// promise.then(()=>{
// 	console.log(3)
// });
// console.log(4) // 1,2,4,3

// const promise = new Promise((resolve, reject) => {
// 	console.log(1)
// 	console.log(2)
// })
// promise.then(()=>{
// 	console.log(3)
// })
// console.log(4) // 1,2 4

// const promise1 = new Promise((resolve, reject)=>{
// 	console.log('promise1')
// 	resolve('resove1')
// })
// const promise2 = promise1.then(res => {
// 	console.log(res)
// })
// console.log('1', promise1);
// console.log('2', promise2);

// 数组遍历 1. for循环
// var arr = [1,2,4,6]
// for(var i = 0; i < arr.length; i++){
// 	console.log(arr[i])
// }
// // 2. foreach，每个元素执行一次callback，没有返回值，不对原数组进行修改，但可以通过索引改变数组
// var arr = [1,2,4,6]
// arr.forEach(function(item,index,arr){
// 	item = item * 5
// 	console.log(item)
// 	arr[index] = item*5
// })
// console.log(arr)
// // 3. for in,对象等枚举属性，对象可以，数组不行
// var obj = {
//     name: 'test',
//     color: 'red',
//     day: 'sunday',
//     number: 5
// }
// for (var key in obj) {
//     console.log(obj[key])
// }
// 4. for of，iterate，数组可以，对象不行
// var arr =[1,2]
// for (item of arr) {
//     console.log(item)
// }
// 5. map 原数组进行处理后返回成一个新数组
// var arr = [1,2,3]
// var fiarr = arr.map(item => item * 5)
// console.log(fiarr)
// console.log(arr)
// 6. reduce 返回一个数，让前项和后项做某种计算，返回累计值
// var arr = [1,2,3,4]
// var res = arr.reduce(function(total,currentValue){
// 	return total - currentValue
// })
// console.log(res)
// console.log(arr)
// 7. filter 返回一个数组，符合条件的数组
// var arr = [2,3,4,5,6]
// var res = arr.filter(function(item){
// 	return item > 3
// })
// console.log(res)
// 8. every, 全部符合筛选条件，才true
// var arr = [2,3,4,5,6]
// var res = arr.every(function(item){
// 	return item > 3
// })
// console.log(res)
// 8. some, 有一个符合筛选条件，就true
// var arr = [2,3,4,5,6]
// var res = arr.some(function(item){
// 	return item > 3
// })
// console.log(res)

// slice, 起和终，返回删除的值，原数组不变。左开右闭
// splice，索引，几个，插入值，返回删除的值，原数组会变
// var arr = [1,2,3,4,5,6]
// let result1 = arr.slice(2,5)
// console.log(result1)
// console.log(arr)

// reduce大全
// let result2 = arr.splice(2,2,'w')
// console.log(result2)
// console.log(arr)
// var list = [['热', '冷', '冰'], ['大', '中', '小'], ['重辣', '微辣'], ['重麻', '微麻']];

// function compose(list){
// 	var res = list.reduce((sum1,cur1)=>{
// 		return cur1.reduce((sum2,cur2) =>{
// 			return sum2.concat(sum1.map(ele => [].concat(ele, cur2)))
// 		}, [])
// 	})
// 	console.log(res)
// 	return res.map(arr=>arr.join('+'))
// }

// a = compose(list)
// console.log(a)

// const calc1 = x => x * 2
// const calc2 = x => x - 1
// const calc3 = x => x * 3

// const sum = calc3(calc2(calc1(10)))
// console.log(sum)

// const calc = pipe(calc1,calc2,calc2)
// const sum1 = calc(10)
// console.log(sum)
// const pipe = (...functions) => (initialValue) =>
// functions.reduce((value,fn) => fn(value), initialValue);


// 闭包
// var data = [];
 
// // for (var i = 0; i < 3; i++) {
// //  data[i] = (function (i) {
// //      return function(){
// //        console.log(i);
// //      }
// //  })(i);
// // }
 
// for (var i = 0; i < 3; i++) {
//     data[i] = function () {
//       console.log(i);
//     };
//   }
 
// data[0]();
// data[1]();
// data[2]();s

