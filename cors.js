// 带上cookie，失败后重选请求
function fetchData(url, method) {
  let i = 1
  return function request(url, method) {
    fetch(url, {
      method: method,
      credentials: 'include'  
    })
    .then(res => res.json())
    .catch(err => {
      if (++i <= 5) {
        return request(url, method)
      }
      console.log('done')
    })
  }()
}