# 简单请求头信息
origin 字段，表示发起请求的域名
# 简单请求响应头
1）Access-Control-Allow-Origin

该字段是必须的。它的值要么是请求时Origin字段的值，要么是一个*，表示接受任意域名的请求。

（2）Access-Control-Allow-Credentials

可选。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。设为true，即表示服务器明确许可，Cookie可以包含在请求中，一起发给服务器。这个值也只能设为true，如果服务器不要浏览器发送Cookie，删除该字段即可。

浏览器也必须设置xhr.withCredentials = true;，否则浏览器不会处理cookie。

（3）Access-Control-Expose-Headers

可选。CORS请求时，XMLHttpRequest对象的getResponseHeader()方法只能拿到6个基本字段：Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma。如果想拿到其他字段，就必须在Access-Control-Expose-Headers里面指定。

# 复杂请求
  复杂请求是那种对服务器有特殊要求的请求，比如请求方法是PUT或DELETE，或者Content-Type字段的类型是application/json。
  
## option
  它会先发出options预请求，这个请求会包含：

  （1）Access-Control-Request-Method

  该字段是必须的，用来列出浏览器的CORS请求会用到哪些HTTP方法。

  （2）Access-Control-Request-Headers

  该字段是一个逗号分隔的字符串，指定浏览器CORS请求会额外发送的头信息字段。
  
  响应头包含如下：

  （1）Access-Control-Allow-Methods

  该字段必需，它的值是逗号分隔的一个字符串，表明服务器支持的所有跨域请求的方法。注意，返回的是所有支持的方法，而不单是浏览器请求的那个方法。这是为了避免多次"预检"请求。

  （2）Access-Control-Allow-Headers

  如果浏览器请求包括Access-Control-Request-Headers字段，则Access-Control-Allow-Headers字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段，不限于浏览器在"预检"中请求的字段。也就是可以返回浏览器不想要的头信息

  （3）Access-Control-Allow-Credentials

  该字段与简单请求时的含义相同。

  （4）Access-Control-Max-Age

  该字段可选，用来指定本次预检请求的有效期，单位为秒。上面结果中，有效期是20天（1728000秒），即允许缓存该条回应1728000秒（即20天），在此期间，不用发出另一条预检请求。

  （5）Access-Control-Allow-Origin

  该字段是必须的。它的值要么是请求时Origin字段的值，要么是一个*，表示接受任意域名的请求。

  一旦服务器通过了"预检"请求，以后每次浏览器正常的CORS请求，就都跟简单请求一样。此时的相应值也和简单请求相似。



