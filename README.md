# 浏览器-网络相关作业

1. 列举 CORS 的头信息，并说明作用
1. 写一段代码让 CORS 跨域请求带上 cookie
1. 写一段让 http 请求失败后重试的代码

## 工程目录

启动

```dir
// command窗口1
>cd client
client>http-server // 启动客户端，需要自行安装http-server。默认127.0.0.1:8080
```

```dir
// command窗口2
>cd server
server>npm run dev // 启动服务端，需要自行安装nodejs。默认127.0.0.1:3000
```

## 标准 CORS 的跨域方案

### 概念

https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS

### http 头相关字段

```js
// http request 请求头
决定了是简单请求还是非简单请求。
问题：只要跨域，devtool-network-headers-request中看到的一定是`Provisional headers are shown`吗？
// XMLHttpRequest的设置说明
withCredentials: true // 带上凭证
// fetch的设置说明
credentials: "include", // include, same-origin, *omit
// 默认headers只包含简单请求相关字段，自定义的需要手动填写
// 注意点：客户端一旦添加了非简单请求字段和值，那么会多一个options预检请求
headers: { "x-my-magic": 1,"x-your-romantic"：2 }
mode: "cors" // no-cors, *cors, same-origin
```

```js
// http response 响应头
决定了是否支持cors响应;
// nodejs的设置说明
res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:8080"); // 只能写一个key和value，所以直接从req里取即可，不必写成*
res.setHeader("Access-Control-Allow-Methods", "GET,POST"); // 允许的方法
res.setHeader(
	"Access-Control-Allow-Headers",
	"DNT,Origin,Referer,User-Agent,content-type,cookie,x-my-magic"
); // 自定义字段
res.setHeader("Access-Control-Allow-Credentials", true); // 允许请求凭证
```

## http 请求重试

当 http 请求无响应或者返回错误状态码时（！（200 ～ 299 && 304）），客户端自动对该请求进行重新连接。要求做到：
1，尽可能第一时间获取远端数据，恢复状态。
2，尽可能不对服务器造成持续压力，比如每次重连的请求时间翻番，以及设定最大请求数量

### 策略说明

设定初始请求延时，比如 1 秒。
设定每一轮请求的递进延时，比如翻一番 2 秒。
设定最大请求数量，比如 3 次。

### 方案实施

```js
// 重连方法
function retry(handler) {
	let count = 0;
	let timeid = null;
	const maxCount = 3;
	const seconds = 1000;
	function next(cb) {
		clearTimeout(timeid);
		if (count >= maxCount) {
			cb();
			return;
		}
		timeid = setTimeout(handler, seconds * count, next);
		count++;
	}
	next(null);
}
// 应用重连逻辑
retry(function(next) {
	tg.classList.add("z-pedding", "z-disabled");
	tg.disabled = true;
	fetch(
		config.url[config.choices.server + 0],
		config.fetchOpt[config.choices.client + 0]
	)
		.then(res => res.json())
		.then(json => {
			tg.classList.remove("z-pedding", "z-disabled");
			tg.disabled = false;
			Notify.show("fetch请求成功！");
		})
		.catch(err => {
			next(() => {
				Notify.show("ajax请求失败！");
				tg.classList.remove("z-pedding", "z-disabled");
				tg.disabled = false;
			});
		});
});
```
