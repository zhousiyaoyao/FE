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