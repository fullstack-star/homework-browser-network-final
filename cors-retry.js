((function() {
    'use strict';

    // CORS 跨域请求带上 cookie
    function corsWithCooies(url) {
        var corsWithCooiesHttp = new XMLHttpRequest();
        corsWithCooiesHttp.open('GET', url);
        corsWithCooiesHttp.withCredentials = true;
        corsWithCooiesHttp.onreadystatechange = function() {
            if (corsWithCooiesHttp.readyState == 4 && corsWithCooiesHttp.status == 200) {
                console.log(corsWithCooiesHttp.responseText);
            }
        };
        corsWithCooiesHttp.send();
    }

    /**
     * retry 写⼀段让 http 请求失败后重试的代码
     * @desc 必须返回一个承诺
     * @param  {Function} func        重试函数
     * @param  {Number} [times=10]    最多重试次数
     * @param  {Number} [timeout=100] 延迟重试时间
     * @return {Function}             function
     */
    function retry(func, times = 10, timeout = 100) {
        return function(...args) {
            return new Promise((resolve, reject) => {
                function tryFunc(...args) {
                    Promise.resolve()
                        .then(() => func.apply(this, args))
                        .then(result => resolve(result))
                        .catch(error => {
                            times--;
                            if (times > 0) {
                                setTimeout(() => tryFunc.apply(this, args), timeout);
                            } else {
                                reject(error);
                            }
                        });
                }

                tryFunc.apply(this, args);
            });
        }
    }

    var times = 0;

    function test(text) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log(text);

                times++;
                if (times < 5) {
                    reject('failed');
                } else {
                    resolve('success');
                }
            }, 500)
        })
    }

    var testRetry = retry(test, 4, 100);

    testRetry('try')
        .then(data => console.log(data))
        .catch(error => console.error('all retries failed'));


})())