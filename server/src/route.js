const fs = require("fs");
const path = require("path");
const util = require("./util.js");

module.exports = function(req, res) {
	const parsedReq = util.requestParse(req);

	/* 接口 */
	if (/^\/api/.test(parsedReq.path)) {
		res.statusCode = 200;
		res.setHeader("Content-Type", "application/json");
		switch (parsedReq.path) {
			case "/api/nocors":
				console.log(
					`\n\n+++++ req.headers (${parsedReq.cookie}) +++++\n`,
					req.headers
				);
				res.end(
					JSON.stringify({
						code: 200,
						message: "ok",
						result: {
							value: "服务器没有做cors设置",
							cookie: parsedReq.cookie
						}
					})
				);
				break;
			case "/api/cors":
				console.log(
					`\n\n+++++ req.headers (${parsedReq.cookie}) +++++\n`,
					req.headers
				);
				res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:8080");
				res.setHeader("Access-Control-Allow-Methods", "GET,POST");
				res.setHeader(
					"Access-Control-Allow-Headers",
					"DNT,Origin,Referer,User-Agent,content-type,cookie,x-my-magic"
				);
				res.setHeader("Access-Control-Allow-Credentials", true);
				res.end(
					JSON.stringify({
						code: 200,
						message: "ok",
						result: {
							value: "服务器已做了cors设置",
							cookie: "请求时带上来的cookie值为" + parsedReq.cookie
						}
					})
				);
				break;
			default:
				res.end(
					JSON.stringify({
						code: 404,
						message: "Api Not Found",
						result: null
					})
				);
		}
		return;
	}

	/* 文档 */
	res.statusCode = 404;
	res.setHeader("Content-Type", "text/html");
	res.end("<h1>404 page</h1>");
};
