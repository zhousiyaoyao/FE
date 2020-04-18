function compose(...funcs) {
    if (funcs.length === 0) {
      return arg => arg
    }
    if (funcs.length === 1) {
      return funcs[0]
    }
    return funcs.reduce((a, b) => (...args) => a(b(...args)))
  }


const calc1 = x => x * 2
const calc2 = x => x - 1
const calc3 = x => x * 3

const sum = calc3(calc2(calc1(10)))
console.log(sum)

const calc = pipe(calc1,calc2,calc2)
const sum1 = calc(10)
console.log(sum)

const pipe = (...functions) => (initialValue) =>
functions.reduce((value,fn) => fn(value), initialValue);