// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入柱状图,饼图
require('echarts/lib/chart/bar');

// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');

let data=[{name:'Aera1',value:10},{name:'Aera2',value:50},{name:'Aera3',value:20},{name:'Aera4',value:33},{name:'Aera5',value:29}];
let myChart_rightTop='';
let option_rightTop = {
    color: ['#7ec1f6'],
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
    	top:'55',
        left: '80',
        right: '80',
        bottom: '55',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : [
            		{value:data[0].name,textStyle:{color:'#fff',fontSize:26}},
            		{value:data[1].name,textStyle:{color:'#fff',fontSize:26}},
		            {value:data[2].name,textStyle:{color:'#fff',fontSize:26}},
		            {value:data[3].name,textStyle:{color:'#fff',fontSize:26}},
		            {value:data[4].name,textStyle:{color:'#fff',fontSize:26}},
		            {value:data[4].name,textStyle:{color:'#fff',fontSize:26}}
		            ],
            axisTick: {
                alignWithLabel: true
            },
           	splitLine:{show:false},
            axisLine:{show:false},
	        axisLabel:{
	        	interval:'auto',
	        	formatter:function(params){
							if(params){
								var newParamsName = "";
			                     var paramsNameNumber = params.length;
			                     var provideNumber = 15;
			                     var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
			                     if (paramsNameNumber > provideNumber) {
			                         for (var p = 0; p < rowNumber; p++) {
			                             var tempStr = "";
			                             var start = p * provideNumber;
			                             var end = start + provideNumber;
			                             if (p == rowNumber - 1) {
			                                 tempStr = params.substring(start, paramsNameNumber);
			                             } else {
			                                 tempStr = params.substring(start, end) + "\n";
			                             }
			                             newParamsName += tempStr;
			                         }
			
			                     } else {
			                         newParamsName = params;
			                     }
			                     return newParamsName
							}
		                     
		                 }
	        }
        }
    ],
    yAxis : [
        {
            type : 'value',
            axisLine:{show:false},
            axisLabel:{
	            textStyle: {
	                color: '#fff',
	                fontSize:38
	            }
            }
        }
    ],
    series : [
        {
            name:'Cantidad de incidente del dia',
            type:'bar',
            barWidth: '60%',
            data:[data[0].value, data[1].value, data[2].value, data[3].value, data[4].value],
            itemStyle: {
                normal: {
                	label:{
        				show: true,//是否展示  
                		position:'top',	
	                	textStyle:{
	                		color:'#ffffff',
	                		fontSize:38
	                	},
                	},
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: '#7ec1f6'
                    }, {
                        offset: 1,
                        color: 'rgba(126, 193, 246,0.2)'
                    }])
                }
            }
        }
    ]
};
function setDom(){
	myChart_rightTop = echarts.init(document.getElementById('right-top'));
}
function dispose(){
	myChart_rightTop.dispose();
}
function init(param_data){
	if(param_data){
		data=param_data;
	option_rightTop.series[0].data=[]
	option_rightTop.xAxis[0].data=[]
	data.forEach(function(item,idx){
		option_rightTop.series[0].data.push(item.value);
		option_rightTop.xAxis[0].data.push({
			value:item.name,textStyle:{color:'#fff',fontSize:26}
			})
	})
	}
	
	myChart_rightTop.setOption(option_rightTop);
}
export default {
	init : init,
	setDom:setDom,
	dispose:dispose
}
