var http = require("http");
 http.createServer(function (req, res) {
    console.log(req.headers.cookie)
    res.writeHead(200, {
        'Set-Cookie': 'myName=tangwenping',
        "Access-Control-Allow-Origin": "http://127.0.0.1:5500",
        "Access-Control-Allow-Methods": "GET, POST",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Credentials": "true" // 此配置为true时,Access-Control-Allow-Origin不能为*
    });
    res.write(JSON.stringify({name: 'tangwenping'}));
    res.end();
}).listen(8089);

 console.log("server listening on port：8089"); 