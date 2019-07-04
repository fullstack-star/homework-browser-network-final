<!-- 响应头 -->
Access-Control-Allow-Origin: <origin> | *
origin 参数的值指定了允许访问该资源的外域 URI，如果请求不需要身份凭证，可以用星号*，所有域都可以请求


Access-Control-Expose-Headers: X-My-Custom-Header, X-Another-Custom-Header
XMLHttpRequest对象的getResponseHeader可以拿到Cache-Control,Content-Language,Content-Type,Expires,Last-Modified,Pragma这些基本头的其他自定义头。

Access-Control-Max-Age
决定预请求到的结果可以缓存多长时间

Access-Control-Allow-Credentials
js的请求中，如果credentials:"include", 则浏览器会根据这个返回字段决定是否要把服务器的respond返回给前端Javascript，
true： 返回；false：不返回

Access-Control-Allow-Methods
跨域允许使用到的方法

Access-Control-Allow-Headers
规定了跨域时允许携带的首部字段。

<!-- 请求头 -->
Origin: <origin>
说明请求发起的来源

Access-Control-Request-Method
实际请求时，需要使用的方法

Access-Control-Request-Headers
实际跨域请求时，会携带的请求头字段