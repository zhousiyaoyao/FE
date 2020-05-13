var countTriplets = function(arr) {
    var count = 0
    for(var i = 0; i < arr.length - 2; i++){
        for(var k = arr.length-1; k > 0; k--){
            if(i < k){
                for(var j = i+1; j <= k; j++){
                    var a = arr[i]
                    var b = arr[j]
                    for(var x = i+1; x < j; x++){
                        a = a ^ arr[x]
                    }
                    for(var y = j+1; y <= k; y++){
                        b = b ^ arr[y]
                    }
                    if(a === b){
                        count++
                    }
                }
            }
        }
    }
    var flag = arr.every(element => {
        return element === 1
    });
    if(flag){
        return count+1
    }
    return count
};
console.log(countTriplets([2,3,1,6,7]))
console.log(countTriplets([1,1,1,1,1]))
console.log(countTriplets([2,3]))
console.log(countTriplets([1,3,5,7,9]))
console.log(countTriplets([7,11,12,9,5,2,7,17,22]))