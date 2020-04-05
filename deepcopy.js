
// var obj2 = {name: {name: 'sss'}}
function deepcopy2(obj){
    if(typeof obj !== 'object'){
        return
    }
    // console.log(obj)
    var newObj = Array.isArray(obj) ? [] : {}
    for(let key in obj){
        console.log(key)
        if(key in obj){
            console.log(newObj)
            if(obj[key] instanceof Object && obj[key] !== newObj){
                newObj[key] = deepcopy2(obj[key])
            }else{
                newObj[key] = obj[key]
            }
        }
    }
    return newObj
}

// var res2 = deepcopy2(obj2)
// console.log(res2)
// obj.hasOwnProttype(key)

var a = { b: null}
a.b = a

console.log(deepcopy2(a))