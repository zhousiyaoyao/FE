async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}

async function async2() {
    console.log('async2');
}

console.log('script start');

setTimeout(function () {
    console.log('setTimeout');
}, 0);

async1();

new Promise(function (resolve) {
    console.log('promise1');
    resolve();
}).then(function () { console.log('promise2'); });

console.log('script end');

// script start
// async1 start
// async2
// promise1
// script end
// promise2
// async1 end
// setTimeout

async function wait (time) {
    const now = Date.now()
    return new Promise((res, rej) => {
      setTimeout(() => {
        console.log('我是异步执行的函数')
        res()
      }, time)
    })
  }

const arr = [1, 2, 3]

let res = []
arr.forEach(async (i) => {
    res.push(wait(1000))
    console.log(i)
})

Promise.all(res).then(() => {
    console.log(arr)
})


// arr.forEach(async (i) => {
//     await wait(1000)
//     console.log(i)
// })
// console.log(arr)
