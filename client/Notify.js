export default new (class Notify {
	constructor() {
		this.element = null;
		this.status = 0; // 0收起，1显示
		this.message = "";
		this.time = null;
		// bind
		this.render = this.render.bind(this);
		this.hide = this.hide.bind(this);
		this.parseElement = this.parseElement.bind(this);
	}
	show(content) {
		this.message = content;
		this.status = 1;
		this.render();
	}
	hide() {
		this.status = 0;
		this.element.classList.remove("z-show");
	}
	parseElement(tpl) {
		const elm = document.createElement("div");
		elm.innerHTML = tpl;
		return elm.children[0];
	}
	render() {
		this.tpl = `
		<div id="notify" class="m-notify ${this.status ? "z-show" : ""}">
			<div class="m-notify__inner">
				${this.message}
			</div>
		</div>
		`;
		// 更新节点和实例内容
		if (this.element) this.element.remove();
		this.element = this.parseElement(this.tpl);
		document.body.appendChild(this.element);
		if (this.status) {
			clearTimeout(this.time);
			this.time = setTimeout(this.hide, 2000);
		}
	}
})();
