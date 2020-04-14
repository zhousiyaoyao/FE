// 1 正常版
// while等于，区间全闭，搜索区间[left, right]，终止条件left = right + 1，[3,2]
// whie不等于，区间左闭右开，搜索区间[left, right),终止条件left = right，[2,2]

// 因为我们初始化 right = nums.length - 1
// 所以决定了我们的「搜索区间」是 [left, right]
// 所以决定了 while (left <= right)
// 同时也决定了 left = mid+1 和 right = mid-1
// 因为我们只需找到一个 target 的索引即可
// 所以当 nums[mid] == target 时可以立即返回
function search1(nums, target){
    var left = 0
    var right = nums.length - 1
    while(left <= right){
        var mid = left + Math.floor((right - left)/2)
        // var mid = Math.floor((left + right) / 2)
        if(nums[mid] === target){
            return mid
        }else if(nums[mid] < target){
            left = mid + 1
        }else if(nums[mid] > target){
            right = mid - 1
        }
    }
    return -1
}
// 2 左分界版
// 为什么right = mid，因为这里[left, right),所以分成两分[left, mid)和[mid+1, right)
// 找到target之后，right也要往左缩，锁定左边边界
// 返回left或right都行，因为终止条件left等于right

// 因为我们初始化 right = nums.length
// 所以决定了我们的「搜索区间」是 [left, right)
// 所以决定了 while (left < right)
// 同时也决定了 left = mid + 1 和 right = mid
// 因为我们需找到 target 的最左侧索引
// 所以当 nums[mid] == target 时不要立即返回
// 而要收紧右侧边界以锁定左侧边界

function search2(nums, target){
    var left = 0
    var right = nums.length
    while(left < right){
        var mid = left + Math.floor((right - left)/2)
        if(nums[mid] === target){
            right = mid
        }else if(nums[mid] < target){
            left = mid + 1
        }else if(nums[mid] > target){
            right = mid
        }
    }
    return left
}
// 3 右分界版
// 找到target之后，left也要往右缩，锁定右边边界
// 返回left-1，因为left更新一定是mid+1，nums[left]不一定等于target，但nums[left-1]可能是

// 因为我们初始化 right = nums.length
// 所以决定了我们的「搜索区间」是 [left, right)
// 所以决定了 while (left < right)
// 同时也决定了 left = mid + 1 和 right = mid
// 因为我们需找到 target 的最右侧索引
// 所以当 nums[mid] == target 时不要立即返回
// 而要收紧左侧边界以锁定右侧边界
// 又因为收紧左侧边界时必须 left = mid + 1
// 所以最后无论返回 left 还是 right，必须减一
function search3(nums, target){
    var left = 0
    var right = nums.length
    while(left < right){
        var mid = left + Math.floor((right - left)/2)
        if(nums[mid] === target){
            left = mid + 1
        }else if(nums[mid] < target){
            left = mid + 1
        }else if(nums[mid] > target){
            right = mid
        }
    }
    return left - 1
}
console.log(search1([1,2,3,4,4,5,6],4))
console.log(search2([1,2,3,4,4,5,6],4))
console.log(search3([1,2,3,4,4,5,6],4))

console.log(search1([1,2,3,4,4,4,5,6],4))
console.log(search2([1,2,3,4,4,4,5,6],4))
console.log(search3([1,2,3,4,4,4,5,6],4))

console.log(search1([1,2,3,4,4,4,4,5,6],4))
console.log(search2([1,2,3,4,4,4,4,5,6],4))
console.log(search3([1,2,3,4,4,4,4,5,6],4))
