function solution(str){
    var dfs  = function(str, res, path){
        if(path.length === origin.length){
            res.push(path)
            return
		}
		dfs(str.slice(1), res, path + str[0].toUpperCase())
		dfs(str.slice(1), res, path + str[0])
    }
	var res = []
    dfs(str, res, '')
    return res
}

console.log(solution('kwai'))