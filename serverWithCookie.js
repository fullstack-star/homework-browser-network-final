var http = require("http");

http.createServer(function (request,response) {
	response.writeHead(200, {
		"Access-Control-Allow-Origin": "http://127.0.0.1:8088",
		"Access-Control-Allow-Methods": "GET, POST, PUT",
		"Access-Control-Allow-Headers": "X-Test-Cors",
        "Access-Control-Max-Age": "180",
        "Access-Control-Allow-Credentials": "true",
		"Content-Type": "text/html;charset=utf-8"
	});
	response.write("<html><body><h1>cors跨域</h1></body></html>");
    response.end();
}).listen(8087);

console.log("server listening on port：8087");
