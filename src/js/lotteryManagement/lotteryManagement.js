define(["jquery","text!tpls/lotteryManagement.html", "arttemplate", "common"], function ($,lotteryManagementTpl,art) {
	return function () {
		$(".menu-content-container").empty().append(lotteryManagementTpl);
	}
});