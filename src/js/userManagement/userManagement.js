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
				    	$('.addman_box .bgc').css('display','none');
				    	$('.add01').css('display','block');
					    setTimeout(function () {
						    $(".aside .list-group button.btn-user-mt").trigger("click");
					    },1000);
				    }else {
				    	alert(res.msg);
				    }
			    }
			})
		})

		//获取用户列表
		$.ajax({
		    type:'post',
		    url:api + 'users',
		    data:{
				uid,
			    usertype,
			    accesstoken
		    },
		    success:function(data){
		    	let resdata = JSON.parse(data)
			    if(resdata.code === 0){
				    var userListTpl = art.render(userManagementListTpl,resdata)
				    $("#userList").empty().append(userListTpl);
				    var deleteuid;
				    //点击删除用户按钮
			    	$("button.delet").on('click', function () {
					    $(".yes_box").css('display','block');
			    		 deleteuid = $(this).parent().parent().attr('data-deluid');
				    })
				    //确认提交删除
				    $(".yes").on('click', function () {
					    //删除某个用户
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
							    if(res.code == 0){
								    $('.tip01').css('display','none');
								    $('.tip02').css('display','block');
								    setTimeout(function () {
									    $(".aside .list-group button.btn-user-mt").trigger("click");
								    },1000);
							    }
						    }
					    })
				    })
				    //取消
				    $(".clos").on('click', function () {
					    $(".yes_box").css('display','none');
				    })
				    //点击修改用户button
				    $('.revise').on('click', function () {
					    var re_uid = $(this).parent().parent().attr('data-deluid');
					    var re_name = $(this).parent().parent().attr('data-delname');
					    var re_pass = $(this).parent().parent().attr('data-delpass');
					    var re_phone = $(this).parent().parent().attr('data-phone');
					    $('.revise_user1').val(re_uid);
					    $('.revise_username1').val(re_name);
					    $('.revise_password1').val(re_pass);
					    $('.revise_phone1').val(re_phone);
					    $('.addman_box1').css('display','block');
				    });
			    	//点击确认修改
					$('#btn_revise').on('click', function () {
						$.ajax({
						    type:'post',
						    url:api+'modifyuser',
						    data:{
								uid:uid,
								usertype,
								targetuid:$('.revise_user1').val(),
								name:$('.revise_username1').val(),
								pass:$('.revise_password1').val(),
								phone:$('.revise_phone1').val(),
							    accesstoken
						    },
						    success:function(data){
						    	let res = JSON.parse(data);
							    console.log(res);
							    if(res.code == 0){
							    	$('.bgc1').css('display','none');
								    $('.add02').css('display','block');
								    setTimeout(function () {
									    $(".aside .list-group button.btn-user-mt").trigger("click");
								    },1000);
						    	}else {
						    		alert(res.msg);
							    }
						    }
						})
					})
			    	//取消按钮
				    $('.cel1').on('click', function () {
					    $('.addman_box1').css('display','none');
				    })
			    }
		    }
		})





	}
});