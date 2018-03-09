// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入柱状图,饼图
require('echarts/lib/chart/pie');

// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');

require('jquery')
let myChart_leftTop='';
let data=[{name:'total',value:100},{name:'monitor',value:77}]
let option_leftTop = {
	    tooltip : {
	        trigger: 'item',
	        formatter: "{b} : {c}"
	    },
	     legend: {
	     	show:false
	    },
	    series : [
	        {
	            startAngle:0,
	            name:'访问来源',
	            type:'pie',
	            radius : ['96%', '134%'],
	            center: ['30%', '80%'],
	            data:[
	                {
	                  value:0,
                    name:'transparent',
                    label:{show:false},
                    itemStyle:{normal:{color:'rgba(0,0,0,0)'}},
                    tooltip:{show:false}},
	                {
	                  value:0,
                    name:'Total',
                    label:{show:false},
                    itemStyle:{normal:{color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
	                        offset: 1,
	                        color: '#387BCC'
	                    }, {
	                        offset: 0,
	                        color: 'rgba(63,127,204,0.1)'
	                    }])}}},
	            ],
	            label: {
	                normal: {
	                    textStyle: {
	                        color: 'rgba(255, 255, 255, 0.5)'
	                    }
	                }
	            },
	            labelLine: {
	                normal: {
	                    show:false
	                }
	            },
	            animationType: 'scale',
	            animationEasing: 'elasticOut'
	        },
	        {
	            startAngle:0,
	            name:'访问来源',
	            type:'pie',
	            radius : ['60%', '90%'],
	            center: ['30%', '80%'],
	            data:[
	                {
	                  value:0, name:'transparent',
                    label:{show:false},itemStyle:{normal:{
	                    color:'rgba(0,0,0,0)'}},tooltip:{show:false}},
	                {
	                  value:0,
                    name:'Monitoring amount',
                    label:{
	                    show:true,
                      position:'center',
                      padding:[0,0,35,0],
                      color:'#7B93BE',
                      fontSize:43,
                      lineHeight:43,
                      formatter(params){
	                      return (params.percent*2+0.11).toFixed(2)+'{a|%}'
                      },
                      rich:{
                        a:{
                          fontSize:25,
                          color:'#7B93BE',
                          fontStyle:'italic',
                          lineHeight:25,
                          padding:[0,0,20,0]
                        }
                      }
                    },itemStyle:{normal:{color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
	                        offset: 1,
	                        color: 'rgba(0,190,170,1)'
	                    }, {
	                        offset: 0,
	                        color: 'rgba(0, 190, 170,0.2)'
	                    }])}}},
	                {value:0, name:'Total',label:{show:false},itemStyle:{normal:{color: 'rgba(0, 190, 170,0.1)'}}},

	            ],
	            label: {
	                normal: {
	                    textStyle: {
	                        color: 'rgba(255, 255, 255, 0.5)'
	                    }
	                }
	            },
	            labelLine: {
	                normal: {
	                    show:false
	                }
	            },
	            animationType: 'scale',
	            animationEasing: 'elasticOut'
	        }
	    ]
	};
function setDom(strDom){
	myChart_leftTop = echarts.init(document.getElementById(strDom));
}
function dispose(){
	myChart_leftTop.dispose();
}
function init(param_data,name){
	if(param_data){
		data=param_data;
	}
    	//var dataRandoms=[data[0].value+data[1].value+data[2].value+2*getEmptyNo(data),data[0].value,getEmptyNo(data),data[1].value,getEmptyNo(data),data[2].value]
  var total=data[0].value;
  option_leftTop.series[0].data[0].value=total;
  option_leftTop.series[0].data[1].value=data[0].value;
  option_leftTop.series[1].data[0].value=total;
  option_leftTop.series[1].data[1].value=data[1].value;
  option_leftTop.series[1].data[2].value=data[0].value-data[1].value;
  myChart_leftTop.setOption(option_leftTop);

  $('#total').html(data[0].value.toLocaleString())
  $('#monitor').html(data[1].value.toLocaleString())
}
function getEmptyNo(data){
	var noData=0;
	for(var i=0;i<data.length;i++){
		noData+=data[i].value;
	}
	return noData/90
}
module.exports={
	init:init,
	setDom:setDom,
	dispose:dispose
}
