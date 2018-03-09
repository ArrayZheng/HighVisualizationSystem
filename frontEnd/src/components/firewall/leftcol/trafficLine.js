// 引入 ECharts 主模块
let echarts = require('echarts/lib/echarts');
// 引入柱状图,饼图
require('echarts/lib/chart/line');

// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');
require('echarts/lib/component/dataZoom');

let chart={};
let option={
  xAxis: {
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
  },
  yAxis: {
    offset:0,
    splitNumber:4,
    axisLine:{show:false},
    axisTick:{show:false},
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
  },
  grid:{
    left:95,
    right:30,
    top:30,
    bottom:60,
    show:false,
    // containLabel: true
    // backgroundColor:'rgb(35, 43, 75)',
    // borderColor:'rgb(45, 53, 83)'
  },

  series: [{
    name: 'all',
    type: 'line',
    // showSymbol:false,
    // symbol:'circle',
    // symbolSize: 8,
    // itemStyle: {
    //   normal: {
    //     color: '#606CDB'
    //   },
    // },
    smooth:true,
    data: [],
    lineStyle:{
      normal:{
        color:'rgba(48,229,224,0.5)'
      },
      width:1,
      color:'rgba(48,229,224,1)',
    },
    areaStyle:{
      normal:{
        color:{
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: 'rgba(48,229,224,1)' // 0% 处的颜色
          }, {
            offset: 1, color: 'rgba(91,158,255,0)' // 100% 处的颜色
          }],
          globalCoord: false // 缺省为 false
        },
      }
    }
  }]
};
function setDom(id){
  chart = echarts.init(document.getElementById(id));
  return chart;
}

function init(httpData) {
  option.series[0].data=[];
  option.xAxis.data=[];
  httpData.forEach(function(item,id){
    var temp={
      value:item.value,
      showSymbol:true,
      symbol:'circle',
      symbolSize: id%2?0:0,
      itemStyle: {
        normal: {
          color: 'rgba(48,229,224,1)'
        },
      },
    }
    option.xAxis.data.push(item.hours);
    option.series[0].data.push(temp);
  })
    chart.setOption(option);
}
function dispose(){
  if(chart){
    chart.dispose();
  }
}
module.exports={
  init:init,
  setDom:setDom,
  dispose:dispose,
};
