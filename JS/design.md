# 目录
* [第一章](#第一章)
* [第二章](#第二章)
* [第三章](#第三章)
* [第四章](#第四章)
* [第五章](#第五章)

### 第一章
1. !!可以把字符串或者数字转化为bool类型
2. js是基于词法作用域，函数运行在定义的作用域而不是调用的作用域
3. 匿名函数用来做闭包，原理是因为js有函数作用域和词法作用域，可以用闭包创建类的私有变量
4. 对象的易变性：js所有对象都是易变的，js类实例化之后添加方法，实例化的对象也可以获得这个方法，也可以给实例单独加方法，其他实例无法获取（对定义好的类进行修改，对实例化的对象进行拓展）
5. 内省（反射）：运行时检测对象的属性和方法，使用这种信息动态实例化类和执行其方法
6. 设计模式优点：可维护性，沟通和性能。缺点：复杂性和性能

### 第二章
1. 接口的好处：
    * 自我描述性，促进代码的重用
    * 稳定不同的类之间的通信方式
    * 方便测设和调试，类型不匹配很难跟踪，有接口会有明确的报错信息
    * 使代码更加稳固，对接口的任何改变在实现类中必须体现
2. 接口的坏处：
    * js是弱类型，降低了语言的灵活性
    * js没有内置接口，polyfill会对性能有影响
    * 其他程序员可能不遵守你的polyfill接口
3. js接口模拟实现方法·
    * 注释法
    * 属性检查模仿接口，类显示声明自己支持什么接口，把自己实现的接口放到一个数组属性里
    * 鸭式辩型模仿接口，用辅助函数检查对象是否具有与接口定义的方法同名的所以方法，没有就抛出异常。但不能检查参数

```javascript
var interface = function(name, methods){
    if(arguments.length != 2){
        throw new Error("Interface constructor called with" + arguments.length + "arguments, but expected exactly 2")
    }
    this.name = name
    this.methods = []
    for(var i = 0, len = methods.length; i < len; i++){
        if(typeof methods[i] !== 'string'){
            throw new Error("Interface constructor expected method names to be" + "passed in as a string")
        }
        this.methods.push(methods[i])
    }
}

Interface.ensureImplements = function(object){
    if(arguments.length < 2){
        throw new Error("can not")
    }
    for(var i = 0, len = arguments.length; i < len; i++){
        var interface = arguments[i]
        if(interface.constructor !== Interface){
            throw new Error("can not")
        }
        for(var j = 0, methodsLen = interface.methods.length; j < methodsLen; j++){
            var method = interface.methods[j]
            if(!object[method] || typeof object[method] !== 'function'){
                throw new Error("can not")
            }
        }
    }
}

```