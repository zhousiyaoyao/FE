var longestSubarray = function(nums, limit) {
    var res = []
    for(var i = 0; i < nums.length - 1; i++){
        for(var j = i+1; j < nums.length; j++){
            res.push(nums.slice(i,j+1))
        }
    }
    var max_len = 0
    console.log(res)
    for(var i = 0;  i < res.length; i++){
        if(Math.max(...res[i]) - Math.min(...res[i]) <= limit){
            if(max_len < res[i].length){
                max_len = res[i].length
            }
        }
    }
    return max_len
};
console.log(longestSubarray([10,1,2,4,7,2],5))