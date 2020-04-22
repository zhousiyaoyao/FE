
//debounce，第一个timeout为null，声明一个timeout为计时器，调用fn，10s内再次访问，重新生成timeout， 10s
function debounce1(func, wait) {
	var timeout;
	return function(){
		var content = this;
        var args = arguments;
        if(timeout){
            clearTimeout(timeout)
        }
		timeout = setTimeout(function(){
			func.apply(content,args)
		},wait);
	}
}
container.onmousemove = debounce1(getUserAction, 1000);

// 立即执行，用一个imm为true，第一次timeout为null，flag为true，立刻执行，这时有timeout，flag为false，不能执行
function debounce3(func, wait, immediate) {
	var timeout;
	return function(){
		var content = this;
		var args = arguments;
		if (timeout) clearTimeout(timeout);
		if(immediate){
			var callNow = !timeout;
			timeout = setTimeout(function(){
				timeout = null;
			}, wait)
			if(callNow) func.apply(content, args)
		}
	}
}

// 立即执行且带返回值的debounce
function debounce2(func, wait, immediate) {
	var timeout, result;
	return function(){
		var content = this;
		var args = arguments;
		if (timeout) clearTimeout(timeout);
		if(immediate){
			var callNow = !timeout;
			timeout = setTimeout(function(){
				timeout = null;
			}, wait)
			if(callNow) result = func.apply(content, args)
		}else{
			timeout = setTimeout(function(){
				func.apply(content, args)
			},wait);
		}
		return result
	}
}

// 节流 throttle 立即执行，基于时间戳，停止触发后，不会有最后一次
// 以前时间为0，现在时间减去之前，第一次肯定大于wait，执行，previous变成now，再10s执行一次
function throttle1(func, wait){
	var content, args;
	var previous = 0;
	return function(){
		var now = new Date()
		content = this
		args = arguments
		if(now - previous > wait){
			func.apply(content, args);
			previous = now;
		}
	}
}

// 第一次不执行，基于定时器，停止触发后，有最后一次
// timeout开始为0，设置timeout，10s，timeout为null且调用func，所以10s后，调用一次，timeout变null，再调用一次
function throttle2(func, wait){
	var timeout = 0;
	return function(){
		context = this;
		args = arguments;
		if (!timeout){
			timeout = setTimeout(function(){
				timeout = null
				func.apply(context, args)
			}, wait)
		}
	}
}
