// 102
const fibonacci = ((n) => {
    let map = new Map()
    return function(n){
    if(n === 1 || n ===2){
        return 1
    }
    if(map.has(n)){
        return map.get(n)
    }
    var res = fibonacci(n-1) + fibonacci(n-2)
    map.set(n, res)
    return res
    }
})()

// 101
const extractStr = (str) => /* TODO */
{
  var i = 0
  var j = 0
  var result = []
  for(var i = 0; i < str.length; i++){
    if(str[i] === ':'){
      j = i
    }
    if(str[i] === '.' && str[j] !== '.'){
      var res = str.slice(j+1,i)
      result.push(res)
      j = i
    }
  }
  return result
}

// 100
const toChineseNum = (num) => {
    var arr = num.toString().split('').reverse()
    console.log(arr)
    var number = ['零','一','二','三','四','五','六','七','八','九']
    var unit = ['','十','百','千','万','十','百','千'];
    var res = []
    arr.forEach((item, index) => {
        if(item !== '0'){
            var temp = number[item] + unit[index]
            res.push(temp)
        }else{
            if(index > 0 && res[0] != '零' && res[0] != '万'){
                res.length && res.push('零');
            }
            if(index === 4){
                res.push('万')
            }
        }
    })
    return res.reverse().join('')
}

// 99
const safeGet = (data, path) => {
    /* TODO */
    var paths = path.split(".")
    var result = data
    while(paths.length){
        var temp = paths.shift()
        result = result[temp]
        if(!result){
            return undefined
        }
    }
    return result
}

// 98
const isOverlap = (rect1, rect2) => /* TODO */
{
  if(rect1.x + rect1.width < rect2.x){
    return false
  }
  if(rect1.y + rect1.height < rect2.y){
    return false
  }
  if(rect2.height + rect2.y < rect1.y){
    return false
  }
  if(rect2.x + rect2.width < rect1.x){
    return false
  }
  return true
}

// 97
const addClass = (dom, name) => {
    dom.classList.add(name)
  }
  const removeClass = (dom, name) => {
    dom.classList.remove(name)
  }
  const hasClass = (dom, name) => {
    return dom.classList.contains(name)
  }

// 96
String.prototype.spacify = function(){
    return [...this].join(' ')
}

// 95
const ul = h('ul', 
    {id: 'list', style: 'color: red'}, 
        [
        h(
            'li', 
            {class: 'item'}, 
            ['Item 1']
        ),
        h('li', {class: 'item'}, ['Item 2']),
        h('li', {class: 'item'}, ['Item 3'])
        ]
)
  
const urlDom = ul.render() // 渲染 DOM 节点和它的子节点
ulDom.getAttribute('id') === 'list' // true
ulDom.querySelectorAll('li').length === 3 // true

class VNode{
constructor(tagName, props, children){
    this.tagName = tagName
    this.props = props
    this.children = children
}
render(){
    const dom = document.createElement(this.tagName)
    if(this.props){
        const props = Object.keys(this.props)
        props.map(prop => {
            dom.setAttribute(prop, this.props[prop])
        })
    }
    if(this.children){
        this.children.map(child => {
            dom.appendChild(child instanceof of VNode ? child.render() : document.createTextNode(child))
        })
    }
    return dom
}
}
const h = (tagName, props, children) => new VNode(tagName, props, children)

// 94
function injectSections(arr1, arr2){
    arr2.sort((a,b) => b.index - a.index)
    console.log(arr2)
    for(var i = 0; i<arr2.length; i++){
        arr1.splice(arr2[i].index, 0, arr2[i].content)
    }
    console.log(arr1)
}
injectSections(
    ['item1', 'item2', 'item3', 'item4', 'item5'],
    [
    { content: 'section3', index: 1 },
      { content: 'section1', index: 3 },
      { content: 'section2', index: 2 }
    ]
)
