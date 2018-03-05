define(["jquery","text!tpls/lottery_M_Management.html", "arttemplate", "common"], function ($,machineMtTpl,art) {
	return function () {
		$(".menu-content-container").empty().append(machineMtTpl);
		$('.m_eid').on('blur', function () {
			var regCode = $(this).val().slice(0,6);
			$('.m_regioncode').val(regCode);
		})
		$('.m_addBtn').on('click', function () {
			var uid = $.cookie('uid');
			var accesstoken = window.sessionStorage.getItem('accesstoken');
			var usertype = window.sessionStorage.getItem('usertype');
			var model = $('.m_model').val();
			var eid = $('.m_eid').val();
			var mac = $('.m_mac').val();
			var regioncode = $('.m_regioncode').val();
			var owner = $('.m_owner').val();
			var pass = $('.m_pass').val();
			var test = $('#m_test option:selected').val();
			$.ajax({
			    type:'get',
			    url:api+'addequipment',
			    data:{
			    	uid:uid,
				    usertype:usertype,
			    	model:model,
				    eid:eid,
				    mac:mac,
				    regioncode:regioncode,
				    owner:owner,
				    pass:pass,
				    test:test,
				    accesstoken:accesstoken
			    },
			    success:function(data){
					var data = JSON.parse(data);
					if(data.code === 0){
						alert('添加成功');
						$(".aside .list-group button.btn-lotteryMachine-mt").trigger("click");
					}
			    }
			})
		})
	}
});