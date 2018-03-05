/**
 * 这是注释的内容
 * Author:lgy
 *   Date:2017/8/31
 */

require.config({
    baseUrl:"src/js",
    paths:{
        jquery:"lib/jquery-2.1.4",
        cookie:"lib/jquery.cookie",
        echarts:"lib/echarts",
        text:"lib/text",
        arttemplate:"lib/template-web",
        //配置tpls
        tpls:"../tpls",
        bootstrap:"../assets/bootstrap/js/bootstrap",
        dateRange:"../assets/pickerDateRange/dateRange",
        pagination:"../assets/JqueryPagination/pagination",
        common:"./common"
    },
    shim:{
        bootstrap:{
            deps:["jquery"]
        }
    }
})

require(["jquery","equipment/list","sales/data","situation/information","trouble/troubleInfo","userManagement/userManagement","lotteryManagement/lotteryManagement","lottery_M_Management/lottery_M_Management","bonus/bonus","cookie","common"],function($,equipmentList,salesData,information,troubleInfo,userManagement,lotteryManagement,lottery_M_Management,bonus){
	checkerror();
	function checkerror() {
		var now = gettime();
		var accesstoken = window.sessionStorage.getItem('accesstoken');
		var uid = $.cookie('uid');
		var cerr = setInterval(function () {
			$.ajax({
			    type:'get',
			    url:api + 'checkerror',
			    data:{
			    	uid:uid,
			    	t:now,
				    accesstoken:accesstoken
			    },
			    success:function(data){
				    var data = JSON.parse(data);
				    if(data.code === 1){
				    	$('#errinfo').css('display','block');
				    }else {
					    $('#errinfo').css('display','none');
				    }
			    }
			})
		},5000)
	}

	function gettime() {
		var start=new Date();
		start.setHours(0);
		start.setMinutes(0);
		start.setSeconds(0);
		start.setMilliseconds(0);
		return Date.parse(start)/1000;
	}
    //验证用户登录
    // var userInfoStr=$.cookie("userInfo");

    //如果获取不到cookie，说明没有登录过，跳转到登录页面
    // if(!userInfoStr){
    //     location.href="index.html";
    // }
    var name = $.cookie('uid');
    $('#usercome').html(name);
    //实现菜单栏切换
    $(".aside .list-group").on("click","button",function(){

        //实现菜单背景的切换
        $(this).addClass("active").siblings().removeClass("active");

        if($(this).hasClass("btn-equipment")){
            equipmentList();
        }else if($(this).hasClass("btn-salesData")){
            salesData();
        }else if($(this).hasClass("btn-salesSituation")){
            information();
        }else if($(this).hasClass("btn-troubleInfo")){
            troubleInfo();
        }else if($(this).hasClass("btn-user-mt")){
            userManagement();
        }else if($(this).hasClass("btn-lottery-mt")){
            lotteryManagement();
        }else if($(this).hasClass("btn-lotteryMachine-mt")){
            lottery_M_Management();
        }else if($(this).hasClass("btn-bonus")){
            bonus();
        }


    });

    //自动触发讲师管理按钮的点击事件
    $(".aside .list-group button.btn-equipment").trigger("click");

    //退出按钮
    $(".link-logout").on("click", function () {
        location.href="index.html";
    })
})