### 泛型generics
定义函数，接口或者类时，不预先指定具体的类型，而在使用的时候再指定类型

### 枚举enum
用于取值被限定在一定范围内的场景，比如请求状态
常数项：只有常数，点号调用得到的是索引
计算所得项：带等号，调用得到等号右边的值
普通枚举，计算所得项后面全部都得是计算所得项
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};
常数枚举，指的是enum前加const。编译阶段被删除，不能，不能带计算成员，调用会算出索引
const enum Color {Red, Green, Blue};
外部枚举，指的是enum前加declare。编译时检查，编译结果中被删除，调用不会算出索引。可以declare const，调用会算出索引

### 接口Interfaces
1. 对类的一部分行为进行抽象, 一个class可以implements多个接口
2. 接口与接口之间可以extends来继承,接口也可以extends类
3. 对对象的形状进行描述,属性不能多不能少,属性key后接个问号表示可选属性，可以不完全匹配
4. [propName : string]: any表示任意属性. 属性key前面空格，加个readonly表示只读，更改就报错
5. 对函数的形状进行定义, 写法同对象定义, Key为函数的参数，value为函数的返回值类型, 复杂的情况，函数有自己的属性和方法

```typescript
interface SearchFunc {
(source: string, subString: string): boolean;
}
let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
return source.search(subString) !== -1;
}

interface Counter {
(start: number): string;
interval: number;
reset(): void;
}
function getCounter(): Counter {
let counter = <Counter>function (start: number) { };
counter.interval = 123;
counter.reset = function () { };
return counter;
}
let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
```

### 类型注解
### 类
### 布尔，数字，字符串
### 数组，元组，枚举
### 空值void（只能赋予null或undefined），null，undefined，never
用let，使用的是词法作用域或块级作用域，但块之外不能访问，且不能在被声明之前读或写，虽然一直存在于作用域，但直到声明之前都属于暂时性死区，但是ty可以获取然而对于函数的情况下，也是不可以的。let不可以在一个作用域多次声明。