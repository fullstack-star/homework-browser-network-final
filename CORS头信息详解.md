# CORS常见头部信息

> 跨域资源共享(CORS) 是一种机制，它使用**额外的 HTTP 头**(本文的主题)来告诉浏览器,让运行在一个 origin (domain) 上的Web应用被准许访问来自不同源服务器上的指定的资源。

### 简单请求与复杂请求

跨域资源共享标准新增了一组 HTTP 首部字段，允许服务器声明哪些源站通过浏览器有权限访问哪些资源。另外，规范要求，对那些可能对服务器数据产生副作用的 HTTP 请求方法（特别是 GET 以外的 HTTP 请求，或者搭配某些 MIME 类型的 POST 请求），浏览器必须首先使用 OPTIONS 方法发起一个预检请求（preflight request），从而获知服务端是否允许该跨域请求。服务器确认允许之后，才发起实际的 HTTP 请求。

1.请求**满足所有下述条件**，则该请求可视为“简单请求”：

* 使用下列方法之一：
	* GET
	* HEAD
	* POST
* 头部字段不得出现下述列表以外的内容：
	* Accept
	* Accept-Language
	* Content-Language
	* Content-Type（使用的时候有如下限制）
* Content-Type的值仅限下列三者之一：
	* text/plain
	* multipart/form-data
	* application/x-www-form-urlencoded

简单请求示例
<img src = "./imgs/simple_req.png">

2.请求**满足下述任一条件**时则为复杂请求（发送实际请求之前需要发送一个预检 OPTIONS 请求）：

* 使用下面任一 HTTP 方法：
	* PUT
	* DELETE
	* CONNECT
	* OPTIONS
	* TRACE
	* PATCH
* 人为设置了**上述简单请求的安全头部字段以外**的字段
	* Accept
	* Accept-Language
	* Content-Language
	* Content-Type（使用的时候有如下限制）
* Content-Type 的值**不属于**下列之一:
	* text/plain
	* multipart/form-data
	* application/x-www-form-urlencoded

复杂请求示例
<img src = "./imgs/prelight.png">

## HTTP预检请求（OPTIONS）首部字段

* Origin: `<origin>`
>Origin 首部字段表明预检请求或实际请求的源站，其参数的值为源站 URI。它**不包含任何具体路径信息**，只是服务器名称。
> 注意，不管是否为跨域请求，ORIGIN 字段总是被发送。

* Access-Control-Request-Method: `<method>`
>Access-Control-Request-Method 首部字段用于预检请求。其作用是，将实际请求所使用的 HTTP 方法告诉服务器。
	
* Access-Control-Request-Headers: `<field-name>[, <field-name>]*`
>Access-Control-Request-Headers 首部字段用于预检请求。其作用是，将实际请求所携带的首部字段告诉服务器。
	
## HTTP 响应首部字段

* Access-Control-Allow-Origin: `<origin> | *`
>origin 参数的值指定了允许访问该资源的外域 URI。对于不需要携带身份凭证的请求，服务器可以指定该字段的值为通配符，表示允许来自所有域的请求。
	
* Access-Control-Expose-Headers: `X-My-Custom-Header, X-Another-Custom-Header`
>Access-Control-Expose-Headers 头让服务器把允许浏览器访问的头放入白名单。
在跨域访问时，XMLHttpRequest对象的getResponseHeader()方法只能拿到一些最基本的响应头，Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma，如果要访问其他头，则需要服务器设置本响应头。
	
* Access-Control-Max-Age: `<delta-seconds>`
>Access-Control-Max-Age 头指定了preflight请求的结果能够被缓存多久，delta-seconds 参数表示preflight请求的结果在多少秒内有效。

* Access-Control-Allow-Credentials: `true`
>Access-Control-Allow-Credentials 头指定了当浏览器的credentials设置为true时是否允许浏览器读取response的内容。当用在对preflight预检测请求的响应中时，它指定了实际的请求是否可以使用credentials。请注意：简单 GET 请求不会被预检；如果对此类请求的响应中不包含该字段，这个响应将被忽略掉，并且浏览器也不会将相应内容返回给网页。

* Access-Control-Allow-Methods: `<method>[, <method>]*`
>Access-Control-Allow-Methods 首部字段用于预检请求的响应。其指明了实际请求所允许使用的 HTTP 方法。

* Access-Control-Allow-Headers: `<field-name>[, <field-name>]*`
>Access-Control-Allow-Headers 首部字段用于预检请求的响应。其指明了实际请求中允许携带的首部字段。

##加餐：附带身份凭证的请求
对于跨域 XMLHttpRequest 或 Fetch 请求，浏览器不会发送**身份凭证信息（cookie）**。如果要发送凭证信息，需要设置 XMLHttpRequest 的某个特殊标志位（withCredentials）。

```
var invocation = new XMLHttpRequest();
var url = 'http://bar.other/resources/credentialed-content/';
    
function callOtherDomain(){
  if(invocation) {
    invocation.open('GET', url, true);
    invocation.withCredentials = true; // <- 关键代码
    invocation.onreadystatechange = handler;
    invocation.send(); 
  }
}
```
将 XMLHttpRequest 的 withCredentials 标志设置为 true，从而向服务器发送 Cookies。因为这是一个简单 GET 请求，所以浏览器不会对其发起“预检请求”。但是，**如果服务器端的响应中未携带 Access-Control-Allow-Credentials: true ，浏览器将不会把响应内容返回给请求的发送者。**

<img src="./imgs/cred-req.png">

> ###附带身份凭证的请求与通配符
> 对于附带身份凭证的请求，服务器不得设置 Access-Control-Allow-Origin 的值为“*”。

>这是因为请求的首部中携带了 Cookie 信息，如果 Access-Control-Allow-Origin 的值为“*”，请求将会失败。而将 Access-Control-Allow-Origin 的值设置为 http://foo.example，则请求将成功执行。

>另外，响应首部中也携带了 Set-Cookie 字段，尝试对 Cookie 进行修改。如果操作失败，将会抛出异常。


## 参考
* [HTTP访问控制（CORS）](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS#参见)