var obj = {}
Object.defineProperty(obj, 'hello', {
    set: function(newVal){
        document.getElementById('a').value = newVal
        document.getElementById('b').innerHTML = newVal
    }
})
document.addEventListener('keyup',function(e){
    obj.hello = e.target.value;
})