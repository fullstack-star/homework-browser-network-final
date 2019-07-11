// 写一段代码让CORS跨域请求带上cookie
// 引入axios，通过伪代码实现
import axios from 'axios'
// 创建axios实例
const service = axios.create({
  withCredentials: true, // 请求会带上cookie
  timeout: 5000, // 请求超时时间
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
})
// 添加一个请求时的loading动画
let loadingTimer = null
const loading = show => {
  if (show) {
    // showLoading() 显示loading动画
  } else {
    // hideLoading() 隐藏loading动画
  }
}
// request拦截器
service.interceptors.request.use(
  config => {
    if (loadingTimer) clearTimeout(loadingTimer)
    loadingTimer = setTimeout(() => {
      loading(true)
    }, 300)
    return config
  },
  error => {
    // Do something with request error
    console.error(error)
    Promise.reject(error)
    // 如果需要也可以在此处添加请求发送前失败重试的code
  }
)

// 写一段让http请求失败后重试的代码
axios.defaults.retry = 3; // 最多额外重试3次
axios.defaults.retryDelay = 2000; // 每两秒重试1次
axios.interceptors.response.use(response => {
  if (loadingTimer) clearTimeout(loadingTimer)
  loading(false)
  const res = response.data
  return res
}, error => {
  if (loadingTimer) clearTimeout(loadingTimer)
  loading(false)
  // 关闭loading动画
  var config = error.config;
  if (!config || !config.retry) return Promise.reject(error);
  // 初始化已重试次数
  config.__retryCount = config.__retryCount || 0;
  // 已到达重试次数上限
  if (config.__retryCount >= config.retry) {
    return Promise.reject(error);
  } else {
    config.__retryCount += 1;
  }
  // 延迟一段时间后创建一个新的重试请求
  var backoff = new Promise(resolve => {
    setTimeout(()=>{
      resolve();
    }, config.retryDelay || 1);
  }).then(function() {
    return service(config);
  });
  return backoff
});
export default service
