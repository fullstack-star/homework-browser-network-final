const axios = require('axios')
const qs = require('qs')
const exceptionArr = []
const getElTimesFromExceptionArr =  (key) => { 
  return exceptionArr.reduce((prev, next) => { 
      prev[next] = (prev[next] + 1) || 1; 
      return prev; 
  },{})[key]
}

const pushFromExceptionArr = (item) => {
  exceptionArr.push(item)
}

const removeElFromExceptionArr = (el) => {
  const tmp = []
  exceptionArr.map(item => {
    if (item != el) {
      tmp.push(item)
    }
  })

  exceptionArr = tmp
}

const http = function (url, params, methods = 'get', isFormType = false) {
  let config = {}
  let opts = {
    params: params
  }

  if (methods == 'post') {
    if (!isFormType) {
      opts = qs.stringify(params)
    } else {
      opts = params
    }
  }

  let instance = axios.create({
    withCredentials: true // 开启允许携带cookie
  })

  return new Promise((resolve, reject) => {
    instance[methods](url, opts, config).then((res) => {
      let data = res.data
      let code = parseInt(data.code)
      if (code === 0) {
        resolve(data.data)
      } else {
        reject(data)
      }

      // 服务器恢复，清空异常数组里面存放url
      removeElFromExceptionArr(url)
    }).catch((res) => {
      // 检测失败次数
      let exceptTimes = parseInt(getElTimesFromExceptionArr(url) || 1)

      // 失败5次则终止该url进行失败请求
      if (exceptTimes >= 5) {
        window.alert('网络异常')
        return false
      }
 
      // 存放失败的url接口地址
      pushFromExceptionArr(url)
    
      // 失败次数越多，延长时间请求
      setTimeout(() => {
        http(url, params, methods, isFormType)
      }, exceptTimes * 3000);
    })
  })
}

const post = (url, params, config= {
  isFormType: false,
  openLoading: true
}) => {
  let {isFormType, openLoading} = config

  return new Promise((resolve, reject) => {
    http(url, params, 'post', isFormType, openLoading).then(res => {
      resolve(res)
    }).catch(res => {
      reject(res)
    })
  })
}

const get = (url, params, config= {
  isFormType: false,
  openLoading: true
}) => {
  let {isFormType, openLoading} = config

  return new Promise((resolve, reject) => {
    http(url, params, 'get', isFormType, openLoading).then(res => {
      resolve(res)
    }).catch(res => {
      reject(res)
    })
  })
}

export {http, post, get}
