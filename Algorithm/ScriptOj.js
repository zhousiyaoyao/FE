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
          const val = Reflect.get(target, key);
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

// 81
const singletonify = fn => {
    const one = new fn()
    return new Proxy(fn, {
      construct(target, argumentsList, newTarget) {
        return one
      }
    })
  }

// 80
function partition(arr){
    var start = 0
    var end = arr.length - 1
    var pivot = arr[0]
    while(start < end){
        while(arr[end] > pivot && start < end){
            end--
        }
        arr[start] = arr[end]
        while(arr[start] < pivot && start < end){
            start++
        }
        arr[end] = arr[start]
    }
    arr[start] = pivot
    return start
}

const arr = [3, 1, 6, 2, 4, 5]
partition(arr)
console.log(arr) // => [2, 1, 3, 6, 4, 5]

// 79
class A {
    constructor (name) {
      this.name = name
    }
    sayHi () {
        console.log(`I am ${this.name}.`)
    }
  }
  
class B {
    constructor (name) {
        this.name = name
    }
    sayHi () {
        console.log(`This is ${this.name}.`)
    }
}

function exchange(a,b){
    var ap = Object.getPrototypeOf(a)
    var bp = Object.getPrototypeOf(b)
    Object.setPrototypeOf(b,ap)
    Object.setPrototypeOf(a,bp)
}


const a = new A('Jerry') 
const b = new B('Lucy')

a.sayHi() // => 'I am Jerry.'
b.sayHi() // => 'This is Lucy.'

a instanceof B // => false
b instanceof A // => false

exchange(a, b)
a.sayHi() // => 'This is Jerry.'
b.sayHi() // => 'I am Lucy.'

a instanceof B // => true
b instanceof A // => true

const c = new A('Tomy')
c.sayHi() // => 应该返回 'I am Tomy.'

// 77
const merge = (arr) => /* TODO */
{
  let length = arr.length;
  let temp; // 交换的中间值
  for(let i = 0; i< length;i++){
    if(arr[i] > arr[i+1]) {
      temp = arr[i];
      arr[i] = arr[i+1];
      arr[i+1] = temp;
    }
    if(i==length-1){
      i=0;
      length--;
    }
  }
  console.log(arr)
}
var a = [10, 21, 32, 11, 16, 40] // 从 0 和 3 开始升序
merge(a)

// 76
const obj = {}
const config1 = { enumerable: false, configurable: true }
const config2 = { enumerable: true, configurable: true }

Object.defineProperties(obj, {
  green: config1,
  red: config2,
  blue: config1,
  yellow: config2
})

function flikerProps(obj){
  const a = Object.getOwnPropertyNames(obj)
  const b = Object.keys(obj)
  for(var i = 0; i < a.length; i++){
    Object.defineProperty(obj, a[i], {
      enumerable: b.indexOf(a[i]) === -1
    })
  }
}

console.log(Object.keys(obj)) // => ["red", "yellow"]
flikerProps(obj) // 闪烁
console.log(Object.keys(obj)) // => ["green", "blue"]
flikerProps(obj) // 闪烁
console.log(Object.keys(obj)) // => ["red", "yellow"]
flikerProps(obj) // 闪烁
console.log(Object.keys(obj)) // => ["green", "blue"]

// 75
const findMostProductivePigChildrenCount = (dom) => {
  var a = [...dom.children]
  console.log([...dom.children])
  var b = [dom.children.length]
  while(a.length){
    let c = []
    b.push(Math.max(...a.map(v => v.children.length)))
    a.forEach(v => {
      c.push(...v.children)
    })
    a = c
  }
  console.log(b)
}
var pig = document.querySelector('#pig');
findMostProductivePigChildrenCount(pig)

// 74
const climbStairs = (n) =>{
  var dp = new Array(n)
  dp[0] = 1
  dp[1] = 2
  for(var i = 2; i < n; i++){
    dp[i] = dp[i-1] + dp[i-2]
  }
  console.log(dp[n-1])
}
climbStairs(10)

// 73
function fillEmpty(a){
  for(var i = 0; i < a.length; i++){
    if(!(i in a)){
      a[i] = 'hello'
    }
  }
  console.log(a)
}
const a = [, , null, undefined, 'OK', ,]
fillEmpty(a)

