define(["jquery", "text!tpls/trouble.html", "text!tpls/ckerror.html", "arttemplate", "common"], function ($, troubleInfoTpl, ckerrorTpl, art) {
	return function () {
		var uid = $.cookie('uid');
		var now = Date.parse(new Date()) / 1000;
		var usertype = window.sessionStorage.getItem('usertype');
		var accesstoken = window.sessionStorage.getItem('accesstoken');
		var eid = ''
		$(".menu-content-container").empty().append(troubleInfoTpl);
		$('#c_error').on('click', function () {
			var eid = $('#dev_nb').val();
			var errordata = getError(uid, eid, usertype, accesstoken, api);
			var ckerrortpl = art.render(ckerrorTpl, errordata)
			$("#errortpl").empty().append(ckerrortpl);
		})
		var allerrordata = getError(uid, eid, usertype, accesstoken, api);
		var allckerrortpl = art.render(ckerrorTpl, allerrordata)
		$("#errortpl").empty().append(allckerrortpl);



	}
});