
//debounce
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
function throttle2(func, wait){
	var timeout = 0;
	var pervious = 0;
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
