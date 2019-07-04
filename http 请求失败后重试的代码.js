const api = {
  fetchData() {
    return fetch("/source").then(res => {
      if (res.ok) return res.json();
    });
  }
};

class Service {
  // 请求次数和请求间隔
  static timeGaps = [1, 10, 60];
  // 用于记录正在重试的函数和当前函数的时间间隔
  static requestMap = {};

  // 获取数据
  static getResource() {
    const funcName = "getResource";

    api
      .fetchData()
      .then(res => {
        // handle response data here...

        // 数据请求成功，删除requestMap中的key
        this.clearRequestMap(funcName);
      })
      .catch(err => {
        // 网络故障，呼叫控制器进行断网重试
        this.retryControl(funcName);
      });
  }

  // 请求数据函数的控制函数，控制重试时机
  static retryControl(name) {
    let index = this.timeGaps.indexOf(this.requestMap[name]);
    if (index < this.timeGaps.length - 1) {
      index += 1;
      this.requestMap[name] = this.timeGaps[index];
      setTimeout(() => {
        // 重新发送请求，这里暂不考虑传参的问题
        this[name]();
      }, 1000 * this.timeGaps[index]);
    } else {
      // 超过请求次数，不再请求
      this.clearRequestMap(name);
      alert('请检查网络')
    }
  }

  static clearRequestMap(name) {
    this.requestMap[name] = undefined;
  }
}
