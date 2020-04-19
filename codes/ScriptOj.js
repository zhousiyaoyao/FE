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

// 93
class VNode{
    constructor(tagName, props, children){
        this.tagName = tagName
        this.props = props
        this.children = children
    }
    const h = (tagName, props, child) => new VNode(tagName, props, child)
}

// 92
const rob1 = (nums) =>
{
    var dp = function(nums, start){
        if(start >= nums.length){
            return 0
        }
        if(map.has(start)){
            return map.get(start)
        }
        var res = Math.max(dp(nums, start + 1), dp(nums, start + 2) + nums[start])
        map.set(start, res)
        return res
    }
    let map = new Map()
    return dp(nums, 0)
}
//环形
const rob2 = (nums) =>
{
    var dp = function(nums, start, end){
        if(start >= end){
            return 0
        }
        if(map.has(start)){
            return map.get(start)
        }
        var res = Math.max(dp(nums, start + 1, end), dp(nums, start + 2, end) + nums[start])
        map.set(start, res)
        return res
    }
    let map = new Map()
    var n = nums.length
    return Math.max(dp(nums, 0, n-2),dp(nums,1, n-1))
}
console.log(rob([1,10,3,4,5]))
// 树
var rob3 = function(root) {
    var dp = function(root){
        if(root === null){
            return 0
        }
        if(map.has(root)){
            return map.get(root)
        }
        var res1 = root.val
             + (root.left === null ? 
                0 : dp(root.left.left) + dp(root.left.right))
             + (root.right === null ?
                0 :dp(root.right.left) + dp(root.right.right))
        var res2 = dp(root.left) + dp(root.right)
        var res = Math.max(res1, res2)
        map.set(root, res)
        return res
    }
    var map = new Map()
    return dp(root)
};

// 91
function* flatten2(arr){
    var arr = arr.toString().split(',').map((ele) => parseInt(ele))
    for(let o of arr){
        yield o
    }
}
const numbers = flatten2([1, [[2], 3, 4], 5])
console.log(numbers)
console.log(numbers.next().value) // => 1
console.log(numbers.next().value) // => 2
console.log(numbers.next().value) // => 3
console.log(numbers.next().value) // => 4
console.log(numbers.next().value) // => 5

// 90  注意箭头函数就不要return，加了大括号就要
function isSameSet(set1, set2){
    return [...set1].every((ele) => {
        return set2.has(ele)
    }) && 
    [...set2].every((ele) => {
        return set1.has(ele)
    })
}
const a = {}
const b = 1
const c = 'ScriptOJ'

const set1 = new Set([a, b, c])
const set2 = new Set([a, c, b])
console.log(isSameSet(set1, set2)) // => true

// 89
function unique(arr){
    var res = []
    for(var i = 0; i < arr.length; i++){
        if(res.indexOf(arr[i]) === -1){
            res.push(arr[i])
        }
    }
    console.log(res)
    // var arr = new Set(arr)
    // console.log([...arr])
    // console.log(Array.from(arr))
}

unique([0, 1, 2, 2, 3, 3, 4]) // => [0, 1, 2, 3, 4]
unique([0, 1, '1', '1', 2]) // => [0, 1, '1', 2]

// 88
// 假设 $ 已经定义为 'ScriptOJ'

// 加载 jQuery，$ 变量被覆盖，变成了 jQuery。
// ...
$('body').html('ScriptOJ')

// noConflict 恢复原来的 $ 变量
const j = $.noConflict()
$ === 'ScriptOJ' // => true

// 现在 jQuery 变成了 j
j('body').html('Hello')

(() => {
    const flag = window.$ // jQuery
    window.$ = {
      noConflict () {
        window.$ = flag // j === jQuert
        return this // ScriptOJ
      }
    }
})()

// 87
// (regex).test(str)得到true或false （常用）
// str.search(regex)得到true或false
// str.split(regex)按正则切成数组
// str.match(regex)得到匹配的字符串数组 （常用）
// (regex).exec(str)得到匹配的字符串数组
// str.replace(regex,"/")替换成/


// d{2,3}横向匹配，匹配2-3个d，d[2,3]纵向匹配，匹配d2或d3，
// \d匹配[0-9],\D匹配非数组，[\d\D]或者[^]匹配任意字符
// ?0-1次，+1到无穷次，*任意次数
// 写在//直接，全局匹配//g，匹配所有的字符，index会移动
const isUSDFormat = str => (/^\$([1-9]\d{0,2}(,\d{3})*|0)(\.\d{2})?$/).test(str)

//86
function highlight(arr, ...args){
    console.log(arr)
    console.log([...args])
    let result="";
    arr.forEach((v,i)=>{
      result+=`${arr[i]}<span class="color-red">${args[i]||""}</span>`
    })
    console.log(result)
    return result
}

const yourName = 'ScriptOJ'
const myName = 'Jerry'
let html = highlight`Hello, ${yourName}. I am ${myName}.`

// 85
class PriorityQueue {
    constructor(list){
        this.list = []
    }
    add (n) {
      /* TODO */
      this.list.push(n)
    }
    
    remove () {
      /* TODO */
      this.list.sort((a,b) => b-a)
      var delet = this.list[0]
      this.list.splice(0,1)
      return delet
    }
  }
  const pq = new PriorityQueue()
  pq.add(1)
  pq.add(2)
  pq.add(3)
  console.log(pq.list)
  console.log(pq.remove())
  console.log(pq.list)
  pq.remove() // => 2
  pq.remove() // => 1

// 84
class Person {
    constructor (name) {
      this.name = name
    }
    sayHi () {
      console.log(`I am ${this.name}.`)
    }
  }
  const autoBind = (ToBindClass) => {
    return function(...args) {
      const self = new ToBindClass(...args);
      return new Proxy(self, {
        get(target, key) {
          console.log(self)
          console.log(target)
          console.log(key)
          const val = Reflect.get(target, key);
          console.log(val)
          console.log('end')
          if (typeof val === 'function') return val.bind(self);
          else return val;
        }
      })
    }
  }
  const BoundPerson = autoBind(Person)
  const lucy = new BoundPerson('Lucy')
  const sayHi = lucy.sayHi
  sayHi() // => I am Lucy.
  Person.prototype.sayGood = function () {
    console.log(`I am ${this.name}. I am good!`)
  }
  const sayGood = lucy.sayGood
  sayGood() // => I am Lucy. I am good!

// 83
Map.prototype.filterKeys = function(fn){
    return new Map([...this].filter(([k,v]) => fn(k)))
}

Map.prototype.filterValues = function(fn){
    return new Map([...this].filter(([k,v]) => fn(v)))
}

const m = new Map([['Jerry', 12], ['Jimmy', 13], ['Tomy', 14]])

console.log(m.filterKeys((key) => key.startsWith('J'))) // => Map { Jerry => 12, Jimmy => 13 }
console.log(m.filterValues((val) => val >= 13)) // => Map { Jimmy => 13, Tomy => 14  }

// 原有的 map 保持不变
console.log(m) // => Map { Jerry => 12 , Jimmy => 13, Tomy => 14 }

// 82
const partition3way = (arr) =>{
    var start = 0
    var end = arr.length - 1
    var  i = 0 
    var pivot = arr[0]
    var swap = (a, i, j) => [a[i],a[j]] = [a[j],a[i]]
    while(i <= end){
        if(arr[i] < pivot){
            swap(arr, start++, i++)
        }
        else if(arr[i] > pivot){
            swap(arr, i, end--)
        }else{
            i++
        }
    }
}
const arr = [3, 1, 3, 6, 2, 3, 4, 5]
partition3way(arr)
console.log(arr)