
//关闭按钮功能
var u = navigator.userAgent.toLowerCase();
var isApple = /(iphone|ipad|ipod|ios)/i.test(u);
var isAndroid = /android/i.test(u);
function closeBtn(iswap) {
  if(iswap == 'iswap'){
    history.go(0);
  }else {
    var u = navigator.userAgent.toLowerCase();
    if(isApple){
      //apple终端
      window.location = 'close://';
    }else if(isAndroid){
      //安卓终端
      if(window.AndroidBridge){
        window.AndroidBridge.close();
      }
    }
  }
}
/*-------------------------*/
function getUrlParam(name) {
  var reg = new RegExp("(^|&|#)" + name + "=([^&]*)(&|$)");
  // var r = window.location.search.substr(1).match(reg);
  var r = window.location.hash;   //拿到'#' 后面的参数
  var xr = '&' + r.substr(1);
  var l = window.location.search;  //拿到url后面的参数，但是不能拿到'#'后面的参数
  var lr = l + xr;    //拼接到一块
  var xlr = lr.substr(1).match(reg);
  if (xlr != null) return decodeURIComponent(xlr[2]);
  return null;
}
function GetRequest() {
  var url = location.search; //获取url中"?"符后的字串
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    strs = str.split("&");
    for ( var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}
