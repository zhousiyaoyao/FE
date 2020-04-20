// 1. shallow copy
var shallowCopy = function(obj) {
	if(typeof obj !== 'object') return;
	var newObj = obj instanceof Array ? [] : {};
	for (var key in obj){
		if(obj.hasOwnProperty(key)){
			newObj[key] = obj[key]
		}
	}
	return newObj
}

// 2. deep copy normal
var deepCopy = function(obj) {
	if(typeof obj !== 'object') return;
	var newObj = obj instanceof Array ? []:{};
	for (var key in obj){
		if(obj.hasOwnProperty(key)){
			newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
		}
	}
	return newObj
}

// 3. deep copy simple
var b = JSON.parse(JSON.stringify(obj))
console.log(b)

// 4. deep copy loop
var deepCopyDFS = function() {
    let res = new Map()
    return function(obj){
        if(res.has(obj)){
            return obj
        }
        res.set(obj,obj)
        if(obj === null){
            return null
        }
        var newObj = Array.isArray(obj) ? [] : {}
        for(let i in obj){
            if(i in obj){
                if(typeof obj[i] === 'object'){
                    newObj[i] = deepCopyDFS(obj[i])
                }else{
                    newObj[i] = obj[i]
                }
            }
        }
        return newObj
    }
}()

let test = {
    a1: 1,
    b1: null,
    c1: undefined,
    d1: {
        a2: "hello",
        b2: [1, 2, 3],
        c3: true
    },
    e1: [1, 2, 3],
};
test.f1 = test
let dcopy = deepCopyDFS(test);
console.log(test)
console.log(dcopy)

// 5. deep copy bfs
function BFSDeepClone(obj) {
    if(obj === null){
        return null
    }
    let newObj = {}
    const queue = [obj]
    const temp = [newObj]
    const vistied = new Set([obj])
    while (queue.length) {
      const a = queue.shift()
      const copyObj = temp.shift()
      Object.keys(a).forEach(key => {
        const item = a[key]
        if (typeof item === 'Object') {
          if (vistied.has(item)) {
            copyObj[key] = item
          } else {
            vistied.add(item)
            copyObj[key] = typeof item === 'Object' ? {} : []
            queue.push(item)
            temp.push(copyObj[key])
          }
        } else {
          copyObj[key] = item
        }
      })
    }
    return newObj
  }

let test = {
    a1: 1,
    b1: null,
    c1: undefined,
    d1: {
        a2: "hello",
        b2: [1, 2, 3],
        c3: true
    },
    e1: [1, 2, 3],
};
test.f1 = test
console.log(BFSDeepClone(test))
console.log(BFSDeepClone(test))