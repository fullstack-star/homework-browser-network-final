const http = require("http");
const route = require("./route.js");
const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
	route(req, res);
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});

// console.log(`入口文件夹绝对路径,${__dirname}`);
// console.log(`当前模块文件名,${__filename}`);
// console.log(`启动服务的路径,${process.cwd()}`);
