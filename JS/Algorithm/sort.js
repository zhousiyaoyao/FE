//冒泡排序 稳定，n平方
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

//选择排序 不稳定，n平方
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

//插入排序，稳定，n平方

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

//希尔排序，nlogn，不稳定


var arr = [4,3,7,9,5,7,1,3]
var b = selectsort(arr)
console.log(b)