define(["jquery","text!tpls/userManagement.html", "arttemplate", "common"], function ($,userManagementTpl,art) {
	return function () {
		$(".menu-content-container").empty().append(userManagementTpl);
	}
});