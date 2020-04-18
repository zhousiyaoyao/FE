// 链式调用
function wordschain(word){
	var words = word;
	function chain(word){
		words += ' -> ' + word;
		return chain;
	}
	chain.wdisd = function(){
		return words;
	}
	return chain;
}
console.log(wordschain('woaini')("wwww")('wwwww').wdisd())

function add(num) {
	var nums = num;
	function twwo(num){
		nums += num;
		return twwo;
	}
	twwo.valueOf = function() {
		return nums
	}
	return twwo;
}
console.log(add(1)(2)(3).valueOf())