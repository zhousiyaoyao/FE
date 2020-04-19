function quickSort(array, start, end) {

    let length = array.length;
  
    // 如果不是数组或者数组长度小于等于1，直接返回，不需要排序 
    if (!Array.isArray(array) || length <= 1 || start >= end) return;
  
    let index = partition(array, start, end); // 将数组划分为两部分，并返回右部分的第一个元素的索引值
  
    quickSort(array, start, index - 1); // 递归排序左半部分
    quickSort(array, index + 1, end); // 递归排序右半部分
}
  
const partition = (arr, start, end) =>{
    var pivot = arr[start]
    while(start < end){
        while(arr[end] >= pivot && start < end){
            end--
        }
        arr[start] = arr[end]
        while(arr[start] < pivot && start < end){
            start++
        }
        arr[end] = arr[start]
    }
    arr[start] = pivot
    return start
}

const arr = [3, 1, 3, 6, 2, 3, 4, 5]
quickSort(arr, 0, 7)
console.log(arr)


// 三路快排
const partition3way = (arr) =>{
    var start = 0
    var end = arr.length - 1
    var  i = 0 
    var pivot = arr[0]
    var swap = (a, i, j) => [a[i],a[j]] = [a[j],a[i]]
    while(i <= end){
        if(arr[i] < pivot){
            swap(arr, start++, i++)
        }
        else if(arr[i] > pivot){
            swap(arr, i, end--)
        }else{
            i++
        }
    }
}
const arr = [3, 1, 3, 6, 2, 3, 4, 5]
partition3way(arr)
console.log(arr)

var sortColors = function(nums) {
    var start = 0
    var end = nums.length - 1
    var i = 0
    var swap = (a, i ,j) => [a[i], a[j]] = [a[j], a[i]]
    var pivot = 1
    while(i <= end){
        if(nums[i] < pivot){
            swap(nums, i++, start++)
        }else if(nums[i] > pivot){
            swap(nums, i, end)
            end--
        }else{
            i++
        }
    }
};
var arr = [2,0,2,1,1,0]
sortColors(arr)
console.log(arr)