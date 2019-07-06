const test = {
  getSource () {
    Service.get('/source').then(res => {
      console.log(res)
    })
    .catch(err => console.log(err))
  }
};

class Service {
  // 请求次数和请求间隔
  static timeGaps = [1, 10, 60];
  // 用于记录正在重试的函数和当前函数的时间间隔
  static requestGaps = {};
  // 待重新请求接口集合
  static requestMap = {};

  // 获取数据
  static get(path) {
    // 保存整个请求
    this.requestMap[path] = () => {
      return fetch(path)
      .then(res => {
        // 数据请求成功，删除requestMap中的key
        if (res.ok) return res.json();
        this.clearRequestMap(path);
      })
      .catch(err => {
        if (err.toString().indexOf('timeout') !== -1) {
          // 网络故障，呼叫控制器进行断网重试
          this.retryControl(path);
        } else {
          console.log(err)
        }
      })
    }
    return this.requestMap[path]();
  }

  // 重试控制
  static retryControl(name) {
    const self = this
    let preIndex = self.requestGaps[name] || 0
    const timeGap = self.timeGaps[preIndex]
    if (timeGap) {
      self.requestGaps[name] = ++preIndex;
      setTimeout(() => {
        // 重新发送请求，清除时直接跳过
        self.requestMap[name] && self.requestMap[name]();
      }, 1000 * timeGap);
    } else {
      // 超过请求次数，不再请求
      self.clearRequestMap(name);
      alert('请检查网络')
    }
  }

  static clearRequestMap(name) {
    delete this.requestMap[name]
    delete this.requestGaps[name]
  }
}