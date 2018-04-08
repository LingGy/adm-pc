// var api ="http://192.168.2.102:9828/";
// var api ="http://192.168.0.100:9828/";
 var api = "http://server.ttyuecai.com:9828/";
// var api = "http://192.168.1.130:9828/";
// var api = "http://frp.ttyuecai.com:10011/";

/**
 * 判断彩票名称
 */
function lotType(a) {
		var x;
		switch (a){
			case 1001:x='黄金世界';
				break;
			case 1002:x='卧虎藏龙';
				break;
			case 1003:x='点石成金';
				break;
			case 1004:x='黄金之城';
				break;
			case 1005:x='彩运来';
				break;
			case 1006:x='八方来财';
				break;
			case 1007:x='卧虎藏龙';
				break;
			case 1008:x='中国红';
				break;
			case 1009:x='7乐无穷';
				break;
			case 1010:x='甜蜜蜜';
				break;
			case 1011:x='红宝石8';
				break;
			case 1012:x='豪门盛宴';
				break;
			case 1013:x='抢红包';
				break;
			case 1014:x='皇家金典';
				break;
			case 1015:x='芝麻开门';
				break;
			case 1016:x='7乐无穷';
				break;
			case 1017:x='神灯';
				break;
			case 1018:x='财富之门';
				break;
			case 1019:x='加油中国';
				break;
			case 1020:x='宝石之王';
				break;
			case 1021:x='金猴献宝';
				break;
			case 1022:x='绿翡翠';
				break;
			case 1023:x='金鸡纳福';
				break;
			case 1024:x='十倍幸运';
				break;
			case 1025:x='日进斗金';
				break;
			case 1026:x='20倍现金';
				break;
			case 1027:x='天下名钻';
				break;
			case 1028:x='和气生财';
				break;
			case 1029:x='通吃';
				break;
			default:x='未知彩票';
				break;
		}
		return x;
}

/***
 * 获取销售统计的数据
 */
function getSalecount(uid,eid,start,end,accesstoken,api,usertype,region) {
	var salecount;
	$.ajax({
		type:'get',
		async:false,
		url:api + 'salecount',
		data: {
			uid:uid,
			eid:eid,
			start:start,
			end:end,
			accesstoken:accesstoken,
			usertype:usertype,
			region:region
		},
		success: function (data) {
			var data = JSON.parse(data);
			salecount =  data
		}
	})
	return salecount;
}


/***
 * 获取销售详情的数据
 */
function getSalelists(uid,eid,start,end,accesstoken,api,usertype,region) {
	var salelists;
	$.ajax({
		type:'get',
		async:false,
		url:api + 'sales',
		data: {
			uid:uid,
			eid:eid,
			start:start,
			end:end,
			accesstoken:accesstoken,
			usertype:usertype,
			region:region
		},
		success: function (data) {
			var data = JSON.parse(data);
			salelists =  data
		}
	})
	return salelists;
}

/**
 * 获取故障信息
 */
function getError(uid,eid,usertype,accesstoken,api) {
	var ErrorData;
	$.ajax({
		type: 'get',
		url: api + 'errors',
		async:false,
		data: {
			uid: uid,
			eid: eid,
			usertype: usertype,
			accesstoken: accesstoken
		},
		success: function (data) {
			var data = JSON.parse(data);
			if (data.errors) {
				//将服务器返回的时间戳转成时间格式
				for (let i = 0, len = data.errors.length; i < len; i++) {
					let date = new Date((data.errors[i].t) * 1000);
					let Y = date.getFullYear() + '-';
					let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
					let D = date.getDate() + ' ';
					let h = date.getHours() + ':';
					let m = date.getMinutes() + ':';
					let s = ( date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds() );
					data.errors[i].t = Y + M + D + h + m + s;

					if(data.errors[i].errcode == '01'){
						data.errors[i].errcode = '有不可恢复错误';
					}else if(data.errors[i].errcode == '02'){
						data.errors[i].errcode = '纸槽前端卡纸';
					}else if(data.errors[i].errcode == '04'){
						data.errors[i].errcode = '切纸出错';
					}else if(data.errors[i].errcode == '08'){
						data.errors[i].errcode = '纸槽后端卡纸';
					}else if(data.errors[i].errcode == '10'){
						data.errors[i].errcode = '出纸口卡纸';
					}else if(data.errors[i].errcode == '20'){
						data.errors[i].errcode = '进纸口无纸';
					}else if(data.errors[i].errcode == '100'){
						data.errors[i].errcode = '出票未完成';
					}else {
						data.errors[i].errcode = '未知错误';
					}
				};
				ErrorData = data;
			}else {
				ErrorData = ''
			}
		}
	});
	return ErrorData;
}

/**
 * 日期转时间戳函数
 */
function getTimeStamp(time,flat)
{
	today = new Date();
	if (flat)
	{
		today.setHours(0);
		today.setMinutes(0);
		today.setSeconds(0);
		today.setMilliseconds(0);
	}
	timeStamp = Date.parse(today) / 1000 + parseInt(time) * 60 * 60 * 24;
	return timeStamp;
}

