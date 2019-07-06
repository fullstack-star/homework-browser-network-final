//cors带cookie
const ajaxWitchCookie = (url, method) => {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  xhr.withCredentials = true;
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      console.log(xhr.responseText);
    }
  };
  xhr.send();
};
//http失败重试
const httpRetry = async (fn, args, times, count = 0) => {
  try {
    const res = await fn(args);
    //拿到正确结果
    console.log(res);
  } catch (err) {
    if (count >= times) {
      //重试times次后，失败退出
      console.log(`重连${times}次都失败，请检查网络`);
      return;
    }
    setTimeout(() => {
      console.log(err, count);
      httpRetry(fn, args, times, ++count);
    }, 1000 * count * count);
  }
};

function httpFn() {
  return fetch(arguments[0].url, arguments[0]);
}

httpRetry(httpFn, { url: 'https://xx.com/', method: 'get' }, 3);
