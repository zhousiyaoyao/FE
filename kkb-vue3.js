// 原始=> 响应式
let toProxy = new WeakMap()
// 响应式 => 原始
let toRaw = new WeakMap()

let effectStack = [] // 存储effect的地方
let targetMap = new WeakMap() // 特殊的对象 key是object

// Obj.name
// {
//  target: deps: { key: [dep1]}

// }



// let obj = {name: 'kkb'}
// obj.name

// 以上 存储依赖关系
function track(target, key) {
    // 收集依赖
    const effect = effectStack[effectStack.length -1]
    // 最新的effect
    if(effect) {
        let depMap = targetMap.get(target)
        if(depMap === undefined) {
            depMap = new Map()
            targetMap.set(target, depMap)
        }
        let dep = depMap.get(key)
        if(dep === undefined ) {
            dep = new Set()
            depMap.set(key, dep)
        }

        if(!dep.has(effect) ) {
            dep.add(effect)
            effect.deps.push(dep)
        }
    }



}

function trigger(target, key, info) {
    // 触发更新
    // 寻找依赖effect
    const depMap = targetMap.get(target)
    if(depMap === undefined) {
        // 没有依赖
        return
    }

    const effects = new Set()
    const computedRunners = new Set()
    if(key) {
        let deps = depMap.get(key)
        // deps里面全部是effect
        deps.forEach(effect=> {
            if(effect.computed) {
                computedRunners.add(effect)
            } else {
                effects.add(effect)
            }
        })
    }

    effects.forEach(effect=>effect())

}


function effect(fn,options={}) {
    // 知道依赖
    // TODO: 处理options
    let e = createReactiveEffect(fn, options)
    if(!options.lazy) {
        e()
    }
    return e

    
}

function computed(fn){
    // 特殊的effect
    const runner = effect(fn,{computed:true, lazy:true})
    return {
        effect: runner,
        get value() {
            return runner()
        }
    }

}

function createReactiveEffect(fn, options) {
    const effect = function effect(...args) {
        return run(effect, fn,args)
    }
    effect.deps = []
    effect.computed = options.computed
    effect.lazy = options.lazy
    return effect
}

function run(effect, fn, args) {
    if(effectStack.indexOf(effect) === -1) {
        try{
            effectStack.push(effect)
            return fn(...args)  // 执行代码
        } finally {
            effectStack.pop()  // 用完就要推出去
        }
    }
}


// 响应式代理
const baseHandler = {
    get(target, key) {
        // 收集依赖 track
        const res = Reflect.get(target, key)
        track(target, key) 
        return typeof res === 'object'?reactive(res):res

    },
    set(target, key, val) {
        const info = {oldValue: target[key], newValue:val}
        // obj.name = xx 这里我们需要通知更新的
        const res = Reflect.set(target, key, val)
        // 触发更新
        trigger(target, key, info)
        return res
    }
}

// 响应式入口
function reactive(target) {

    // 查询缓存
    let observed = toProxy.get(target)
    if(observed) {
        return observed
    }
    if(toRaw.get(target)) {
        return target
    }
    observed = new Proxy(target, baseHandler)

    toProxy.set(target, observed)
    toRaw.set(target, observed)
    return observed
}


