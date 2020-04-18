// // let res = new Map()
// // function deepCopyDFS(obj) {
// //     if (res.has(obj)){
// //         return res[obj]
// //     }
// //     if(obj === null){
// //         return null
// //     }
// //     if(obj === undefined){
// //         return undefined
// //     }
// //     var newObj = Array.isArray(obj) ? [] : {}
// //     for(let i in obj){
// //         if(i in obj){
// //             if(typeof obj[i] === 'object'){
// //                 res.set(i,deepCopyDFS(obj[i]))
// //                 newObj[i] = res.get(i)
// //             }else{
// //                 res.set(i,obj[i])
// //                 newObj[i] = res.get(i)
// //             }
// //         }
// //     }
// //     return newObj
// // }

// // let test = {
// //     a1: 1,
// //     b1: null,
// //     c1: undefined,
// //     d1: {
// //         a2: "hello",
// //         b2: [1, 2, 3],
// //         c3: true
// //     },
// //     e1: [1, 2, 3],
// //     f1: test
// // };
// // let dcopy = deepCopyDFS(test);
// // console.log(test)
// // console.log(dcopy)
// // console.log(res)

// // function longestPalindrome( s ) {
// //     // write code here
// //     if(s.length === 0){
// //         return ""
// //     }
// //     if(s.length === 1){
// // //         return s
// // //     }
// // //     var res = ''
// // //     for(var i = 0; i < s.length-1; i++){
// // //         var cur = helper(s, i, i)
// // //         if(cur.length > res.length){
// // //             res = cur
// // //         }
// // //         var cur2 = helper(s, i, i+1)
// // //         if(cur2.length > res.length){
// // //             res = cur2
// // //         }
// // //     }
// // //     return res
// // // }
// // // function helper(s, start, end){
// // //     let length = s.length
// // //     debugger
// // //     while(start >= 0 && end <= length && s[start] === s[end]){
// // //         start--
// // //         end++
// // //     }
// // //     return s.slice(start+1,end)
// // // }

// // // // console.log(longestPalindrome("aabab"))
// var deepCopyDFS = function() {
//     let res = new Map()
//     return function(obj){
//         if(res.has(obj)){
//             return obj
//         }
//         res.set(obj,obj)
//         if(obj === null){
//             return null
//         }
//         var newObj = Array.isArray(obj) ? [] : {}
//         for(let i in obj){
//             if(i in obj){
//                 if(typeof obj[i] === 'object'){
//                     newObj[i] = deepCopyDFS(obj[i])
//                 }else{
//                     newObj[i] = obj[i]
//                 }
//             }
//         }
//         return newObj
//     }
// }()

// // let test = {
// //     a1: 1,
// //     b1: null,
// //     c1: undefined,
// //     d1: {
// //         a2: "hello",
// //         b2: [1, 2, 3],
// //         c3: true
// //     },
// //     e1: [1, 2, 3],
// // };
// // // console.log(test.d1)
// // // test.f1 = test
// // console.log(deepCopyDFS(test))

// // // parseInt

// // // queue: []

// // function add(a ,b){
// //    //取两个数字的最大长度
// //    let maxLength = Math.max(a.length, b.length);
// //    //用0去补齐长度
// //    a = a.padStart(maxLength , 0);//"0009007199254740991"
// //    b = b.padStart(maxLength , 0);//"1234567899999999999"
// //    let t = 0
// //    let f = 0
// //    let sum = ''
// //    for(var i = maxLength - 1; i >= 0; i--){
// //        t = parseInt(a[i]) + parseInt(b[i]) + f;
// //        f = Math.floor(t/10);
// //        sum = t%10 + sum
// //    }
// //    if(f == 1){
// //     sum = "1" + sum;
// //    }
// //    return sum
// // }

// // let a = "9007199254740991";
// // let b = "1234567899999999999";
// // console.log(add(a,b))

// function BFSDeepClone(obj) {
//     if(obj === null){
//         return null
//     }
//     let newObj = {}
//     const queue = [obj]
//     const temp = [newObj]
//     const vistied = new Set([obj])
//     while (queue.length) {
//       const a = queue.shift()
//       const copyObj = temp.shift()
//       Object.keys(a).forEach(key => {
//         const item = a[key]
//         if (typeof item === 'Object') {
//           if (vistied.has(item)) {
//             copyObj[key] = item
//           } else {
//             vistied.add(item)
//             copyObj[key] = typeof item === 'Object' ? {} : []
//             queue.push(item)
//             temp.push(copyObj[key])
//           }
//         } else {
//           copyObj[key] = item
//         }
//       })
//     }
//     return newObj
//   }

// let test = {
//     a1: 1,
//     b1: null,
//     c1: undefined,
//     d1: {
//         a2: "hello",
//         b2: [1, 2, 3],
//         c3: true
//     },
//     e1: [1, 2, 3],
// };
// test.f1 = test
// console.log(BFSDeepClone(test))
// console.log(BFSDeepClone(test))

// function parent(){
//     this.name = name
// }
// parent.prototype.getName = function(){
//     console.log("parent")
// }
// function son(){

// }
// son.prototype.getName = function(){
//     console.log("son")
// }
// son.prototype = new parent()
// son.prototype.constructor = son
// let s = new son()
// s.getName()
// son.getName()

