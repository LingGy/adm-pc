var userInfoStr=$.cookie("uid");

//如果获取不到cookie，说明没有登录过，跳转到登录页面
if(!userInfoStr){
    location.href="login.html";
}