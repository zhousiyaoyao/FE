### 1.实现new
``function new_new(){
    let obj = {}
    const Constructor = [].shift.call(arguments);// 取出第一个参数为构造函数
    obj.__proto__ = Constructor.prototype;
    var result = Constructor.apply(obj, arguments);
    return typeof result === 'object' ? result : obj;
}``
### 2.实现bind

### 3.实现apply
### 4.实现call
`` Function.prototype.call_call = function(context){
    context = context ? Object(context) : window
    context.fn = this
    let args = [...arguments].slice(1)
    let r = context.fn(args)
    delete context.fn
    return r
} ``
### 5.实现instanceof
### 6.实现promise
### 7.手写深拷贝
### 8.手写浅拷贝
### 9.手写jsonp
### 10.手写继承
### 11.手写节流
### 12.手写防抖
### 13.手写函数柯里化
### 14.手写函数compose
### 15.手写链式调用
### 16.手写eventEmitter
### 17.数组拍平
### 18.数组乱序