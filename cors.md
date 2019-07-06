## CORS头信息

### HTTP 请求

- Access-Control-Request-Method

        该字段在预检请求中出现且是必须的，用来列出浏览器的CORS请求会用到哪些HTTP方法，比如PUT。

- Access-Control-Request-Headers

        该字段在预检请求中出现，是一个逗号分隔的字符串，指定浏览器CORS请求会额外发送的头信息字段。

### HTTP 响应

- Access-Control-Allow-Origin

        该字段是必须的。它的值要么是请求时Origin字段的值，要么是一个*，表示接受任意域名的请求。

- Access-Control-Allow-Methods

        该字段（在非简单请求中）是必须的，用来列出浏览器的CORS请求会用到哪些HTTP方法，比如PUT，DELETE。

- Access-Control-Allow-Credentials
    
        该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。设为true，即表示服务器明确许可，Cookie可以包含在请求中，一起发给服务器。这个值也只能设为true，如果服务器不要浏览器发送Cookie，删除该字段即可。

- Access-Control-Max-Age

        预检请求的回应。该字段可选，用来指定本次预检请求的有效期，单位为秒。比如返回值是1728000，那么有效期是20天（1728000秒），即允许缓存该条回应1728000秒（即20天），在此期间，不用发出另一条预检请求。
        
- Access-Control-Expose-Headers

        该字段可选。CORS请求时，XMLHttpRequest对象的getResponseHeader()方法只能拿到6个基本字段：Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma。如果想拿到其他字段，就必须在Access-Control-Expose-Headers里面指定。

- Access-Control-Allow-Headers

        预检请求的回应。如果浏览器请求包括Access-Control-Request-Headers字段，则Access-Control-Allow-Headers字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段，不限于浏览器在"预检"中请求的字段。
