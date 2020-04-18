// 3. shallow copy
var shallowCopy = function(obj) {
	if(typeof obj !== 'object') return;
	var newObj = obj instanceof Array ? [] : {};
	for (var key in obj){
		if(obj.hasOwnProperty(key)){
			newObj[key] = obj[key]
		}
	}
	return newObj
}

// 4. deep copy
var deepCopy = function(obj) {
	if(typeof obj !== 'object') return;
	var newObj = obj instanceof Array ? []:{};
	for (var key in obj){
		if(obj.hasOwnProperty(key)){
			newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
		}
	}
	return newObj
}