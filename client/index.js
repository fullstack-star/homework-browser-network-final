import Notify from "./Notify.js";
import { ajax, retry } from "./util.js";

const elm_choice = document.getElementsByClassName("j-choice")[0],
	elm_operate = document.getElementsByClassName("j-operate")[0];
const formdata = new FormData();
formdata.append("value", "let me fly");

const config = {
	url: ["http://127.0.0.1:3000/api/nocors", "http://127.0.0.1:3000/api/cors"],
	choices: {
		client: true,
		server: true,
		reconnect: false
	},
	fetchOpt: [
		{
			body: formdata,
			method: "POST" // *GET, POST, PUT, DELETE, etc.
		},
		{
			body: formdata,
			credentials: "include", // include, same-origin, *omit
			// headers: { "x-my-magic": 12345 },
			method: "POST",
			mode: "cors" // no-cors, *cors, same-origin
		}
	],
	ajaxOpt: [
		{ method: "POST", data: formdata },
		{ method: "POST", data: formdata, withCredentials: true }
	]
};

// 设置初始cookie值
const data = new Date();
document.cookie =
	"client=" +
	data.getHours() +
	":" +
	data.getMinutes() +
	":" +
	data.getSeconds() +
	";expires=" +
	new Date();

// 点击按钮
elm_operate.addEventListener("click", e => {
	const tg = e.target;
	if (!tg.dataset.type) return;

	switch (tg.dataset.type) {
		case "xhr":
			retry(function(next) {
				tg.classList.add("z-pedding", "z-disabled");
				tg.disabled = true;
				ajax(
					config.url[config.choices.server + 0],
					config.ajaxOpt[config.choices.client + 0]
				)
					.then(res => JSON.parse(res))
					.then(json => {
						tg.classList.remove("z-pedding", "z-disabled");
						tg.disabled = false;
						Notify.show("ajax请求成功！");
					})
					.catch(err => {
						next(() => {
							Notify.show("ajax请求失败！");
							tg.classList.remove("z-pedding", "z-disabled");
							tg.disabled = false;
						});
					});
			});
			break;
		case "fetch":
			retry(function(next) {
				tg.classList.add("z-pedding", "z-disabled");
				tg.disabled = true;
				fetch(
					config.url[config.choices.server + 0],
					config.fetchOpt[config.choices.client + 0]
				)
					.then(res => res.json())
					.then(json => {
						tg.classList.remove("z-pedding", "z-disabled");
						tg.disabled = false;
						Notify.show("fetch请求成功！");
					})
					.catch(err => {
						next(() => {
							Notify.show("ajax请求失败！");
							tg.classList.remove("z-pedding", "z-disabled");
							tg.disabled = false;
						});
					});
			});
			break;
	}
});

// 点选设置
elm_choice.addEventListener("change", e => {
	const tg = e.target;

	if (!tg.dataset.type) return;
	config.choices[tg.dataset.type] = tg.checked;
});
