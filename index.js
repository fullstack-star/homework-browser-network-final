//跨域请求带上 cookie
var invocation = new XMLHttpRequest();
var url = 'http://bar.other/resources/public-data/';
   
function callOtherDomain() {
  if(invocation) {    
    invocation.open('GET', url, true);
    invocation.onreadystatechange = handler;
    invocation.withCredentials = true;
    invocation.send(); 
  }
}

//http请求失败后重试
var n = 10;
function ajaxPost ( url , data , fnSucceed , fnFail , fnLoading ) {
    var ajax = ajaxObject();
    ajax.open( "post" , url , true );
    ajax.setRequestHeader( "Content-Type" , "application/x-www-form-urlencoded" );
    ajax.onreadystatechange = function () {
        if( ajax.readyState == 4 ) {
            if( ajax.status == 200 ) {
                fnSucceed( ajax.responseText );
            }
            else {
                fnFail( "HTTP请求错误！错误码："+ajax.status );
                if(n > 0){
               		 // 异常，重试
               		n --;
                	ajaxPost(( url , data , fnSucceed , fnFail , fnLoading ))
                }
            }
        }
        else {
            fnLoading();
        }
    }
    ajax.send( data );
 
}