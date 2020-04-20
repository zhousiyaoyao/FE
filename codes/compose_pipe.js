const add1 = (x) => x + 1
const mul3 = (x) => x * 3
const div2 = (x) => x / 2

function compose(...fn){
  return x => fn.reduceRight((pre,cur) => cur(pre), x)
}

function compose(...fn){
  return function(parameter){
    for(var i = fn.length - 1; i >= 0; i--){
      parameter = fn[i](parameter)
    }
    return parameter
  }
}
const operate = compose(div2, mul3, add1, add1)
console.log(operate(0)) // => 相当于 div2(mul3(add1(add1(0))))

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