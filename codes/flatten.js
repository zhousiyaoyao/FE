// 1
var a = [1,[1,2],[1,[1,3],3]]
var b = a.toString().split(',').map((value => parseInt(value)))

// 2
function flatt(a){
    if(!Array.isArray(a)){
        return
    }
    let result = []
    result = a.reduce((pre,cur) =>{
        return pre.concat(Array.isArray(cur) ? flatt(cur):cur)
    },[])
    return result
}
var b = flatt(a)
console.log(b)