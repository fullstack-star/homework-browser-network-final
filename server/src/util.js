const querystring = require("querystring");

exports.requestParse =
	// 解析req
	function(req) {
		const [host, port] = req.headers.host.split(":");
		const urlObj =
			req.url.indexOf("?") === -1 ? [req.url, null] : req.url.split("?");
		const urlPath = /.+\/$/.test(urlObj[0])
			? urlObj[0].substr(0, urlObj[0].length - 1)
			: urlObj[0];
		const urlQuery = urlObj[1] === null ? {} : querystring.parse(urlObj[1]);
		return {
			method: req.headers.method,
			host: host[0],
			port: port[1] || 80,
			path: urlPath,
			query: urlQuery,
			cookie: req.headers.cookie
		};
	};
