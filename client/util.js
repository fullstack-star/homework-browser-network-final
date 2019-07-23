/* xhr */
export function ajax(url, options) {
	const defoptions = {
		method: "GET",
		async: true
	};
	options = Object.assign({}, defoptions, options);
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.onreadystatechange = () => {
			// readyState说明：0 未初始化，1 启动，2 发送，3 接收，4 完成
			if (xhr.readyState != 4) return;
			// status参见http状态码
			if ((200 <= xhr.status && xhr.status < 300) || xhr.status == 304) {
				resolve(xhr.responseText);
			} else {
				reject({
					code: xhr.status,
					message: xhr.statusText
				});
			}
		};
		xhr.open(options.method, url, options.async);
		xhr.withCredentials = options.withCredentials || false;
		xhr.send(options.data || null);
	});
}
/* 重连 */
export function retry(handler) {
	let count = 0;
	let timeid = null;
	const maxCount = 3;
	const seconds = 1000;

	function next(cb) {
		clearTimeout(timeid);
		if (count >= maxCount) {
			cb();
			return;
		}
		timeid = setTimeout(handler, seconds * count, next);
		count++;
	}
	next(null);
}
