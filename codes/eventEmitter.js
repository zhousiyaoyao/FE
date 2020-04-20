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