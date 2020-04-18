// 1. ajax，可同步可异步
// 0建立但没有初始化没open，1open但没有send，2已经发送数据，3数据传送中，4传送完成
let xhr = new XMLHttpRequest();
xhr.withCredentials = true //请求带cookie
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhr.open(get, '/product');
xhr.onreadystatechange = () => {
	if(xhr.readyState === 4 && xhr.status === 200 || xhr.status === 304){
		console.log(xhr.responseText)
	}
}
xhr.send()

// 2. jsonp 在html页面中通过相应的标签从不同域名下加载静态资源文件是被浏览器允许的
// 一般，我们可以动态的创建script标签，再去请求一个带参网址来实现跨域通信
var script = document.createElement("script")
script.src = "http://127.0.0.1:8888/index.php?callback=jsonpCallback"
document.head.appendChild(script);
function jsonpCallback(data){
	var data = JSON.parse(json)
}
