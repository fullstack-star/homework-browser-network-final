# homework-browser-network-final

## 响应头
1. Access-Control-Allow-Origin: origin | * 其中，origin 参数的值指定了允许访问该资源的外域 URI。对于不需要携带身份凭证的请求，服务器可以指定该字段的值为通配符，表示允许来自所有域的请求。
如果服务端指定了具体的域名而非“*”，那么响应首部中的 Vary 字段的值必须包含 Origin。这将告诉客户端：服务器对不同的源站返回不同的内容。

2. Access-Control-Expose-Headers 让服务器把允许浏览器访问的头放入白名单，例如：
Access-Control-Expose-Headers: X-My-Custom-Header, X-Another-Custom-Header 这样浏览器就能够通过getResponseHeader访问X-My-Custom-Header和 X-Another-Custom-Header 响应头了。

3. Access-Control-Max-Age: delta-seconds delta-seconds 参数表示preflight请求的结果在多少秒内有效。

4. Access-Control-Allow-Credentials 头指定了当浏览器的credentials设置为true时是否允许浏览器读取response的内容。当用在对preflight预检测请求的响应中时，它指定了实际的请求是否可以使用credentials。请注意：简单 GET 请求不会被预检；如果对此类请求的响应中不包含该字段，这个响应将被忽略掉，并且浏览器也不会将相应内容返回给网页。

5. Access-Control-Allow-Methods 首部字段用于预检请求的响应。其指明了实际请求所允许使用的 HTTP 方法。

Access-Control-Allow-Methods: method[, method]* 相关示例见这里。

6. Access-Control-Allow-Headers 首部字段用于预检请求的响应。其指明了实际请求中允许携带的首部字段。
Access-Control-Allow-Headers: field-name[, field-name]*

## 请求头
请注意，这些首部字段无须手动设置。 当开发者使用 XMLHttpRequest 对象发起跨域请求时，它们已经被设置就绪。

Origin 首部字段表明预检请求或实际请求的源站。
Origin: origin origin 参数的值为源站 URI。它不包含任何路径信息，只是服务器名称。

Note: 有时候将该字段的值设置为空字符串是有用的，例如，当源站是一个 data URL 时。 注意，不管是否为跨域请求，ORIGIN 字段总是被发送。

Access-Control-Request-Method 首部字段用于预检请求。其作用是，将实际请求所使用的 HTTP 方法告诉服务器。
Access-Control-Request-Method: method

Access-Control-Request-Headers 首部字段用于预检请求。其作用是，将实际请求所携带的首部字段告诉服务器。
Access-Control-Request-Headers: field-name[, field-name]*