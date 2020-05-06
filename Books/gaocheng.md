# 目录
* [第一章](#第一章)
* [第二章](#第二章)
* [第三章](#第三章)
* [第四章](#第四章)
* [第五章](#第五章)


## 第一章
1. javascript = ECMAScript（核心，web/nodejs/adobe flash） + DOM + BOM（浏览器对象模型）
2. DOM：文档对象模型，针对XML但经过扩展用于HTML的API，把整个页面映射为一个多层节点结构，可以用DOM提供的API对内容和结构进行操作，出现原因是控制网景和微软，否则会出现两强割据
* DOM0级，参照点，指最初支持的DHTML，无需重新加载页面就可以改变其外观和内容
* DOM1级，DOM Core（如何映射基于XML的文档结构） + DOM HTML（增添HTML的方法和对象）
* DOM2级，添加视图接口，事件接口，css接口，遍历和操作文档树的接口
* DOM3级，引入统一加载和保存文档的方法，验证文档的方法，支持XML1.0，XPath，XML base等

## 第二章
1. 外部文件比内嵌文件强在：可维护性，可缓存性，
2. 内嵌js，不能出现</script>字符串，可以写出<\/script>
3. </script>的src属性可以包含来自外域的js文件，但有争议，容易出现安全问题
4. 加了src属性，会忽略嵌入的js代码
5. 把js的引入放在header中，加载解析执行完js才会加载body内容，会导致首屏加载延迟，所以一般把js放在body的最后
6. defer，表示脚本可以延迟到文档完全被解析和显示之后再执行，只对外部脚本有效，早期版本对内嵌也有效。按照H5的规范，应该按照顺序执行且先于DOMContentLoaded，但现实不然。加defer可以把js在在header中，延迟执行，但两个延迟脚本不一定会按照顺序执行且defer存在浏览器兼容问题，还是推荐把js放在body最后。
7. async，表示立即下载脚本，但不妨碍页面的其他操作，但脚本执行还是会妨碍，只对外部脚本有效。不能保证先后顺序执行，所以不应该相互依赖。建议异步脚本不要在加载期间修改dom。异步脚本一定会在页面load事件之前执行，但在DOMContentLoaded之前之后无法确定。
8. 文档模式：混杂模式（默认，包含非标准特性），标准模式（严格型）和准标准模式（transitional和frameset，与标准模式几乎一样），混杂和标准的区别在于js的解析执行和css内容呈现。默认混杂，但不推荐，因为在不同浏览器下行为差异很大
9. noscript元素，在不支持js的浏览器显示替代的内容
10. 不加async和defer的情况下，js文件执行都是按照页面中出现的先后顺序

## 第三章
1. 0.1+0.2 = 0.300000004是使用IEEE754数值的浮点计算通病，python也会有，因为浮点数值的最高精度是17位小数
2. -Infinity - Number.MIN_VALUE - Number.MAX_VALUE - Infinity  isFinite()返回true或false
3. 除0返回nan
4. 任何nan的操作都返回nan，nan不等于任何值，包括自己。isnan()判断是不是nan
5. Number(), parseInt(), parseFloat()数值转换
6. null和undefined没有toString()，所以用string(), 遇到非null或者undefined会调用toString()，否则旧直接打印null或者undefined
7. Object每个实例都有Constructor，hasOwnProperty，isPrototypeof，propertyIsEnumerable，toLocalString，toString和valueof
8. 负数以二进制补码的形式存储，就是正数的反码加1
9. 位操作时，把64位的值转换为32位，执行位操作，再转换回去。所以有负效应，nan和infinity会当成0来处理
10. 按位非 ～ 返回反码 / 按位与 & 按位进行and操作 / 按位或 ｜ 按位进行or操作 / 按位异或 ^ 只有一个1才返回1，其他都是0
11. 左移 << 所有位向左移动，右侧0填充，不会影响符号数
12. 有符号右移 >>  所有位向右移动，左侧符号位的值填充
13. 无符号右移 >>> 用0填充空位，正数结果同上，负数值会变得很大，因为负数用补码存的
14. 两个！！相当于使用Boolean()
15. js没有函数签名，也没有函数重载，接口，类型检查，命名参数可以不写，用arguments数组来获取，参数类型，顺序，数量，位置，js统统不管

### 第四章
1. 基本类型的值变量复制会独立（因为直接存的值），引用类型值复制不独立（修改一个，另一个也变，因为修改的是地址）
2. ES所有函数参数都是按值传递的，输入传入基本类型，是独立的
3. 如果传入引用类型，还是按值传递，但因为是引用类型，还是会按引用访问同一个对象，这个指向的对象是全局对象
4. 可以在ES函数内重写obj，再修改属性来验证，函数在内部修改了参数的值，但是原始的引用依然不会变，这个新的obj是一个局部对象，会被销毁
5. typeof null为object，typeof function为function
6. 执行环境定义了变量或函数有权访问的其他数据，决定了他们各自的行为
7. 每个执行环境都有一个变量对象，保存环境中定义的所有变量和函数
8. 每个函数都自己的执行环境，当执行流进入一个函数时，函数的执行环境就会推入到环境栈，函数执行结束，栈将执行环境弹出，把控制权还回去
9. 当代码在一个环境中执行（当进入一个新执行环境），会创建变量对象的一个作用域链，用途是保证对执行环境有权访问的所有变量和函数的有序访问（搜索变量和函数）
10. 作用域链的前端，都是当前执行代码所在环境的变量对象，尾端都是全局执行环境的变量对象，标志符解析从前端到后一级一级回溯查找
11. 如果环境是函数，将其活动对象作为变量对象，活动对象一开始只包括arguments对象
12. var声明变量会添加到最接近的环境，不加var会添加到全局环境。
13. try-catch和with可以延长作用域链，在前端添加一个变量对象
14. 标记清除：用列表或者反转特殊位来记录变量是否进出环境。首先给所有变量加上标记，然后去掉环境中的变量以及被其引用的变量的标记，剩下的还有标记的变量就删除。2008年之前，都是这个机制。离开作用域的值会被标记回收
15. 引用计数：跟踪引用次数，引用次数为0删除，无法解决循环引用问题，循环引用无法收回，背景知识以前IE一部分对象是C++实现，用的引用计数，和js的互相冲突，创建了循环引用
16. 垃圾回收的周期：IE7触发垃圾收集的变量分配，字面量和数组元素的临界值被调整为动态修正，IE window.CollectGarbage()可以立刻回收
17. js管理内存的原因：分配给web浏览器的可用内存数量比桌面应用程序少，目的是防止js的网页耗尽全部系统内存而系统崩溃
18. 因此确保占用最少的内存可以让页面性能更好，优化内存的最佳方法就是执行中的代码只保存必要的数据
19. 解除引用：一旦数据不再有用，值设为null来释放。局部变量会离开执行环境时自动解除，但全局需要手动，解除引用不代表回收，代表脱离执行环境，以便下次回收。可以用来解决循环引用和全局对象
20. 基本类型因为占据固定大小的空间，所以存放在栈
21. 局部环境变量可以访问全局，但全局不能访问局部

### 第五章
1. 推荐使用点号访问对象属性，方括号用于变量的情况，或者属性名包含导致语法错误的字符，比如空格
2. 数组5个undefined，取length也是5
3. instanceof判断数组，会假定单一的全局执行环境，如果网页包含多个框架，存在不同版本的array构造函数，isArray()可以解决，可以最终确定某个值到底是不是数组，而不管是在哪个环境
4. sort，返回-1表示第一个参数在第二个之前，1表示第一个参数在第二个之后，参数相等返回0。所以升序第一个值减第二个，降序相反
5. every，some，foreach，map，some接受的参数为item，index，array
6. reduce和reduceright接受的参数为前一个值，当前值，index，array，这个函数返回的任何值都会当成第一个参数传给下一项
7. 正则表达式g表示全局，i表示不区分大小写，m表示多行
8. 正则表达式可以字面量创建，也可以RegExp构造函数创建，推荐后者，因为如果在for循环中，字面量只有一个RegExp实例，第二次循环会从上次找到的索引开始、
9. RegExp实例方法
    * exec，接受一个字符串，返回匹配好的数组，这个数组包含额外的两个属性，一个是index一个是input没匹配到返回null。
    * 正则表达式有lastIndex属性，表示匹配的当前字符最后一个字母的索引，全局模式，每次exec会走到下一个匹配项，非全局不会
    * test，正则表达式.test(字符串)，返回布尔类型
    * RegExp有一些静态属性，比如input，leftcontext，rightcontext，lastmatch等
10. js没有重载，函数重复定义会覆盖，直接覆盖，不管参数对得上对不上，对不上的话只取函数要求的那几个参数，不会报错
11. 函数声明和函数表达式的唯一区别在于，函数会函数声明提升，函数表达式不会提升，变量也会声明提升且优先级小于函数提升
12. 函数提升可以直接调用，变量是undefined
13. 传递函数的指针不用加()，执行函数才加()
14. callee是arguments的属性，指向这个函数，可以消除函数的执行与函数名的耦合。arguments.callee === 这个函数
15. this是函数内部的特殊对象，引用的是函数执行的环境对象
16. 函数的名字仅仅是一个包含指针的变量，即使在不同环境中执行，指向的函数还是同一个
17. es5加了一个函数属性caller，保存着调用当前函数的函数的引用，全局就返回null
18. 函数的length属性表示函数希望接受的参数个数
19. apply和call是函数的非继承方法，apply第一个参数为运行函数的作用域，第二个参数为数组或者类数组，call和apply的区别在于，其余参数直接传递给函数，逐个列举。
20. bind会创建函数的实例，this值会绑定到传给bind()函数的值
21. slice, substr 和 substring
* slice和substring是从头到尾，substr是从头到多少个数
* 当传入负数，slice会把传入的负值加上字符串长度，substr第一个参数加上字符串长度，第二个参数转化为0，substring所有负参数都转化为0
* 注意substring会把两个参数较小的一个放在前面，大的放在后面，比如substring(3,-3)会变成substring(0,3)
22. indexof和lastIndexOf可以用在数组或者字符串
22. 