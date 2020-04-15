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


