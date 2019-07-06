// jQuery(ajax)
$.ajax({
  url: "https://www.baidu.com",
  type: "get",
  crossDomain: true,
  xhrFields: {
    withCredentials: true
  },
  success: function (data) {
  },
  error: function (r) {
  }
});
// fetch
fetch("https://www.baidu.com", {
  method: 'GET',
  credentials: "include"
})