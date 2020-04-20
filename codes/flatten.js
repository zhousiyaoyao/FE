// 1
var a = [1,[1,2],[1,[1,3],3]]
var b = a.toString().split(',').map((value => parseInt(value)))

// 2
const flatten = (arr) => {
    if(!Array.isArray(arr)){
        return
    }
    var res = []
    res = arr.reduce((pre,cur) => {
        return pre.concat(cur instanceof Array ? flatten(cur) : cur)
    },[])
    return res
  }
var b = flatt(a)
console.log(b)