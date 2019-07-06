/**
 * 简单设置node的CORS
 */
let http = require("http");

/**
* CORS 相关响应头部
*
* 1. Access-Control-Allow-Origin: <origin> | *  origin 指定了允许访问的资源的外部url，对于不需要携带身份凭证(credentials)的请求，可以设置为*
* 2. Access-Control-Expose-Headers: X-My-Custom-Header 跨域访问的时候，XMLHttpRequest对象的getResponseHeader()只能拿到基本的头信息，如果需要访问其他头部，
*  就需要设置该响应头。
* 3. Access-Control-Max-Age: <delta-seconds> 指定 preflight 请求的结果能够被缓存多久。
* 4. Access-Control-Allow-Credentials: true 指定当浏览器的 credentials 设置为 true 时，是否允许浏览器读取 response 的内容。当使用 preflight 预检查请求
*  的响应中时，它指定了实际的请求中是否可以使用 credentials 。
* 5. Access-Control-Allow-Methods: <method>[,<method>]* 首部字段用于预检请求的响应。其指明了实际请求所允许使用的 http 方法。
* 6. Access-Control-Allow-Headers: <field-name>[,<field-name>]* 首部字段用于预检请求的响应。其指明了实际请求所允许携带的首部字段。
*
*
* 预检查是个什么鬼？
*
*  对那些可能对服务器数据产生副作用的 HTTP 请求方法（特别是 GET 以外的 HTTP 请求，
*  或者搭配某些 MIME 类型的 POST 请求），浏览器必须首先使用 OPTIONS 方法发起一个预检请求（preflight request）
*  从而获知服务端是否允许该跨域请求。
*/

http.createServer(function (req, res) {

    let postData = ''
    req.setEncoding('utf8');

    // 设置CORS
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8081') // 设置允许指定域名跨越请求
    res.setHeader('Access-Control-Allow-Credentials', true) // 设置允许带 cookie

　　req.on('data',function(chunk){
　　　　postData+=chunk;
　　});

　　req.on('end',function(){
      // 超时测试
      // setTimeout(() => {
 　   // 　res.end(`hello @@: ${postData}`);
      // }, 2000)
　　　res.end(`hello @@: ${postData}`);
　　});

}).listen(8888);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');
