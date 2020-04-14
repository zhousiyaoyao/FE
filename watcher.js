// var event = (function(){
//     var topics = []
//     return{
//         subscribe: function(topic, handler){
//             if(!topics.hasOwnProperty(topic)){
//                 topics[topic] = []
//             }
//             topics[topic].push(handler)
//         },
//         publish: function(topic, info){
//             if(!topics.hasOwnProperty(topic)){
//                 return
//             }
//             topics[topic].forEach((handler) => {
//                 handler(info)
//             })
//         },
//         remove: function(topic,handler){
//             if(!topics.hasOwnProperty(topic)){
//                 return
//             }
//             var deleteindex = -1
//             topics[topic].foreach((item, index) => {
//                 if(item === handler){
//                     deleteindex = index
//                 }
//             })
//             if(deleteindex >= 0){
//                 topics[topic].splice(deleteindex,1)
//             }
//         },
//         removeall: function(topic){
//             if(topics.hasOwnProperty(topic)){
//                 topics[topics] = []
//             }
//         }
//     }
// })()
// function hello(s){
//     console.log(s)
// }
// event.subscribe("hello", hello)
// event.publish("hello", "s232")
// var btn = document.getElementById('btn')
// btn.onclick = function(){
//     console.log('212')
// }

// function debounce(fn, wait){
//     var timer
//     return function(){
//         var context = this
//         var args = arguments
//         clearTimeout(timer)
//         timer = setTimeout(()=>{
//             fn.apply(context,args)
//         },wait)
//     }
// }

// function throttle(fn, wait){
//     var previous = 0
//     return function(){
//         var now = new Date();
//         var context = this
//         var args = arguments
//         if(now - previous > wait){
//             fn.apply(context,args)
//             previous = now
//         }
//     }
// }

// var test = throttle(()=>{
//     console.log("2121")
// },1000)

// const delay = (ms) => new Promise(
//     (resolve) => setTimeout(resolve, ms)
// )
// delay(5000).then(() => console.log('5'))

// setTimeout(() => {
//     console.log('5')
// },5000)

var b = {age: 18}
var a = {name:'siyao'}
console.log(Object.assign(b,a))