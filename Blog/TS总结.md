---
title: TS总结（一）
type: categories
copyright: true
date: 2020-05-27 15:58:59
tags: TypeScript
categories: TypeScript
---

### 前言
codereview被ts搞得非常痛苦，需要好好学习一个

TS是静态类型化的js超集，静态性使其牛逼
语言在编译时报错是静态语言，运行时报错时动态语言
TS是静态弱类型语言，不是强类型，因为要兼容js，不限制js的隐式类型转换

使用TS的优点：
* 可以避免低级错误，在编写时就能发现
* 减少多人合作的成本，适合大项目
* 良好的代码提示

### 类型
TS的原始类型：
1. boolean
2. number
3. string
4. null
5. undefined
6. symbol
7. void
8. bigint
**与js类型的区别**，多了void和bigint，且都是小写开头

TS的其他常见类型：
1. any：不到万不得已，不要用，和js没有多少区别
2. unknown：any的安全类型，unknown类型值操作之前，要进行检查，而any不用。虽然可以是任何类型，但unknown不能被进行任何操作比如对象取值等等。可以用来缩小类型范围
3. never：永不存在的值的类型，任何类型的子类型，可以赋值给任何类型，但没有类型可以赋值给never（除了自己），也没有never的子类型。用于定义永远是空的数组，永远不会有返回值的函数，比如抛出异常。
4. 数组：范型定义（const list: Array<number> = [1,2,3])，元素类型加[]，(const list: number[] = [1,2,3])
5. 元组：严格版数组，但是元素的类型可以不同，let x: [string, number] = ['hello', 12]，元组可以push添加元素，但不能访问
6. object：普通对象，数组，枚举，元组都是object类型
7. 枚举：声明一组命名的常数
* 数字枚举从0开始，依次加1，累加效应
* 字符串枚举可以用方括号取值（需要加双引号）也可以用点号取值
* 异构枚举，前两者混合，也可以但少见
* 正反向映射，可以用枚举名字取枚举值，也能用枚举值取枚举名字，原理是Direction[Direction["Up"] = 10] = "Up"，所以up或者10都能取到
* 常量枚举，Up = 'Up'，好处在于编译成js之后，直接省略了枚举，是性能提升的一个方案
* 字面量类型的情况，枚举的成员和枚举值可以当成类型使用

### 接口
interface只能用于定义对象类型
可选属性：后面加?，可能是undefined
只读属性：前面加readonly，修改会给出警告
可索引类型：可以用来表示{北京：1}
```javascript
interface Phone {
    [name: string]: string
}
interface User {
    name: string // 普通
    age?: number  // 可选属性
    readonly isMale: boolean //只读属性
    say: () => string // 函数属性
    phone: Phone // 
}
```
extends可以继承接口，在父接口的基础上，加上新的属性

### 类和函数
1. abstract抽象类，无法实例化，被继承
2. public都能访问，private只能类内访问，protected只能类内和子类访问
3. 类也可以作为接口
4. 函数可以重载

### 泛型
定义：在静态编写时不知道传入的参数到底是什么类型，只有在运行时传入参数才能确定，所以我们需要变量代表传入的类型，再返回这个变量，只用于表示类型而不表示值

### 类型断言
```javascript
interface Person {
    name: string;
    age: number
}
const person = {} as Person
```
双重断言，先断成any再断成自己想要的

### 类型守卫

```javascript
function a(arg: person | animal){
    if(arg instanceof person){
        xxx
    }
    if('age' in arg){
        xxx
    }
    if(arg.kind === 'foo'){
        xxx
    }
}
```

联合类型：中间用｜隔开，表示这些类型都可以

交叉类型：const result = <T & U>{}

类型别名：type some = boolean | string

### React实战
1. React.FC可以无需声明children属性的类型，会为props自动加上
2. input的onchange，e的类型为React.ChangeEvent<HTMLInputElement>，就可以用e.target.value了
3. 表单的submit，e的类型为React.FormEvent<HTMLFormElement>
4. 当我们在组件中输入事件对应的名称时，会有相关的定义提示，我们只要用这个提示中的类型就可以了

