# 列举 CORS 头信息，并说明⽤用途

## Access-Control-Allow-Origin
>Access-Control-Allow-Origin: \<origin> | *

这个头部信息由服务器返回，用来明确指定那些客户端的域名允许访问这个资源。

对于不需要携带身份凭证的请求，服务器可以指定该字段的值为通配符，表示允许来自所有域的请求f。

## Access-Control-Expose-Headers
>Access-Control-Expose-Headers: X-My-Custom-Header, X-Another-Custom-Header

在跨域访问时，XMLHttpRequest对象的getResponseHeader()方法只能拿到一些最基本的响应头，Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma，如果要访问其他头，则需要服务器设置本响应头。

Access-Control-Expose-Headers 头让服务器把允许浏览器访问的头放入白名单。
## Access-Control-Max-Age
Access-Control-Max-Age 头指定了preflight请求的结果能够被缓存多久，请参考本文在前面提到的preflight例子。

>Access-Control-Max-Age: <delta-seconds>

delta-seconds 参数表示preflight请求的结果在多少秒内有效。

## Access-Control-Allow-Credentials
这个头部信息只会在服务器支持通过cookies传递验证信息的返回数据里。它的值只有一个就是 true。

>Access-Control-Allow-Credentials: true

## Access-Control-Allow-Methods
Access-Control-Allow-Methods 首部字段用于预检请求的响应。其指明了实际请求所允许使用的 HTTP 方法。

Access-Control-Allow-Methods: \<method>[, \<method>]*


## Access-Control-Allow-Headers
Access-Control-Allow-Headers 首部字段用于预检请求的响应。其指明了实际请求中允许携带的首部字段。

Access-Control-Allow-Headers: \<field-name>[, \<field-name>]*