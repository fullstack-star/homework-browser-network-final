# homework-browser-network-final
### 列举 CORS 头信息，并说明⽤用途
+ Access-Control-Allow-Origin
  - 字段必须
  - 域名
  - * 【 '*' 会和 Access-Control-Allow-Credentials:true 冲突】
+ Access-Control-Allow-Credentials
  - 表示是否允许发送Cookie，默认不开启
+ Access-Control-Expose-Headers
  - 6个基本字段
    + Cache-Control
    + Content-Language
    + Content-Type
    + Expires
    + Last-Modified
    + Pragma

+ Access-Control-Request-Method
  - 服务器支持的所有跨域请求的方法
+ Access-Control-Max-Age
  - 本次预检请求的有效期，单位为秒
### 请求失败重试和cors带cookie代码在http.js