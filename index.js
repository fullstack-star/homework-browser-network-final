// CORS 带上 cookie
function getData(url) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.withCredentials = true;
  xhr.send();
}

// http请求失败后重试
async function reconnect(func, interval, frequency) {
  try {
    await func();
  } catch {
    if (frequency > 0 ) {
      frequency -= 1;
      setTimeout(function() {
        reconnect(func, interval, frequency);
      }, interval);
    }
  }
}
