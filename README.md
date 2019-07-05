# homework-browser-network-final


## 列列举 CORS 的头信息，并说明⽤用途

#### Access-Control-Allow-Origin
该字段是必须的。它的值要么是请求时 ```Origin``` 字段的值，要么是一个  ```*```，表示接受任意域名的请求。

#### Access-Control-Allow-Credentials
该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。设为 ```true```，即表示服务器明确许可，Cookie可以包含在请求中，一起发给服务器。这个值也只能设为 ```true```，如果服务器不要浏览器发送Cookie，删除该字段即可。

#### Access-Control-Expose-Headers
该字段可选。CORS请求时，```XMLHttpRequest``` 对象的```getResponseHeader()``` 方法只能拿到6个基本字段：```Cache-Control```、```Content-Language```、```Content-Type```、```Expires```、```Last-Modified```、```Pragma```。如果想拿到其他字段，就必须在```Access-Control-Expose-Headers```里面指定。上面的例子指定，getResponseHeader('FooBar')可以返回FooBar字段的值。


需要注意的是，如果要发送Cookie，```Access-Control-Allow-Origin``` 就不能设为星号，必须指定明确的、与请求网页一致的域名。同时，Cookie依然遵循同源政策，只有用服务器域名设置的Cookie才会上传，其他域名的Cookie并不会上传，且（跨源）原网页代码中的 ```document.cookie``` 也无法读取服务器域名下的Cookie。(**巨坑，我正式项目背坑过**)