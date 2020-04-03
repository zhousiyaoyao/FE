// var obj = {
//     name: {
//        firstName: ['wo','ai','ni'],
//        lastName: '湖湾'
//     },
//     job: undefined
//  }
// var a = [1,[1,2],[1,[1,3],3]]
// console.log(a.toString())
// console.log(a.toString().split(','))
// var b = a.toString().split(',').map((value => parseInt(value)))
// console.log(b)

// var b = JSON.parse(JSON.stringify(obj))
// console.log(b)

// function flatt(a){
//     if(!Array.isArray(a)){
//         return
//     }
//     let result = []
//     result = a.reduce((pre,cur) =>{
//         return pre.concat(Array.isArray(cur) ? flatt(cur):cur)
//     },[])
//     return result
// }
// var b = flatt(a)
// console.log(b)
// function deepcopy(obj){
//     if(typeof obj !== 'object'){
//         return;
// //     }
// //     let newObj = obj instanceof Array ? [] : {}
// //     for(var key in obj){
// //         newObj[key] = typeof obj[key] === 'object' ? deepcopy(obj[key]) : obj[key]
// //     }
// //     return newObj
// // }
// function deepClone(obj) {
//     var _toString = Object.prototype.toString;
//     // null, undefined, non-object, function
//     if (!obj || typeof obj !== 'object') {
//         return obj;
//         console.log("null, undefined, non-object, function");
//     }

//     // DOM Node
//     if (obj.nodeType && 'cloneNode' in obj) {
//         return obj.cloneNode(true);
//         console.log("DOM Node");
//     }

//     // Date
//     if (_toString.call(obj) === '[object Date]') {
//         return new Date(obj.getTime());
//         console.log("Date");
//     }

//     // RegExp
//     if (_toString.call(obj) === '[object RegExp]') {
//         var flags = [];
//         if (obj.global) { flags.push('g'); }
//         if (obj.multiline) { flags.push('m'); }
//         if (obj.ignoreCase) { flags.push('i'); }
//         // console.log("RegExp");
//         return new RegExp(obj.source, flags.join(''));

//     }
//     var result = Array.isArray(obj) ? [] : {};
//     // console.log(result);

//     for (var key in obj) {
//         result[key] = deepClone(obj[key]);

//     }

//     return result;
// }


// var b = deepClone(obj)
// console.log(b)
var obj = {
    name:{
        a:'1',
        b:'2'
    },
    age: '18'
}

function deepcopy(obj){
    if(typeof obj !== 'object'){
        return;
    }
    let newObj = obj instanceof Array ? [] : {}
    for(var key in obj){
        newObj[key] = typeof obj[key] === 'object' ? deepcopy(obj[key]) : obj[key]
    }
    return newObj
}
c = deepcopy(obj)
console.log(c)