//abbreviate('abce- fffff--    eeeee') => "a2e- f3f--    e3e"
//abbreviate('abc') => abc
//abbreviate('elephant') => e6t
//abbreviate('ride') => r2e
//abbreviate('elephant-ride') => e6t-r2e

/*
Libs included:
    underscore lodash chai sinon sinon-chai mocha async request q bluebird jsdom
*/


//call & apply
/*
var a = [1,2,3]
function foo() {
  
}
//foo(1,2,3) => 1,2,3
//foo(1,2,3,4) => 1,2,3,4

//call(null, 1,2,3,4)
//apply(null, [1,2,3,4])

function foo2() {
    var agrs = [...arguments].slice(0)  // [1,2,3,4]
    
    foo.apply(this, args)
    
}


foo2(1,2,3)
foo2(1,2,3,4)

//arrow function vs normal function
1. 没有this
2. 构造函数
3. arguments
4. var a = (b,c) => b+c
5. var a = b => b
6. propotype

Function -> Object
foreach
map
reduce
function a(){
    var res = "sa"
    作用域this
    var b = (c,d) =>{
        作用域this，
    }
}


//event bubble & capture

target => parent => root    bubble
root => parent => target

addeventListener(,
                
DOM2
root => target capture
target 按顺序执行 
target => root  bubble

//event.currentTarget & event.target
 <ul id test>   1  event
 <li>123</li>
<li>456</li>                 
<ul>

var ul = document.query("test")

//ul->li-> console.log(li)
ul.addEventListener("click", (event) => {
    console.log(event)
    console.log(event.target)
    event.currentTarget
})


duplicate([1,2,3,4,5]); // [1,2,3,4,5,1,2,3,4,5]
duplicate([3,2]); // [3,2,3,2]
duplicate([3,2,2]); // [3,2,2,3,2,2]

//array function

pop
push
shift
unshift
sort
concat
slice
splice
foreach
reduce
map
some
filter
every


var new_arr = JSON.parse(JSON.Stingify(arr))
arr.concat(new_arr)
return arr


function duplicate(arr) {
    var dic = {}
    for(var i = 0; i < arr.length; i++){
        if(arr[i] in dic){
            dic[arr[i]] += 1
        }else{
            dic[arr[i]] = 1
        }
    }
    for(let i in Object.keys(dic)){
        console.log(i)
    }
}

*/
/*
Word a10n (abbreviation)
The word i18n is a common abbreviation of internationalization the developer community use instead of typing the whole word and trying to spell it correctly. Similarly, a11y is an abbreviation of accessibility.
Write a function that takes a string and turns any and all words within that string of length 4 or greater into an abbreviation following the same rules.
Notes:
* A "word" is a sequence of alphabetical characters. By this definition, any other character like a space or hyphen (eg. "elephant-ride") will split up a series of letters into two words (eg. "elephant" and "ride").
* The abbreviated version of the word should have the first letter, then the number of removed characters, then the last letter (eg. "e6t-r2e").
Solution 
*/

//abbreviate('abce- fffff--    eeeee') => "a2e- f3f--    e3e"
//abbreviate('abc') => abc
//abbreviate('elephant') => e6t
//abbreviate('ride') => r2e
//abbreviate('elephant-ride') => e6t-r2e

function abbreviate(string) {
    if(string.length <=3){
        return string
    }
    var res = []
    var j = 0
    var i = 0
    while(i < string.length){
        if(string[i] === " " || string[i] === "-"){
            if(j !== i){
               continue
            }
            j = i
            res.push(string.slice(j,i))
        }
        i++
    }
    return res
}

abbreviate('abce- fffff--    eeeee')

/css 
//position

1. static, 文档流，default
2. absolute , 有postion属性的父元素
3. fixed， top
4. relative 
5. inherit 
6. sticky

//position: absolute


//align center


1. absolute
父relative
子，宽高, 上下左右都0，auto

父relative
子，宽高，absolute, left: 50%, top: 50%, margin-left: -宽度/2  ； margin-top: -高度/2
子，absolute, left: 50%, top: 50%, transform: translate(-50%,-50%)

flex
父: display: flex
align-item: center
justify-content: center


inline








//http status code


101 正在连接
200 请求成功
200 from cache
304 协商缓存
301 重定向
400 bad request
404 not found
405 跨域
500 后台出问题


强缓存：expires 1.0 绝对，cache-control 1.1 max-ageage,相对时间。200
协商缓存：etag, if-modified-since, Etag:content. 304
hash


//XSS & CSRF

XSS：
1. 反射型，html输入，input， 输入参数，注入js <script>aler(100)<script> eval('stinr')
输入的转义，< -> {. 黑白名单，
2. 存储型， 数据库，论坛，评论，
输入content

CSRF DBS, 获取我的cookie，对我开着DBS，发请求，带着我的cookie，-1000，-1000
samesite, cookie, 严格：非严格：get
httponly. js 对cookie
同源 域名，端口，协议
//dbs.com
//eval: get dbs.com/dbs/pay/transform?amount=1000&to=tom
token，
  axios，请求拦截器加个token，token的值是后端生成，用户登陆之后，生成sessionid
  每次发送带这个token。










