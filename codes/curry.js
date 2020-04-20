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