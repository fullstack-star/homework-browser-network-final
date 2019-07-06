# homework-browser-network-final

## 列举 CORS 的头信息，并说明用途：
### 1、简单请求（响应头）
####（）Access-Control-Allow-Origin
该字段是必须的。它的值要么是请求时Orgin字段的值，要么是 * ，表示接受任意域名的请求。
####（2）Access-Control-Allow-Credentials
该字段可选。它的值是布尔值，表示是否允许浏览器发送cookie。默认情况下，Cookie不包括在CORS请求中。设置为true，即表示服务器明确许可，Cookie包含在请求中，一起发送给服务器。这个值也只能设为true，如果服务器不要浏览器发送Cookie，删除该字段即可。
####（3）Access-Control-Expose-Headers
该字段可选。CORS请求时，XMLHTTPRequest对象getResponseHeader()方法只能拿到6个基本字段：Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma。如果想拿到其他字段，就必须Access-Control-Expose-Headers里面指定。

### 2、非简单请求
### 预检请求
#### 1）请求头
- **Access-Control-Request-Method**
该字段是必须的。用来列出浏览器CORS请求会用到哪些HTTP方法，比如PUT。
- **Access-Control-Request-Headers**
该字段是一个逗号分隔的字符串，指定浏览器CORS请求会额外发送的头信息字段。

#### 2）响应头
- **Access-Control-Allow-Origin**
该字段是必须的。含义同简单请求一样。
- **Access-Control-Allow-Methods**
该字段必须的。它的值是逗号分隔的字符串，表示服务器支持的所有跨域请求的方法。注意：返回的是所有支持的方法，而不单是浏览器请求的那个方法，这是为了避免多次“预检”请求。
- **Access-Control-Allow-Headers**
如果浏览器请求包括Access-Control-Request-Headers字段，则Access-Control-Allow-Headers字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段，不限于浏览器在“预检”中请求的字段。
- **Access-Control-Allow-Credentials**
该字段可选。含义同简单请求一样。
- **Access-Control-Max-Age**
该字段可选。用来指定本次预检请求的有效期，单位秒。在有效时间内，不用发出另一条预检请求。