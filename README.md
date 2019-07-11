# homework-browser-network-final

### 列举cors的头信息，并说明用途
```
Access-Control-Allow-Origin: http://api.bob.com
// 指定允许请求的源
Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept
// 表明服务器支持的所有头信息字段
Access-Control-Allow-Credentials: true
// 是否允许发送cookie
Access-Control-Expose-Headers: Date
// CORS请求时，XMLHttpRequest对象的getResponseHeader()允许拿到的除了6个基本对象的额外对象。例如请求发生的时间戳Date。
Access-Control-Allow-Methods: OPTIONS, POST, GET
// 表明服务器支持的所有跨域请求的方法
```
