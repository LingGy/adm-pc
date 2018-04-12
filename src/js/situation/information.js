/**
 * 销售情况模块
 */
define(["jquery", "text!tpls/salesSituation.html", "text!tpls/appoitDate.html", "text!tpls/orderDetails.html", "text!tpls/sales.html", "arttemplate","dateRange", "common"], function ($, salesSituationTpl, appoitDateTpl, orderDetailsTpl, saleslistsTpl, art) {
    return function () {
        var uid = $.cookie('uid');
        var date = new Date();
	    var start = getTimeStamp(0,true);
	    var end = getTimeStamp(1,true);
	    var accesstoken = window.sessionStorage.getItem('accesstoken');
	    var usertype = window.sessionStorage.getItem('usertype');
		var region = '';
	    var checkTimeStar,checkTimeEnd;


	    //1.渲染基本模板
	    $(".menu-content-container").empty().append(salesSituationTpl)

	    //2.获取本地存储数据
	    // var toarr = window.sessionStorage.getItem('eidlist')
	    // var eidList = toarr.split(',');

	    //3.把数据渲染到select中
	    // var str = '<option value=""></option>'
	    // for (let i = 0, len = eidList.length; i < len; i++) {
		 //    str += '<option value="' + eidList[i] + '">' + eidList[i] + '</option>'
	    // }
	    // $('#eid').html(str);

	    //4.注册日期选择插件
	    var dateRange = new pickerDateRange('intDate', {
		    theme: 'ta',
		    success: function (obj) {
			    checkTimeStar = (Date.parse(new Date($('#startDate').val())) / 1000-8*60*60);
		    }
	    });
	    var dateRange2 = new pickerDateRange('intDate2', {
		    theme: 'ta',
		    success: function (obj) {
			    checkTimeEnd = Date.parse(new Date($('#startDate').val())) / 1000-8*60*60;
		    }
	    });


	    //5.注册点击查询事件
	    $('#queryData').on('click', function () {
		    let eid = $('#eid').val();
		    let time1 = ($('#d1_hour option:selected').val()*60*60)+($('#d1_mincte option:selected').val()*60);
		    let time2 = ($('#d2_hour option:selected').val()*60*60)+($('#d2_mincte option:selected').val()*60);
		    let start = checkTimeStar + time1;
		    let end = checkTimeEnd + time2;
		    let region = $('.region').val();
		    let allsalecount = getSalecount(uid,eid,start,end,accesstoken,api,usertype,region);
		    let salelists = getSalelists(uid,eid,start,end,accesstoken,api,usertype,region);
		    salelists.tdcount = allsalecount.count;
		    salelists.tdmoney = allsalecount.money;
		    if(salelists.sales){
			    for (let i = 0, len = salelists.sales.length; i < len; i++) {
				    let date = new Date((salelists.sales[i].ct) * 1000);
				    let Y = date.getFullYear() + '-';
				    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				    let D = date.getDate() + ' ';
				    let h = date.getHours() + ':';
				    let m = date.getMinutes() + ':';
				    let s = date.getSeconds();
				    salelists.sales[i].ct = Y + M + D + h + m + s;
				    for(var t = 0 ,leg = salelists.sales[i].orders.length ; t < leg; t++){
					    salelists.sales[i].orders[t].type = lotType(salelists.sales[i].orders[t].type);
				    }
			    }
		    }
		    let salesliststpl = art.render(saleslistsTpl,salelists);
		    $('#appoitDate').empty().append(salesliststpl);
		    //注册订单详情按钮事件
		    $('.btn-pt-info').on('click', function () {
			    let index = $(this).parent().attr('data-id');
			    let saledetailsdata = salelists.sales[index];
			    let orderDetailstpl = art.render(orderDetailsTpl,saledetailsdata);
			    $('#appoitDate').empty().append(orderDetailstpl);
			    //返回按钮
			    $('#backSales').on('click', function () {
				    $("#queryData").trigger("click");
			    })
		    })
	    })

	    //6.发送获取今天销售统计与销售列表的两个请求
	    getTodaySaleData();
	    function getTodaySaleData() {
		    let eid = '';
		    let allsalecount = getSalecount(uid,eid,start,end,accesstoken,api,usertype,region);
		    let salelists = getSalelists(uid,eid,start,end,accesstoken,api,usertype,region);
		    salelists.tdcount = allsalecount.count;
		    salelists.tdmoney = allsalecount.money;
		    if(salelists.sales){
			    for (let i = 0, len = salelists.sales.length; i < len; i++) {
				    let date = new Date((salelists.sales[i].ct) * 1000);
				    let Y = date.getFullYear() + '-';
				    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				    let D = date.getDate() + ' ';
				    let h = date.getHours() + ':';
				    let m = date.getMinutes() + ':';
				    let s = date.getSeconds();
				    salelists.sales[i].ct = Y + M + D + h + m + s;
				    for(var t = 0 ,leg = salelists.sales[i].orders.length ; t < leg; t++){
					    salelists.sales[i].orders[t].type = lotType(salelists.sales[i].orders[t].type);
				    }
			    }
		    }
		    let salesliststpl = art.render(saleslistsTpl,salelists);
		    $('#appoitDate').empty().append(salesliststpl);
		    //注册订单详情按钮事件
		    $('.btn-pt-info').on('click', function () {
			    let index = $(this).parent().attr('data-id');
			    let saledetailsdata = salelists.sales[index];
			    let orderDetailstpl = art.render(orderDetailsTpl,saledetailsdata);
			    $('#appoitDate').empty().append(orderDetailstpl);
			    //返回按钮
			    $('#backSales').on('click', function () {
				    $("#queryData").trigger("click");
			    })
		    })

	    }
    }
});