// 72
const getData = (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('My name is ' + name)
    }, 100) // 模拟异步获取数据
  })
}
const wrapAsync = (generatorFn) =>{
  return function(...args){
    return new Promise((resolve, reject) => {
      const g = generatorFn(...args)
      function go(result){
        if(result.done){
          resolve(result.value)
          return;
        }
        return result.value.then(val => {
          return go(g.next(val))
        })
      }
      go(g.next())
    })

  }
}

const run = wrapAsync(function * (lastName) {
  const data1 = yield getData('Jerry ' + lastName)
  const data2 = yield getData('Lucy ' + lastName)
  return [data1, data2]
})

run('Green').then((val) => {
  console.log(val) // => [ 'My name is Jerry Green', 'My name is Lucy Green' ]
})

// 71
const uniqueNums = (n) => {
  let set = new Set()
  console.log(Math.random())
  while(set.size < n){
    set.add(Math.floor(2 + Math.random() * 31))
  }
  return [...set]
}
console.log(uniqueNums(31))

// 70 位运算，跳过
const clz32 = (num) =>
  isNaN(num) ||
  null == num ||
  !Number.isFinite(Number(num)) ||
  Math.floor(num % 0xffffffff) == 0 ||
  num >= 1.5430679999992199242579968e+25 ||
  num <= -1.5430679999992199242579968e+25 ?
  32 :
  32 - Math.floor(num < 0 ? 0xffffffff + (num % 0xffffffff) : num % 0xffffffff).toString(2).length

// 64
class Box extends Set {
  constructor(arr) {
    super();
    arr.forEach(e => this.add(e));
  }
}

// 62
function initCheckBox () {
  var li = document.getElementsByClassName("check-item")
  var all = document.getElementById("check-all")
  for(var i = 0; i < li.length; i++){
    li[i].onclick = function(){
      let bool = true
      for(let j = 0; j < li.length; j++){
        if(!li[j].checked){
          bool = false
        }
      }
      all.checked = bool
    }
  }
  all.onclick = function(){
    for(let k = 0; k < li.length; k++){
      li[k].checked = all.checked;
    }
  }
}
initCheckBox()

// 56
function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y
  } else {
    return x !== x && y !== y
  }
}

// 54
const initArray = (m, n) => {
  /* TODO */
  var res = new Array(m).fill(n)
  return res
}

// 51
const tomy = new Proxy({},{
  set(target,key,value, receiver){
    console.log(`Don't Touch Me.`);
  },
  defineProperty(target, prop, descriptor) {
    console.log("Don't Touch Me.")
  },
  deleteProperty(target, prop) {
    console.log("Don't Touch Me.")
  },
})
tomy.a = 1
delete tomy.a
tomy['sd'] = 2

// 50
const type = (obj) => {
  return Object.prototype.toString.call(obj).slice(8,-1).toLowerCase();
}

// 49
const pause = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}
async function run () {
  console.log('Hello')
  await pause(1000) // 续一秒
  console.log('World') // 一秒以后继续运行
}
run()

// 39
const arrWithoutLoop = (n) =>{
  return [...Array(n)].map((x,i) => i)
}
console.log(arrWithoutLoop(8))

// 33
const flatten = (arr) => {
  if(!Array.isArray(arr)){
      return
  }
  var res = []
  res = arr.reduce((pre,cur) => {
      return pre.concat(cur instanceof Array ? flatten(cur) : cur)
  },[])
  return res
}
const flatten = (arr) => {
  var b = arr.toString().split(',').map(val => parseInt(val))
  return b
}

// 32
var data = 
{
    rows: [
      ["Lisa", 16, "Female", "2000-12-01"],
      ["Bob", 22, "Male", "1996-01-21"]
    ],
    metaData: [
      { name: "name", note: '' },
      { name: "age", note: '' },
      { name: "gender", note: '' },
      { name: "birthday", note: '' }
    ]
}
const parseData = (data) => {
    var res = []
    data.rows.map((row,index) => {
        let obj = {}
        row.map((ele, i) => {
            obj[data.metaData[i].name]= ele
        })
        res.push(obj)
    })
    return res
}
console.log(parseData(data))

// 31
const getPageTags = function(){
  var dom = document.getElementsByTagName("*")
  var s = new Set([...dom].map(dom => dom.tagName))
  console.log([...s])
}
getPageTags()

