var search = function(nums, target) {
    var l = 0
	var r = nums.length - 1
    while(l <= r){
        var mid = Math.floor((r + l)/2)
        if(nums[mid] === target){
            return mid
        }else if(nums[l] <= nums[mid]){
            if(nums[l] <= target <= nums[mid]){
                r = mid - 1
            }else{
                l = mid + 1
            }
        }else{
            if(nums[mid] <= target <= nums[r]){
                l = mid + 1
            }else{
                r = mid - 1
            }
        }
	}
    return -1
};

console.log(search( [4,5,6,7,0,1,2], 0))