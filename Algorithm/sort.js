// 快排
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

// 冒泡排序 稳定，n平方
function bubblesort(a){
    if(!Array.isArray(a) || a.length <= 1){
        return
    }
    let index = a.length - 1
    while(index > 0){
        let flag = true
        k = index
        for(let j = 0; j < k; j++){
            if(a[j] > a[j+1]){
                flag = false
                index = j
                swap(a,j,j+1)
                // [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
            }
        }
        if(flag){
            break
        }
    }
    return a
}

// 选择排序 不稳定，n平方
function selectsort(a){
    let length = a.length
    if(!Array.isArray(a) || a.length <= 1){
        return
    }
    for(let i = 0; i < length-1; i++){
        let index = 1
        for(let j = i + 1; j < length; j++){
            if(a[index]>a[j]){
                index = j
            }
        }
        swap(a,i,index)
    }
    return a
}

function swap(array, left, right){
    var tmp = array[left]
    array[left] = array[right]
    array[right] = array[left]
}

// 插入排序，稳定，n平方
function insertsort(a){
    let length = a.length
    if(!Array.isArray(a) || a.length<=1){
        return
    }
    for(let i =1; i < length; i++){
        let tmp = a[i]
        let j = i
        while(j - 1>=0 && a[j-1] > tmp){
            a[j] = a[j-1]
            j--
        }
        a[j] = tmp
    }
    return a
}

// 希尔排序，nlogn，不稳定