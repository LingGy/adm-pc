/**
 *设备信息模块js
 */
define(["jquery", "text!tpls/equipmentList.html", "text!tpls/detailedInfo.html", "arttemplate", "pagination", "common"], function ($, equipmentListTpl, detailedInfoTpl, art) {
    return function () {
        var uid = $.cookie('uid');
        var now = Date.parse(new Date()) / 1000;
        var accesstoken = window.sessionStorage.getItem('accesstoken');
        var usertype = window.sessionStorage.getItem('usertype');
        $.ajax({
            type: 'get',
            url: api + 'equipments',
            data: {
                uid: uid,
                usertype:usertype,
	            accesstoken: accesstoken
            },
            success: function (data) {
	            var data = JSON.parse(data);
	            if (data.code != 0) throw new Error(data.msg);
	            //将设备id都存放在本地,在其他页面可以复用
	            if(data.equipments){
		            var eidList = [];
		            for (let i = 0, len = data.equipments.length; i < len; i++) {
			            eidList.push(data.equipments[i].code);
		            }
		            var nEidList = eidList.join();
		            window.sessionStorage.setItem("eidlist", nEidList)
		            var nequipmentListTpl = art.render(equipmentListTpl, data);
		            // var $equipmentListTpl = $(nequipmentListTpl);
		            $(".menu-content-container").empty().append(nequipmentListTpl)

		            $(".btn-click").on("click", function () {
			            var vl = $(this).parent().siblings(".i-code").html();
			            $.ajax({
				            type: 'get',
				            url: api + 'equipment',
				            data: {
					            uid: uid,
					            eid: vl,
					            usertype:usertype,
					            accesstoken: accesstoken
				            },
				            success: function (res) {
					            var res = JSON.parse(res);
					            console.log(res);
					            if (res.code === 1){
						            throw new Error(res.msg);
					            } else if(res.code === 0){
						            if(res.equipment.test){
							            if(res.equipment.test === 0){
								            res.equipment.test = '正式';
							            }else if(res.equipment.test === 1){
								            res.equipment.test = '测试';
							            }
						            }else {
							            res.equipment.test = '正式'
						            }
						            if(res.equipment.ports){
							            res.equipment.ports[0].type = lotType(res.equipment.ports[0].type);
							            res.equipment.ports[1].type = lotType(res.equipment.ports[1].type);
						            }else {
							            let ports = [
								            {
									            count:0,
									            port:1,
									            type:'无'
								            },
								            {
									            count:0,
									            port:2,
									            type:'无'
								            }
							            ]
							            res.equipment.ports = ports
						            }
						            res.equipment.stat = res.equipment.stat == 1?'故障':'正常';
					            }

					            var ndetailedInfoTpl = art.render(detailedInfoTpl, res)
					            $("#appoint").empty().append(ndetailedInfoTpl);
					            //返回
					            $('#back').on('click', function () {
						            $(".aside .list-group button.btn-equipment").trigger("click");
					            })
					            //设置设备拥有人
					            $('.changeOwner').on('click', function () {
						            $.ajax({
							            type:'get',
							            url:api + 'owner',
							            data:{
								            uid:uid,
								            eid:$(this).attr('data-code'),
								            usertype:usertype,
								            owner:$('.deOwner').val(),
								            accesstoken: accesstoken
							            },
							            success:function(data){
								            var data = JSON.parse(data);
								            if(data.code == 0){
									            alert("设置成功");
								            }else{
									            alert(data.msg);
								            }
							            }
						            })
					            })
					            //设置设备运营人
					            $('.changeOperatot').on('click', function () {
						            $.ajax({
							            type:'get',
							            url:api + 'operator',
							            data:{
								            uid:uid,
								            eid:$(this).attr('data-code'),
								            usertype:usertype,
								            operator:$('.deOperatot').val(),
								            accesstoken: accesstoken
							            },
							            success:function(data){
								            var data = JSON.parse(data);
								            if(data.code == 0){
									            alert("设置成功");
								            }else{
									            alert(data.msg);
								            }
							            }
						            })
					            })
					            // 更改运行模式的按钮
					            $('.changeType').on('click', function () {
						            var type = $(this).parent().attr('data-type');
						            var eid = $(this).parent().attr('data-nb')
						            if(type == '正式'){
							            type = 1;
						            }else if(type == '测试'){
							            type = 0;
						            }
						            $.ajax({
							            type:'get',
							            url:api +'test',
							            data:{
								            uid: uid,
								            eid: eid,
								            test:type,
								            usertype:usertype,
								            accesstoken: accesstoken
							            },
							            success:function(data){
								            var data = JSON.parse(data)
								            if(data.code === 0 ){
									            if(type == 0){
										            type = '正式'
									            }else if(type == 1){
										            type = '测试';
									            }
									            $('.edType').html(type);
									            $('.edType').parent().attr('data-type',type)
								            }
							            }
						            })
					            })
				            }
			            })
		            })
	            }else {
		            $(".menu-content-container").empty().append('<h3>未获取到相关的设备信息...</h3>')
	            }

            }
        })
    }
});