# 列举 CORS 的头信息，并说明用途

## Origin

这个头部信息，属于请求数据的一部分。这个值表明这个请求是从浏览器打开的哪个域名下发出的。出于安全原因，浏览器不允许你修改这个值。


## Access-Control-Allow-Origin

这个头部信息由服务器返回，用来明确指定那些客户端的域名允许访问这个资源。


## Access-Control-Allow-Methods

一个逗号分隔的列表，表明服务器支持的请求类型（比如：GET, POST）

## Access-Control-Expose-Headers

相似的，这个返回信息里包含了一组头部信息，这些信息表示那些客户端可以使用。其他没有在里面的头部信息将会被限制。

## Access-Control-Allow-Headers

提供一个逗号分隔的列表表示服务器支持的请求数据类型。假如你使用自定义头部(比如：x-authentication-token 服务器需要在返回OPTIONS请求时，要把这个值放到这个头部里，否则请求会被阻止)。


## Access-Control-Allow-Credentials

这个头部信息只会在服务器支持通过cookies传递验证信息的返回数据里。它的值只有一个就是 true。跨站点带验证信息时，服务器必须要争取设置这个值，服务器才能获取到用户的cookie。


## 参考文献

https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS
