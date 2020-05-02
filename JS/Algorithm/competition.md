# 目录
* [第25场双周赛](#第25场双周赛)

### 第25场双周赛
第一次参加， 1043/1832，AC两道，第三道脑子卡了，第四道动态规划直接放弃
* 5384
```javascript
var kidsWithCandies = function(candies, extraCandies) {
    var res = []
    var max_can = Math.max(...candies)
    for(var i = 0; i < candies.length; i++){
        if(candies[i] + extraCandies >= max_can){
            res[i] = true
        }else{
            res[i] = false
        }
    }
    return res
};
```
* 5385
```javascript
var maxDiff = function(num) {
    var res = String(num).split('')
    if(res.length === 1){
        return 8
    }
    var start = 0
    while(res[start] === '9'){
        start++
    }
    var temp = res[start]
    res[start] = '9'
    for(var i = start; i < res.length; i++){
        if(res[i] === String(temp)){
            res[i] = res[start]
        }
    }
    var bigger = parseInt(res.join(''))
    var res2 = String(num).split('')
    var start2 = 0
    while(res2[start2] === '1' || res2[start2] === '0'){
        start2++
    }
    if(start2 === res2.length){
        var smaller = num
        return bigger - num
    }
    var temp2 = res2[start2]
    res2[start2] = start2===0 ? '1' : '0'
    for(var i = start2; i < res2.length; i++){
        if(res2[i] === String(temp2)){
            res2[i] = res2[start2]
        }
    }
    var smaller = parseInt(res2.join(''))
    return bigger - smaller
};
```
* 5386
```javascript
var checkIfCanBreak = function(s1, s2) {
    var res = s1.split('')
    var res1 = s2.split('')
    res.sort()
    res1.sort()
    var flag = true
    for(var j = 0; j < res.length; j++){
        flag &= (res[j] >= res1[j])
    }
    if(flag){
        return true
    }
    var flag = true
    for(var j = 0; j < res.length; j++){
        flag &= (res[j] <= res1[j])
    }
    if(flag){
        return true
    }
    return false
};
```
* 5387
```javascript

```