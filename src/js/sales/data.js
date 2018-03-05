define(["jquery","text!tpls/salesData.html","echarts","arttemplate"], function ($,salesDataTpl,echarts,art) {
    return function () {
        $(".menu-content-container").empty().append(salesDataTpl)
        // 基于准备好的dom，初始化echarts实例
        // var myChart = echarts.init($("#main"));
        var myChart = echarts.init(document.getElementById('main'));
        // 指定图表的配置项和数据
        var option = {
            title: {
                text: '2017年销售柱形图',
                left:"60px"
            },
            tooltip: {mtee:["888"]},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20,5, 20, 36, 10, 10, 20]
            }],
            itemStyle:{
                normal:{
                    color:'#5bc0de'
                }
            },
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);


    }
});