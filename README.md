# homework-browser-network-final

## CORS 头信息

### HTTP 响应首部字段

`Access-Control-Allow-Origin`: 指定了允许访问该资源的外域 URI

`Access-Control-Expose-Headers`: 让服务器把允许浏览器访问的头放入白名单

`Access-Control-Max-Age`: 指定了preflight请求的结果能够被缓存多久

`Access-Control-Allow-Credentials`: 指定了当浏览器的credentials设置为true时是否允许浏览器读取response的内容。

`Access-Control-Allow-Methods`: 用于预检请求的响应。其指明了实际请求所允许使用的 HTTP 方法。

`Access-Control-Allow-Headers`: 用于预检请求的响应。其指明了实际请求中允许携带的首部字段。

### HTTP 请求首部字段

`Origin`: 表明预检请求或实际请求的源站

`Access-Control-Request-Method`: 用于预检请求。其作用是，将实际请求所使用的 HTTP 方法告诉服务器。

`Access-Control-Request-Headers`: 用于预检请求。其作用是，将实际请求所携带的首部字段告诉服务器。
