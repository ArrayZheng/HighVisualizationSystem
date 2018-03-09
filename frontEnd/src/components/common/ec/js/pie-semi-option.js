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
let data=[{name:'Despanchado',value:0},{name:'Procesando',value:0}]
let option_leftTop = {
	    tooltip : {
	        trigger: 'item',
	        formatter: "{b} : {c}"
	    }, 
	     legend: {
	     	show:false,
	        orient: 'horizontal',
	        bottom:-5,
	        textStyle:{
	        	color:'#fff'
	        },
	        formatter:function(name){
	        	switch(name){
	        		case 'Despanchado':
	        			return data[0].value+"\n"+name;
	        			break;
	        		case 'Procesando':
	        			return data[1].value+"\n"+name;
	        			break;
	        		default :
	        			break;
	        	}
	        },
	        itemWidth:230,
	        itemHeight:10,
	        data:['直达','Despanchado','Procesando']
	    },
	    series : [
	        {
	            
	            startAngle:0,
	            name:'访问来源',
	            type:'pie',
	            radius : ['80%', '130%'],
	            center: ['50%', '75%'],
	            data:[
	                {value:0, name:'Receptión',itemStyle:{normal:{
	                    label:{show:true,
	                            //formatter :' {c} \n{b} ',
	                            formatter : function(params){
	                            	return Math.floor(params.value-getEmptyNo(data))+'\n'+params.name;
	                            },
	                            position:'center',textStyle:{
	                                color:'#fff',
	                                fontSize:'40'
	                            }},
	                    color:'rgba(0,0,0,0)'}},tooltip:{show:false}},
	                {value:0, name:'Despanchado',itemStyle:{normal:{label:{show:false},color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
	                        offset: 1,
	                        color: '#00beaa'
	                    }, {
	                        offset: 0,
	                        color: 'rgba(0, 190, 170,0.2)'
	                    }])}}},
	                {value:0, name:'Despanchado',itemStyle:{normal:{label:{show:false},color:'rgba(0,0,0,0)'}},tooltip:{show:false}},
	                {value:0, name:'Procesando',itemStyle:{normal:{label:{show:false,position:'center'},color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
	                        offset: 1,
	                        color: 'rgb(255, 216, 133)'
	                    }, {
	                        offset: 0,
	                        color: 'rgba(255, 216, 133,0.2)'
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
	                    show:false,
	                    lineStyle: {
	                        color: 'rgba(255, 255, 255, 0.3)'
	                    },
	                    smooth: 0.2,
	                    length: 10,
	                    length2: 20
	                }
	            },
	            animationType: 'scale',
	            animationEasing: 'elasticOut'
	        },
	        {
	        	silent:true,
	            startAngle:0,
	            name:'访问来源',
	            type:'pie',
	            radius : ['135%', '140%'],
	            center: ['50%', '75%'],
	            tooltip:{
	            	show:false
	            },
	            data:[
	                {value:0, name:'Receptión',itemStyle:{normal:{
	                    label:{show:false,
	                            formatter :' {c} \n{b} ',
	                            position:'center',textStyle:{
	                                color:'#fff',
	                                fontSize:'20'
	                            }},
	                    color:'rgba(0,0,0,0)'}},tooltip:{show:false}},
	                {value:0, name:'Despanchado',itemStyle:{normal:{label:{show:false},color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
	                        offset: 1,
	                        color: '#00beaa'
	                    }, {
	                        offset: 0,
	                        color: 'rgba(0, 190, 170,0.2)'
	                    }])}}},
	                {value:0, name:'Despanchado',itemStyle:{normal:{label:{show:false},color:'rgba(0,0,0,0)'},tooltip:{show:false}}},
	                {value:0, name:'Procesando',itemStyle:{normal:{label:{show:false,position:'center'},color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
	                        offset: 1,
	                        color: 'rgb(255, 216, 133)'
	                    }, {
	                        offset: 0,
	                        color: 'rgba(255, 216, 133,0.2)'
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
	                    show:false,
	                    lineStyle: {
	                        color: 'rgba(255, 255, 255, 0.3)'
	                    },
	                    smooth: 0.2,
	                    length: 10,
	                    length2: 20
	                }
	            },
	            animationType: 'scale',
	            animationEasing: 'elasticOut'
	        }
	    ]
	};
function setDom(){
	myChart_leftTop = echarts.init(document.getElementById('left-top'));
}
function dispose(){
	myChart_leftTop.dispose();
}
function init(param_data,name){
	if(param_data){
		data=param_data;
	}
    	//var dataRandoms=[data[0].value+data[1].value+data[2].value+2*getEmptyNo(data),data[0].value,getEmptyNo(data),data[1].value,getEmptyNo(data),data[2].value]
    	var total=data[0].value+data[1].value+getEmptyNo(data);
    	var dataRandoms=[total==0?0.1:total,data[0].value,getEmptyNo(data),data[1].value]
    	for(var i=0;i<2;i++){
    		option_leftTop.series[i].data[0].name=name;
    		for(var j=0;j<4;j++){
    			option_leftTop.series[i].data[j].value=dataRandoms[j];
    		}
    		
    	}
    	myChart_leftTop.setOption(option_leftTop);
    	initLengend(param_data);
}
function initLengend(param_data){
	if(param_data){
		data=param_data;
	}
	$('#left-top').siblings().find('.legend-value').each(function(index,item){
		$(this).html(data[index].value);
	})
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