// 30
function curry(fn, ...thisArgs){
  return function(...args){
    if(args.length + thisArgs.length < fn.length){
      return curry(fn, ...thisArgs.concat(args))
    }
    return fn.apply(this, thisArgs.concat(args))
  }
}
const add = curry((a, b, c) => a + b + c)
console.log(add(1,1)(2))

// 29
const toCamelCaseVar = (variable) => {
  var item = variable.split('_')[1]
  item = ''.concat(item[0].toUpperCase(), item.slice(1))
  return variable.split('_')[0] + item
}
console.log(toCamelCaseVar('isdsd_sgosdsdsod'))

// 28
div.tall.wealthy.handsome{
  border:1px solid red;
}


// 27
const add1 = (x) => x + 1
const mul3 = (x) => x * 3
const div2 = (x) => x / 2

function compose(...fn){
  return x => fn.reduceRight((pre,cur) => cur(pre), x)
}

function compose(...fn){
  return function(parameter){
    for(var i = fn.length - 1; i >= 0; i--){
      parameter = fn[i](parameter)
    }
    return parameter
  }
}
const operate = compose(div2, mul3, add1, add1)
console.log(operate(0)) // => 相当于 div2(mul3(add1(add1(0))))

// 26
function getPages(total, itemsPerPage) {
  if (!itemsPerPage) {
    return 0
  }
  return Math.ceil(total / itemsPerPage)
}

// 25
const proposeToMissHan = (isOK) => {
  let thoughtTime = 35;
  return new Promise(function(resolve,reject){
      setTimeout(function(){
          if(isOK){
              resolve("ok");
          }else{
            reject("no");
          }
      },thoughtTime)
  });
}
proposeToMissHan(false)

// 24
const plusFor = (name) => {
  let count = 0;
  return () => {
    count++;
    console.log(`为${name}+${count}s`);
  }
}
const counter1 = plusFor('小明')
counter1() // => 为小明+1s
counter1() // => 为小明+2s
counter1() // => 为小明+3s

// 23
function renderFatCats (cats) {
  cats.sort((obj1, obj2) => {
    if(obj1.weight < obj2.weight) return 1;
    else return -1
  })
  let catsList = document.getElementById('cats-list');
  catsList.innerHTML = '';
  let catDiv, catNameSpan, catWeightSpan;
  cats.map(item => {
    catDiv = document.createElement('div');
    catNameSpan = document.createElement('span');
    catWeightSpan = document.createElement('span');
    catDiv.classList.add('cat')
    catNameSpan.classList.add('cat-name')
    catNameSpan.innerText = item.name
    catWeightSpan.classList.add('cat-weight')
    catWeightSpan.innerText = item.weight
    catDiv.appendChild(catNameSpan)
    catDiv.appendChild(catWeightSpan)
    catsList.appendChild(catDiv)
  })
}

// 22
const getChildAttributes = function(el, attr){
  let result = [...el.children].map((item) => {
      return item.getAttribute(attr)
  })
  return result
}

// 21
const hexToRGB = (hex) =>{
  let o = document.createElement('div');
  o.style.color = hex;
  return o.style.color?o.style.color:null;
}

// 20
const TRIM_REGX = /(^\s*)|(\s*$)/g

// 19
const extname = (filename) => {
  const extIndex = filename.lastIndexOf('.')
  if (extIndex<=0){
      return ''
    } else {
      return filename.slice(extIndex)
    }
}
console.log(extname('emoji.text'))

// 18
// ?!表示负前瞻，?=表示前瞻，这里表示查找后面不是\b的和3个数字前面的
function commafy (num) {
  let arr=num.toString().split('.')
  console.log(arr)
  var integer=arr[0].replace(/(?!\b)(?=(\d{3})+$)/g,',')
  console.log(integer)
  if(arr[1]){
    return integer+'.'+arr[1]
  }else return integer
}
console.log(commafy(120000.11))

function commafy (num) {
  let arr=num.toString().split('.')
  let result = arr[0].split('').reverse().reduce((pre,next,index) => {
      if(index %3 !==0 || next === '-'){
          return pre = ''.concat(next, pre)
      }else{
          return pre = ''.concat(next, ',', pre)
      }
  })
  let right = arr[1]
  return right ? ''.concat(result,'.',right) : ''.concat(result)
}
console.log(commafy(1200000000000))

