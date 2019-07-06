// HTTP 请求失败后，重试代码
let intervals = [1, 10, 60]
const reConnect = async function(func, index=0, intervals) {
    try {
        await func()
    } catch(err) {
        if (index < 0) return
        setTimeout(() => {
        reConnect(func, ++index)
        }, intervals[index])
    }
}

const tryConnect = function() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
        reject('error')
        }, 1000)
    })
}

reConnect(tryConnect)
  