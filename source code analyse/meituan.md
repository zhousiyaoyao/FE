1. css postion属性和区别
relative，正常文档流，基于自身，margin左上侧偏移，top，left优先级最高
absolute，绝对定位，脱离文档流，当父级没设position，根据浏览器窗口定位
fixed，绝对定位，脱离文档流，根据浏览器窗口定位，出现滚动条，对象也不会随之滚动
static, 默认，不设position上下左右失效，作用回归文档流
sticky，css3新增，position:relative和position:fixed的合体，必须指定top、bottom、left、right4个值之一，到了top这个值，开始贴在顶部
相对于离它最近的具有滚动框的祖先元素，如果没有，当对于viewport
inherit，继承父的position
当改成绝对定位：往z轴方向移了一层，元素变成块状元素，如果原来就是块状元素，元素的宽度就由100%变成auto
2. css可继承属性
减少css代码，便于维护，一般不影响布局的属性，不会回流的属性，比如字体属性，文本属性，颜色，visibility
3. px、em、rem的区别
px过于精确，不适合响应式
em相对于父级，1em = 16px
rem相对于根目录字号大小
4. vw、vh的用法
1vw等于视口宽度的1%
1vh等于视口高度的1%
vw搭配rem:给根元素大小设置vw–动态改变大小。限制根元素font-size的最大最小值，配合bosy加上最大最小宽度。
5. font-size ，line-height
子无法改变，全面的继承父类
6. css作用域（选择器）权重（id>class>标签>通配符）怎么计算
!important >内联 0> ID 0> class,属性,伪类选择器 0> 元素和伪元素0, 按位统计。权重相同覆盖
7. 原型链继承、构造函数继承、组合继承、寄生继承、组合寄生继承
原型链继承，引用类型的属性被所有实例共享，且创建child不能向父类传参。child.prototype = new parent()；child.prototype.constructor = child
构造继承，引用类型的属性不会被所有实例共享，可以传参数。parent.call(this)；
组合继承, 面面俱到，创建实例时，原型中有一份相同的属性，实例的属性覆盖了原型的属性，因为parent构造函数调用了2次，浪费内存。上述两者组合
child.prototype = new parent()；child.prototype.constructor = child；parent.call(this)；
（寄生式继承的思路是创建一个用于封装继承过程的函数，通过传入一个对象，然后复制一个对象的副本，然后对象进行扩展，最后返回这个对象。这个扩展的过程就可以理解是一种继承。这种继承的优点就是对一个简单对象实现继承，如果这个对象不是我们的自定义类型时。缺点是没有办法实现函数的复用）
寄生组合继承, 使用超类的原型副本作为子类的原型。Person.call(this, name);
Student.prototype = Object.create(Person.prototype);Student.prototype.constructor = Student;
B.prototype = Object.create(A.prototype, {
  constructor: { value: B, writable: true, configurable: true }
});（完整版本）
Object.create(Person.prototype) === function func(){}; func.prototype = Person.prototype; return new func() 
ES6继承，extends，