// 把两个作业混一起写了
var count = 0,
  maxCount = 5,
  interval = 2000,
  url = 'https://baidu.com'

function request() {
  count++
  if (count < maxCount) {    
    // 发送一个带有cookie的CORS请求, fetch形式
    fetch(url, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include' // 为了让浏览器发送包含凭证的请求，需要设置fetch请求的此字段为include, 如果只想在请求URL与调用fetch位于同源时才发送凭证，则设置为same-origin
    }).then((response) => {
      console.log(response.ok)
    }).catch(() => {
      console.log(`请求失败，${interval/1000}秒后重试第${count}次`)
      setTimeout(() => {
        request()
      }, interval)
    })
  } else {
    console.log(`重试${count}次失败，请重新刷新页面`)
  }
}
request()

// 发送一个带有cookie的CORS请求, xhr形式
var xhr = new XMLHttpRequest();
function callOtherDomain() {
  if (xhr) {
    xhr.open('GET', url, true);
    xhr.withCredentials = true; // 需设置此字段才能使CORS请求携带cookie
    // xhr.onreadystatechange = handler;
    xhr.send();
  }
}
// 后端也需要设置Access-Control-Allow-Credentials: true才能返回成功
