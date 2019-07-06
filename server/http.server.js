var http = require('http');
var count = 0;
http.createServer((req, res) => {
    if (++count % 2 === 0) {
        // 成功请求DEMO
        var Cookies = {};
        if (req.headers.cookie != null) {
            req.headers.cookie.split(';').forEach(item => {
                var parts = item.split('=');
                Cookies[parts.shift().trim()] = (parts.join('=') || '').trim();
            });
        }
        console.log(JSON.stringify(Cookies)); // 打印前端发送cookie
        res.writeHead(200, {
            'content-type': 'text/plain',
            'Access-Control-Allow-Origin': 'http://192.168.1.105:8889',
            'Access-Control-Allow-Method': 'GET,POST',
            'Access-Control-Allow-Headers': 'x-test', // 使用自定义头信息时，此行代码不可缺失，否则会出现跨域问题
            'Access-Control-Allow-Credentials': true // 跨域请求携带cookie时，此行代码不可缺失
        });
        res.end('hello world');
    } else {
        // 失败请求DEMO
        res.writeHead(501, {
            'content-type': 'text/plain',
            'Access-Control-Allow-Origin': 'http://192.168.1.105:8889',
            'Access-Control-Allow-Method': 'GET,POST',
            'Access-Control-Allow-Headers': 'x-test', // 使用自定义头信息时，此行代码不可缺失，否则会出现跨域问题
            'Access-Control-Allow-Credentials': true // 跨域请求携带cookie时，此行代码不可缺失
        });
        res.end('server error');
    }
}).listen(8888, '192.168.1.105');

console.log("server started");