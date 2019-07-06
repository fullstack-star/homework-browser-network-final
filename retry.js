/**
 * retry   http 请求失败后重试的代码
 * @param  {Function} func        重试函数
 * @param  {Number} [times=3]     最多重试次数
 * @param  {Number} [timeout=800] 延迟重试时间
 * @return {Function}             function
 */
const reTry = async function (func, times = 3, timeout = 1000) {
    try {
        await func()
    } catch (err) {
        if (times <= 0) return

        setTimeout(() => {
            reTry(func, --times)
        }, timeout)
    }
}

const testFunc = function () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('error')
        }, 300)
    })
}

reTry(testFunc)