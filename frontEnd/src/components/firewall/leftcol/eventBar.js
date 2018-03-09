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
      left:24,
      right:30,
      top:30,
      bottom:30,
      show:false,
      containLabel: true
    },
    xAxis : [
        {
          // boundaryGap:false,
          boundaryGap: true,
          interval:0,
          axisTick:{
            alignWithLabel: true
          },
          axisLine:{
            lineStyle:{
              color:'#0D3A78',
            },
          },
          axisLabel:{
            textStyle: {
              color: '#7B93BE',
              fontSize:16,
              padding:[5,0,0,0]
            }
          },
          data: []
        }
    ],
    yAxis : [
        {
          offset:0,
            type : 'value',
            axisLine:{show:false},
          axisLabel:{
            textStyle: {
              color: '#7B93BE',
              fontSize:16,
              padding:[0,20,0,0]
            }
          },
          splitLine: {
            show: true,
            lineStyle:{
              color:'#0D3A78',
            }
          }
        }
    ],
    series : [
        {
            name:'Cantidad de incidente del dia',
            type:'bar',
            barWidth: '35',
            data:[data[0].value, data[1].value, data[2].value, data[3].value, data[4].value],
            itemStyle: {
                normal: {
                	label:{
        				  show: true,//是否展示
                		position:'top',
	                	textStyle:{
	                		color:'#D6F6FF',
	                		fontSize:18
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
function setDom(ss){
	myChart_rightTop = echarts.init(document.getElementById(ss));
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
		if(idx==data.length-1){
      option_rightTop.series[0].data.push({
        value:item.value,
        itemStyle:{
          color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(0,190,170,1)'
          }, {
            offset: 1,
            color: 'rgba(0,190,170,0)'
          }])
        }
      })
    }else{
      option_rightTop.series[0].data.push(item.value);
    }
		option_rightTop.xAxis[0].data.push({
			value:item.day,textStyle:{color:'#fff',fontSize:26}
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