### 索引类型查询
keyof可以作用于泛型，来获取泛型所有的属性名构成联合属性
keyof可以取到索引类型的属性名，但还要获取属性值的类型，所以需要索引访问符，T[K]

```javascript
class Images {
    public src: string = 'https://www.google.com.hk/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
    public alt: string = '谷歌'
    public width: number = 500
}
type propsNames = keyof Images // src | alt | width
type propsType = Images[propsNames] // string | number

function pick<T, K extends keyof T>(o: T, names: K[]): T[K][] {
    return names.map(n => o[n]);
}

const res = pick(user, ['token', 'id', ])
```
pick的例子，需要一个泛型T表示传入参数o的类型，因为编写时无法确定o是什么类型，第二个参数names表示数组的成员必须由参数o的属性名称构成，所以用keyof代表o类型的属性名的联合类型，所以用K约束到keyof T。返回值T[K]取到对应属性值的类型，T[K][]表示返回值的类型

### 映射类型把接口成员都变成可选
1. 一个一个在成员前加?
2. 映射法

语法：[K in Keys]
K对应每个属性名的类型，Keys表示一组属性名的类型，所以[K in keyof T]表示属性的类型，T[K]表示属性值的类型
结果：type partial<T> = { [K in keyof T]?: T[K] }

Q：找到一个接口中value为function的key和value
```typescript
type FunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T]
```

Partial可以把外层的属性都变成可选。处理深层需要递归
-?把可选属性变成必选，-readonly把只读属性变成非只读
Required把传入的属性变成必选项
```javascript
type Partial<T> = { [P in keyof T]?: T[P] };

type DeepPartial<T> = {
    [U in keyof T]?: T[U] extends object
    ? DeepPartial<T[U]>
    : T[U]
};

type Required<T> = { [P in keyof T]-?: T[P] };
```

### 常见工具类型
* Pick
* Exclude
* Omit
* Compute
* Merge
* Intersection
* Overwrite
* Mutable
```typescript
type Exclude<T, U> = T extends U ? never : T;
type T = Exclude<1 | 2, 1 | 3> // -> 2  从T中排除出可分配给U的元素

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
type Foo = Omit<{name: string, age: number}, 'name'> // -> { age: number } Omit忽略T中的某些属性

type Compute<A extends any> = A extends Function ? A : { [K in keyof A]: A[K] } // compute将交叉类型合并

type Merge<O1 extends object, O2 extends object> = Compute<O1 & Omit<O2, keyof O1>> // merge将两个对象的属性合并

type Intersection<T extends object, U extends object> = 
Pick<T,Extract<keyof T, keyof U> & Extract<keyof U, keyof T>>;  // Intersection取交集

type Overwrite<
  T extends object,
  U extends object,
  I = Diff<T, U> & Intersection<U, T>
> = Pick<I, keyof I>; // 用U的属性覆盖T的相同属性

type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
} // 将T的所有属性的readonly移除
```

record允许从Union中创建新类型
```typescript
type Car = 'Audi' | 'BMW' | 'MercedesBenz'
type CarList = Record<Car, {age: number}>

const cars: CarList = {
    Audi: { age: 119 },
    BMW: { age: 113 },
    MercedesBenz: { age: 133 },
}
```

在tsx，如果<T>泛型被当成jsx标签，可以加上<T extends {}>

### TS的编译原理

编译器的组成：
1. Scanner扫描器
2. Parser解析器
3. Binder绑定器
4. Emitter发射器
5. Checker检查器

处理过程：
1. code + 扫描器 = token流 （词法分析）
2. token流 + 解析器 = AST抽象语法树 （语法分析）
3. AST + 绑定器 = Symbols符号 （语义分析）
4. AST + 符号 + 检查器 = 类型验证 （代码优化）
5. AST + 检查器 + 发射器 = JS代码 （目标代码生成）