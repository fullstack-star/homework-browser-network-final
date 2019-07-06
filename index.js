// 写⼀段代码让 CORS 跨域请求带上 cookie
const ajax = function(url, method, withCredentials) {
  const xhr = XMLHttpRequest ? new XMLHttpRequest() : new window.ActiveXObject('Microsoft.XMLHttp')
  xhr.open(method, url, true)
  xhr.withCredentials = withCredentials
  xhr.onload = function() {
    if (xhr.status === 200 || xhr.status === 206 || xhr.status === 304) {
      console.log(xhr.responseText)
    }
  }
  xhr.send()
}

// 写⼀段让 http 请求失败后重试的代码
const reTry = async function(func, count=3, timeInterval=1000) {
  try {
    await func()
  } catch(err) {
    if (count <= 0) return
    console.log(err, count)
    setTimeout(() => {
      reTry(func, --count)
    }, timeInterval)
  }
}

const testFunc = function() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('error')
    }, 300)
  })
}

reTry(testFunc)
