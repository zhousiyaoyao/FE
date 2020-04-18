var list = [['热', '冷', '冰'], ['大', '中', '小'], ['重辣', '微辣'], ['重麻', '微麻']];
function compose(list){
	var res = list.reduce((sum1,cur1)=>{
		return cur1.reduce((sum2,cur2) =>{
			return sum2.concat(sum1.map(ele => [].concat(ele, cur2)))
		}, [])
	})
	console.log(res)
	return res.map(arr=>arr.join('+'))
}
a = compose(list)
console.log(a)