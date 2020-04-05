// var inputs = 'welcomebreakcommunication'
// var word1 = inputs.slice(0,7)
// var arr = inputs.slice(7,12)
// var word2 = inputs.slice(12)
// var s = arr.split("")
// for(var i = 0; i<s.length-1; i++){
//     s[i] += ' '
// }
// var s2 = arr.split("")
// for(var i = 0; i<s2.length-1; i++){
//     s2[i] += ' '
// }
// var i = 0
// var j = s.length-2
// console.log(word1 + ' ' + s.join('') + ' ' + word2)
// while(i<s.length-2){
//     s[j] = s[j].substr(0,s[j].length-1)
//     j--
//     console.log(word1 + ' ' + s.join('') + ' ' + word2)
//     s2[i] = s2[i].substr(0,s2[i].length-1)
//     i++
//     console.log(word1 + ' ' + s2.join('') + ' ' + word2)
// }
// console.log(word1 + ' ' + 'break' + ' ' + word2)

var a = [{id:1, w:2},{id:1, w:3},{id:2, w:4},{id:2, w:11},{id:2, w:12},{id:2, w:11},{id:2, w:13}]
res = {}
for(let key in a){
	if (a[key].id in res){
		if(a[key].w > res[a[key].id]){
			res[a[key].id] = a[key].w
		}
	} 
	else{
		res[a[key].id] = a[key].w
	}
}
console.log(res)
let result = new Array()
for(let key in res){
	console.log(key,res[key])
	tmp = {}
	tmp.id = key
	tmp.w = res[key]
	result.push(tmp)
}
console.log(result)