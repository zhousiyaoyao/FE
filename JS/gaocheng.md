# 目录
* [第一章](#第一章)
* [第二章](#第二章)
* [第三章](#第三章)


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


