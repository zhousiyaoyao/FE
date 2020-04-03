// var a = ['1a','2b','3c','5a','5c']
// function solution(a){
//     var res = {}
//     for(let value of a){
//         if(value[1] in res){
//             res[value[1]] += parseInt(value[0])
//         }else{
//             res[value[1]] = parseInt(value[0])
//         }
//     }
//     var result = Object.keys(res).sort((a,b)=>res[b]-res[a])
//     console.log(result[0])
// }
// solution(a)

//表格分页如何处理
//vue通信
//css双栏布局
//css吸顶
//vue双向绑定原理
//watch的deep和immediate
//vue-show-if一起作用
//实现v-model


// var pos = document.querySelector('#button')

// function printt(){
//     console.log('12')
// }
// function printt2(){
//     console.log('1222')
// }

// pos.addEventListener('click',printt,false)
// pos.addEventListener('click',printt2,false)
// pos.removeEventListener('click',printt,false)

// attachevent
// detachevent
var events = (function() {
    var topics = {}
    return{
        publish: function(topic, info){
            console.log('public' + topic)
            if(topics.hasOwnProperty(topic)){
                topics[topic].forEach((handler) => {
                    handler(info ? info : {})
                })
            }
        },
        subscribe: function(topic, handler){
            console.log('subscribe' + topic)
            if(!topics.hasOwnProperty(topic)){
                topics[topic] = [];
            }
            topics[topic].push(handler)
        },
        remove: function(topic,handler){
            if(!topics.hasOwnProperty(topic)){
                return;
            }
            var handlerIndex = -1
            topics[topic].forEach((element, index) => {
                if(element === handler){
                    handlerIndex = index;
                }
            })
            if (handlerIndex >= 0){
                topics[topic].splice(handlerIndex, 1)
            }
        },
        removeAll: function(topic){
            console.log('remove all the handler on the topic:' + topic);
            if(topics.hasOwnProperty(topic)){
                topics[topic].length = 0
            }
        }
    }
})()
console.log(events)
var handler = info => console.log(info)
var handler2 = () => console.log(123)
events.subscribe('hello',handler)
events.subscribe('hello',handler2)
events.remove('hello',handler2)
events.publish('hello','hello')


// 媒体查询
// 防抖
// 斐波那契数列
// 深拷贝
// flex

function debounce(func, wait){
    var timer = null
    return function(){
        var context = this
        var args = arguments
        if(timer){
            clearTimeout(timer)
            timer = null
        }
        timer = setTimeout(()=>{
            func.apply(context, args)
        }, wait)
    }
}

function throttle(func, delay){
    var previous = Date.now()
    return function(){
        var context = this
        var args = arguments
        var now = Date.now()
        if(previous - now >= delay){
            func.apply(context, args)
            previous = Date.now()
        }
    }
}