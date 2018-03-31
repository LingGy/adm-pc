define(["jquery","text!tpls/userManagement.html", "text!tpls/userManagementList.html", "arttemplate", "common"], function ($,userManagementTpl,userManagementListTpl,art) {
	return function () {
		var uid = $.cookie('uid');
		var now = Date.parse(new Date()) / 1000;
		var accesstoken = window.sessionStorage.getItem('accesstoken');
		var usertype = window.sessionStorage.getItem('usertype');
		var flag = {type:0}
		if(usertype != 0){
			 flag.type = 1
		}
		//1.渲染主体
		var userManagementtpl = art.render(userManagementTpl,flag)
		$(".menu-content-container").empty().append(userManagementtpl);
		//2.注册点击添加用户按钮弹出模态框和取消模态框
		$('#adduser').on('click', function () {
			$('.addman_box').css('display','block');
		})
		$('.cel').on('click', function () {
			$('.addman_box').css('display','none');
		})
		//3.点击确认添加用户
		$('#add_submit').on('click', function () {
			var data = {
				'uid':uid,
				'usertype':usertype,
				'newuid':$('.add_user').val(),
				'name':$('.add_username').val(),
				'pass':$('.add_password').val(),
				'newusertype':$('#addManType option:selected').val(),
				'phone':$('.add_phone').val(),
				'accesstoken':accesstoken,
			}
			$.ajax({
			    type:'post',
			    url:api+'adduser',
			    data:data,
			    success:function(data){
				    let res = JSON.parse(data);
				    if(res.code === 0){
				    	alert('添加成功');
					    $('.addman_box').css('display','none');
					    $('.add_user').val("") ;
					    $('.add_username').val("");
					    $('.add_password').val("");
					    $('#addManType option:selected').val("");
					    $('.add_phone').val("");
					    $(".aside .list-group button.btn-user-mt").trigger("click");
				    }else {
				    	alert(res.msg);
				    }
			    }
			})
		})

		$.ajax({
		    type:'post',
		    url:api + 'users',
		    data:{
				uid,
			    usertype,
			    accesstoken
		    },
		    success:function(data){
		    	let res = JSON.parse(data)
			    if(res.code === 0){
				    var userListTpl = art.render(userManagementListTpl,res)
				    $("#userList").empty().append(userListTpl);
			    	$("button.delet").on('click', function () {
			    		var deleteuid = $(this).parent().parent().attr('data-deluid');
						$.ajax({
						    type:'post',
						    url:api + 'deleteuser',
						    data:{
							    uid,
							    usertype,
							    accesstoken,
							    deleteuid
						    },
						    success:function(data){
						    	let res = JSON.parse(data)
							    console.log(res);
						    }
						})
				    })
			    }
		    }
		})





	}
});