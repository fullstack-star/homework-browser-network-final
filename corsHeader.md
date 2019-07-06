## CORS 头信息
### 简单请求
请求头信息

Origin

- 表示本次请求来自哪个源。
- 若浏览器识别这是一次简单请求，它会自动在请求头中添加 origin 字段。


响应头信息

Accept-control-Allow-Origin

- 必要字段。
- 表示服务器允许接收哪些源的请求。


Accept-control-Allow-credentials

- 可选字段。
- 表示是否需要发送 cookie，为布尔值。
当该字段设为 true 时，Access-Control-Allow-Origin 不能设为星号，必须指定明确的、与请求网页一致的域名。并且，客户端在发送请求时需要配置：xhr.withCredentials = true


Accept-control-Expose-Header

- 可选字段。
- 表示服务器允许客户端访问的自定义头信息。
- XMLHttpRequest 对象的 getResponseHeader() 方法只能拿到6个基本字段：Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma。客户端想要访问其他头信息，就需要服务端设置 Accept-control-Expose-Header 。


非简单请求
OPTIONS 预检请求含有的头信息

Origin

- 同简单请求。


Access-Control-Request-Method

- 必要字段。
- 表示客户端会用到的 HTTP 方法。


Access-Control-Request-Headers

- 可选字段。
- 表示在预检请求之后，客户端发送实际请求时想要携带的头信息字段。服务端在响应时，用字段 Access-Control-Allow-Headers 来表示所允许的头信息字段。


预检请求的响应头信息

Access-Control-Allow-Origin

- 同简单请求。


Access-Control-Allow-Methods

- 必要字段。
- 表示服务端所支持的方法。


Access-Control-Allow-Headers

- 若预检请求携带 Access-Control-Request-Headers 字段，则必须。
- 表示服务端允许接收的头信息字段。


Access-Control-Allow-Credentials

- 同简单请求。


Access-Control-Max-Age

- 可选字段。
- 表示本次预检请求的有效期，单位为秒。


在预检请求之后，发送的实际请求，客户端每次都携带 Origin 字段，而服务端每次都响应 Access-Control-Allow-Origin 字段。



