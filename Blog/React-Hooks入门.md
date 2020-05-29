---
title: useEffect小试
type: categories
copyright: true
date: 2020-05-10 15:33:00
tags: React Hooks
categories: React
---

## 前序
实习了3天，感受到了互联网公司的快节奏
React hooks，TS，Sass是基础，而自己又不太熟，需要补补课
React hooks之前看了一下官方文档，感觉非常清晰，然鹅做起项目来，还是有点不大理解，需要捋一捋

## useEffect
react只会在浏览器绘制之后运行effects
useEffect函数在每一次渲染中都不同，对应的state值也只属于当前那次渲染。
一个function对应多次渲染，每一次渲染中useEffect和state都是不同且独立的，每个effect函数看到的props和state都是来自他属于的那次渲染

#### 一次完整的渲染过程，以官网count为例子
1. 组件给react需要渲染的内容，此时count为0，并告诉react渲染之后调用effect函数
2. react拿到组件渲染内容，更新UI，告诉DOM进行修改
3. 浏览器绘制后告诉react，react运行effect
4. 然后count为1，组件给react count为1时的渲染内容，重复进行

和componentDidUpdate相比，componentDidUpdate的state会指向最新的state，而hooks会指向某次特定渲染的值，这也是闭包的一个应用。
如果想在effec的回调中拿到最新的值而不是每次渲染的值，可以用refs

#### effect清理
1. react渲染id为1的UI
2. 浏览器绘制，我们看到id为1的UI
3. react清除id为0的effect
4. react运行id为1的effect，id变成2
上一次的effect会在重新渲染后，被清除，effect的清除并不会读取到最新的props。所以react能做到在绘制后立即处理effect

#### 依赖数组deps
因为react无法区分effects之间的不同，只能依靠deps
如果两次渲染，deps一样，react会跳过这次effect，也就是只有deps改变，effect才会生效
如果deps为空，表示只有第一次渲染会执行effect

#### 依赖撒谎
依赖是我们给react的暗示，告诉它effect里需要使用的渲染的值，如果effect使用了count，但依赖数组里没有，会出大问题。
比如设置定时器，定时器调用了state但没有在deps里面标明，这样effect不会重复调用，每一次setCount里count都是常数
```javascript
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1);
      // setCount(c => c + 1); 正确的姿势
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return <h1>{count}</h1>;
}
```

#### useEffect发请求
```javascript
useEffect(() => {
    async function fetchData(){
        const result = await axios()
    }
    fetchData()
}, [])

async function fetchData(){
    const result = await axios()
}
useEffect(() => {
    fetchData()
}, [])
```
请求函数写在useEffect里面容易出现问题，比如如果async函数里面有一个state，UserID，我们需要在deps里面加入，但由于代码量比较大，我们非常可能忘记加上这个deps，然而如果我们把async函数写在useEffect里面，就很直观，程序员可以意识到要加这个间接依赖

如果几个effect调用了同一个函数，可以把函数放在整个组件外面，或者用callback钩子
```javascript
function getFetchUrl(query) {
  return 'https://hn.algolia.com/api/v1/search?query=' + query;
}
function SearchResults() {
  useEffect(() => {
    const url = getFetchUrl('react');
  }, []);
  useEffect(() => {
    const url = getFetchUrl('redux');
  }, []);
}

function SearchResults() {
  const getFetchUrl = useCallback((query) => {
    return 'https://hn.algolia.com/api/v1/search?query=' + query;
  }, []); 

  useEffect(() => {
    const url = getFetchUrl('react');
  }, [getFetchUrl]);

  useEffect(() => {
    const url = getFetchUrl('redux');
  }, [getFetchUrl]); 
}
```
