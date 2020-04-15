// var quicksort = function(start, end, nums){
//     debugger
//     var length = nums.length
//     if(!Array.isArray(nums) || start >= end || length <= 1){
//         return
//     }
//     var index = partition(start, end, nums)
//     quicksort(start, index-1, nums)
//     quicksort(index+1, end, nums)
// }
// var partition = function(left, right, nums){
//     debugger
//     var pivot = nums[left]
//     while(left < right){
//         while(nums[right] > pivot && left < right){
//             right--
//         }
//         nums[left] = nums[right]
//         while(nums[left] < pivot && left < right){
//             left++
//         }
//         nums[right] = nums[left]
//     }
//     nums[left] = pivot
//     return left
// }
// console.log(quicksort(0, 5, [3,2,1,5,6,4]))


// function sum (n) {
//     let sum = 0
//     for (let i = 1; i < n; i++) {
//         sum += i
//     }
//     return sum
// }

// function cach(fn){
//     let map = new Map()
//     return function(){
//         let n = [...arguments].slice(0,1)
//         if(!map.has(n)){
//             let res = fn(n)
//             map.set(n, res)
//             return res
//         }
//         return map.get(n)
//     }
// }
// var cache = cach(sum)
// console.log(cache(5))
// console.log(cache(5))
// console.log(cache(6))

var fib = function(){
    let map = new Map()
    return function(n){
        if(!map.has(n)){
            let res = fib(n-1) + fib(n-2)
            map.set(n, res)
            return res
        }
        return map.get(n)
    }
}()

var s = fib()
console.log(s[5])