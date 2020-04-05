let obj = {name:'pppp'}
function parent(name){
    this.name = name;
}
parent.prototype.getName = function(){
    console.log(this.name)
}
// new
function new_new(){
    let obj = {}
    const Constructor = [].shift.call(arguments);// 取出第一个参数为构造函数
    obj.__proto__ = Constructor.prototype;
    var result = Constructor.apply(obj, arguments);
    return typeof result === 'object' ? result : obj;
}
// call
Function.prototype.call_call = function(context){
    var context = context || window
    context.fn = this;
    var args = []
    for(var i=1,len=arguments.length; i<len; i++){
        args.push('arguments[' + i + ']');
    }
    var result = eval('context.fn(' + args + ')')
    delete context.fn
    return result
}
// apply
Function.prototype.apply_apply = function (context, arr) {
    var context = Object(context) || window;
    context.fn = this;

    var result;
    if (!arr) {
        result = context.fn();
    }
    else {
        var args = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            args.push('arr[' + i + ']');
        }
        result = eval('context.fn(' + args + ')')
    }

    delete context.fn
    return result;
}
// bind
Function.prototype.bind_bind = function (context) {

    if (typeof this !== "function") {
      throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);

    var fNOP = function () {};

    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
    }

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
}
// instanceof
function instance_instance(left, right){
    let proto = Object.getPrototypeOf(left)
    let prototype = right.prototype
    while(true){
        if(!proto){
            return false
        }
        if(proto === prototype){
            return true
        } 
        proto = Object.getPrototypeOf(proto)
    }
}

var p = new_new(parent,'ssss')
p.getName()
p.getName.apply_apply(obj)
p.getName.call_call(obj)
let q = p.getName.bind_bind(obj)
q()
