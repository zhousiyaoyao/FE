const inp = document.getElementById('inp')
const spa = document.getElementById('view')

let data = {
    name: 'siyao'
}

function update(){
    spa.innerText = data.name
}

inp.oninput = function(){
    console.log(this.value)
    data.name = this.value
}

Observer(data)


function Observer(obj){
    if(!obj || typeof obj != 'object'){
        return obj;
    }
    Object.keys(obj).forEach((key) => {
        definedRective(obj, key, obj[key])
    })
    function definedRective(obj, key, val){
        Observer(val)
        Object.defineProperty(obj, key, {
            get(){
                return val
            },
            set(newVal){
                if(val === newVal){
                    return
                }
                val = newVal
                update()
            }
        })
    }
}