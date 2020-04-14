
var quicksort = function(start, end, nums){
    debugger
    var length = nums.length
    if(!Array.isArray(nums) || start >= end || length <= 1){
        return
    }
    var index = partition(start, end, nums)
    quicksort(start, index-1, nums)
    quicksort(index+1, end, nums)
}
var partition = function(left, right, nums){
    debugger
    var pivot = nums[left]
    while(left < right){
        while(nums[right] > pivot && left < right){
            right--
        }
        nums[left] = nums[right]
        while(nums[left] < pivot && left < right){
            left++
        }
        nums[right] = nums[left]
    }
    nums[left] = pivot
    return left
}
console.log(quicksort(0, 5, [3,2,1,5,6,4]))
