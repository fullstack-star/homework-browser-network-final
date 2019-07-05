var xhrWithCookies = new XMLHttpRequest();
xhrWithCookies.open('GET', url);
xhrWithCookies.withCredentials = true;
xhrWithCookies.send();




/**
 * 包裹方法，使其自动错误重试
 * 只能包裹返回Promise的方法
 * 返回promise，可以获取成功的返回值，或最后失败的err
 * 需要运行环境支持ES6的Promise语法，或者使用Bluebird库
 * @param func
 * @param retryMax
 * @returns {funcR}
 */

function autoRetry(func, retryMax) {
  retryNum = 0;
  let funcName = func.toString().match(/function (\w+)\(/)[1];
  return funcR = function () {
    let params = arguments;
    return new Promise((resolve, reject) => {
      func(...params).then(result => {
        resolve(result);
      }).catch(err => {
        if (retryNum < retryMax) {
          retryNum ++;
          console.warn(`[autoRetry] Catched error when ${funcName}() : ${err.message}. Retry ${retryNum} time...`);
          resolve(funcR(...params));
        } else {
          reject(err);
        }
      });
    });
  };
}


function test (param) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try{
        JSON.parse('{{'); // 执行到这里会报错
        return resolve(param);
      } catch (err) {
        return reject(err);
      }
    }, 1000);
  })
}


test = autoRetry(test,3);

(async function(){
    try{
        let result = await test(123);
    }catch (e) {
        console.log(e);
    }
})();

