# 跨域携带Cookie

## 服务端设置

```text
Access-Control-Allow-Origin: * // 授权的访问源
Access-Control-Allow-Credentials: true // 是否允许携带 Cookie
Access-Control-Allow-Methods: GET,PUT,POST,DELETE,OPTIONS // 允许的请求动词
Access-Control-Allow-Headers:Authorization,Content-Type,Accept,Origin,User-Agent,DNT,Cache-Control,X-Mx-ReqToken,X-Data-Type,X-Requested-With // 额外允许携带的请求头
```

## 浏览器请求设置

```Javascript
var xmlhttp = new XMLHttpRequest() 

xmlhttp.withCredentials = true;

/*
* open（method，url，async）
* method:请求方法GET或POST
* url：服务器的地址
* async :表示异步请求，可以不写，默认是True
*/
xmlhttp.open("GET", "/ajax_API_test_path", true);

xmlhttp.send(null)

xmlhttp.onreadystatechange = function() { 
  if (xmlhttp.readyState === 4 && xmlhttp.status === 200){ 
  // success
  } 
}
```

