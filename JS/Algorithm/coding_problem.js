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


function add(a ,b){
	//取两个数字的最大长度
	let maxLength = Math.max(a.length, b.length);
	//用0去补齐长度
	a = a.padStart(maxLength , 0);//"0009007199254740991"
	b = b.padStart(maxLength , 0);//"1234567899999999999"
	let t = 0
	let f = 0
	let sum = ''
	for(var i = maxLength - 1; i >= 0; i--){
		t = parseInt(a[i]) + parseInt(b[i]) + f;
		f = Math.floor(t/10);
		sum = t%10 + sum
	}
	if(f == 1){
	 sum = "1" + sum;
	}
	return sum
 }
