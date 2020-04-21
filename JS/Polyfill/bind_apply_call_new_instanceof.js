let obj = {name:'pppp'}
function parent(name){
    this.name = name;
}
parent.prototype.getName = function(){
    console.log(this.name)
}
function new_new(){
    let obj = {}
    const Constructor = [].shift.call(arguments);// 取出第一个参数为构造函数
    obj.__proto__ = Constructor.prototype;
    var result = Constructor.apply(obj, arguments);
    return typeof result === 'object' ? result : obj;
}

Function.prototype.call_call = function(context){
    context = context ? Object(context) : window
    context.fn = this
    let args = [...arguments].slice(1)
    let r = context.fn(args)
    delete context.fn
    return r
}

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

function instance_of(L, R) {//L 表左表达式，R 表示右表达式，即L为变量，R为类型
    // 取 R 的显示原型
    var prototype = R.prototype
    // 取 L 的隐式原型
    L = L.__proto__
    // 判断对象（L）的类型是否严格等于类型（R）的显式原型
    while (true) { 
     if (L === null) {
       return false
     }
       
     // 这里重点：当 prototype 严格等于 L 时，返回 true
     if (prototype === L) {
       return true
     } 
     
     L = L.__proto__
    } 
}
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

var p = new_new(parent,'ssss')
p.getName()
p.getName.apply_apply(obj)
p.getName.call_call(obj)
let q = p.getName.bind_bind(obj)
q()
