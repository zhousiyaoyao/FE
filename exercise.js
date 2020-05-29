console.time('耗时')
var timer = setInterval(() => {
  for (let i = 0; i < 1; i++) { // 900ms左右
  }
  console.log(0)
}, 100);

setTimeout(() => {
  console.log('1s了')
  clearInterval(timer)
  console.timeEnd('耗时') // 耗时: 1955.52490234375ms（打印结果不固定）
}, 1000);
