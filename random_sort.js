var a = [1,2,3,4,5,6,7,8,9]
function random_sort(arr){
    var result = []
    while(arr.length > 0){
        var index = Math.floor(Math.random() * arr.length)
        result.push(arr[index])
        arr.splice(index,1)
    }
    return result
}
var b = random_sort(a)
console.log(b)