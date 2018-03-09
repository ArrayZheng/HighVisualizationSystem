// 引入 ECharts 主模块
let echarts = require('echarts/lib/echarts');
// 引入词云
require('echarts-wordcloud');

// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');
let chart1={},option={};
function setDom(id){
  chart1 = echarts.init(document.getElementById(id));
  chart1.on('click', function (params) {
    if (params.componentType === 'markPoint') {
      // 点击到了 markPoint 上
      if (params.seriesIndex === 5) {
        // 点击到了 index 为 5 的 series 的 markPoint 上。
      }
    }
    else if (params.componentType === 'series') {
      alert(params.data.name);
      if (params.seriesType === 'wordCloud') {
        if (params.dataType === 'edge') {
          // 点击到了 graph 的 edge（边）上。
        }
        else {
          // 点击到了 graph 的 node（节点）上。
        }
      }
    }
  });
  return chart1;
}
function init(httpData) {
  var maxSize=httpData.length>20?30:httpData.length>10?40:60;
  chart1.setOption(option = {
    title:{
      text:"",
      textStyle:{
        color:'rgb(255,255,255)',
        fontFamily:'Arial',
        fontWeight:'bold',
        fontSize:20
      }
    },
    tooltip: {
      show: true
    },
    series: [ {
      type: 'wordCloud',
      gridSize: 8,
      sizeRange: [12, maxSize],
      rotationRange: [-20, 30],
      shape: 'pentagon',
      // shape: 'circle',
      width: 600,
      height: 300,
      drawOutOfBound: false,
      textStyle: {
        normal: {
          fontFamily: 'sans-serif',
          color: function () {
            var arrCo=['#05A623','#A75BFF','#09C0EE','#FF8680','#A1A1A8','#1767CF','#F08680','#A1A108','#1767C0'];
            var ranC=Math.floor(Math.random()*9);
            return arrCo[ranC]
          }
        },
        emphasis: {
          shadowBlur:5,
          shadowColor: '#fff'
        }
      },
      data:httpData
    }]
  })
}

function dispose(){
  chart1.dispose();

}
module.exports={
  init:init,
  setDom:setDom,
  dispose:dispose
};
