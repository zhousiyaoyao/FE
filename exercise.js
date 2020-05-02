var checkIfCanBreak = function(s1,s2) {
    var dfs = function(s, path, res){
        if(path.length === 3){
            res.push(path)
            return 
        }
        for(var i = 0; i < s.length; i++){
           dfs(s.slice(0,i).concat(s.slice(i+1)) , path+s[i], res)
        }
    }
    var res = []
    var res1 = []
    dfs(s1,'',res)
    dfs(s2,'',res1)
    res.sort()
    res1.sort()
    console.log(res)
    console.log(res1)
    for(var i = 0; i < res.length; i++){
        var flag = true
        for(var j = 0; j < res[0].length; j++){
            flag &= (res[i].split('')[j] >= res1[i].split('')[j])
        }
        if(flag){
            return true
        }
        var flag = true
        for(var j = 0; j < res[0].length; j++){
            flag &= (res[i].split('')[j] <= res1[i].split('')[j])
        }
        if(flag){
            return true
        }
    }
    return false
};
console.log(checkIfCanBreak('leetcodee','interview'))