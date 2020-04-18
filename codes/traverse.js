// 1. for循环
var arr = [1,2,4,6]
for(var i = 0; i < arr.length; i++){
	console.log(arr[i])
}

// 2. foreach，每个元素执行一次callback，没有返回值，不对原数组进行修改，但可以通过索引改变数组
var arr = [1,2,4,6]
arr.forEach(function(item,index,arr){
	item = item * 5
	console.log(item)
	arr[index] = item*5
})
console.log(arr)

// 3. for in,对象等枚举属性，对象可以，数组不行
var obj = {
    name: 'test',
    color: 'red',
    day: 'sunday',
    number: 5
}
for (var key in obj) {
    console.log(obj[key])
}

// 4. for of，iterate，数组可以，对象不行
var arr =[1,2]
for (item of arr) {
    console.log(item)
}

// 5. map 原数组进行处理后返回成一个新数组
var arr = [1,2,3]
var fiarr = arr.map(item => item * 5)
console.log(fiarr)
console.log(arr)

// 6. reduce 返回一个数，让前项和后项做某种计算，返回累计值
var arr = [1,2,3,4]
var res = arr.reduce(function(total,currentValue){
	return total - currentValue
})
console.log(res)
console.log(arr)

// 7. filter 返回一个数组，符合条件的数组
var arr = [2,3,4,5,6]
var res = arr.filter(function(item){
	return item > 3
})
console.log(res)

// 8. every, 全部符合筛选条件，才true
var arr = [2,3,4,5,6]
var res = arr.every(function(item){
	return item > 3
})
console.log(res)

// 8. some, 有一个符合筛选条件，就true
var arr = [2,3,4,5,6]
var res = arr.some(function(item){
	return item > 3
})
console.log(res)
