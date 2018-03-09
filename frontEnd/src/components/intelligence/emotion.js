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
    data: ['00:00','','','','04:00','','','','08:00','','','','12:00','','','','16:00','','','','20:00','','','','24:00']
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
    right:57,
    top:49,
    bottom:80,
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
        color:'#606CDB'
      },
      width:3,
      color:'#606CDB',
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
            offset: 0, color: '#606CDB' // 0% 处的颜色
          }, {
            offset: 1, color: 'rgba(96,108,219,0)' // 100% 处的颜色
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
  httpData.forEach(function(item,id){
    var temp={
      value:item,
      showSymbol:true,
      symbol:'circle',
      symbolSize: id%4?0:8,
      itemStyle: {
        normal: {
          color: '#606CDB'
        },
      },
    }
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
