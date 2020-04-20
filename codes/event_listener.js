let ul = document.querySelector('#ul')
ul.addEventListener('click', (event) => {
	console.log(event.target)
	console.log(event.currentTarget)
	console.log(event.target.innerText);
})

pos.addEventListener('click',printt,false)
pos.addEventListener('click',printt2,false)
pos.removeEventListener('click',printt,false)
// false默认冒泡，true捕获
attachevent
detachevent

const Event_po = {
    addEvent: function(element, type, handler){
        if(element.addEventListener){
            element.addEventListener(type,handler,false)
        }else if(element.attachEvent){
            element.attachEvent("on" + type, handler)
        }else{
            element["on" + type] = handler;
        }
    },
    removeEvent: function(element, type, handler){
        if(element.removeEventListener){
            element.removeEventListener(type,handler,false)
        }else if(element.detachEvent){
            element.detachEvent("on" + type, handler)
        }else{
            element["on" + type] = null;
        }
    },
    getTarget: function(event) {
        return event.target || event.srcElement;
    },
    getEvent: function(event) {
        return event || window.event;
    },
    stopPropagation: function(event) {
        if(event.stopPropagation) {
          event.stopPropagation();
        } else {
          event.cancelBubble = true;
        }
    },
    preventDefault: function(event) {
        if (event.preventDefault) {
          event.preventDefault();
        } else {
          event.returnValue = false;
        }
    }
};