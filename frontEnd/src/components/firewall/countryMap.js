// 引入 ECharts 主模块
let echarts = require('echarts/lib/echarts');
// 引入柱状图,饼状图
require('echarts/lib/chart/map');
require('echarts/lib/chart/lines');
require('echarts/lib/component/geo');

// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');
require('echarts/lib/component/visualMap');
let chart1={},chart2={},option={};
let tempData=[
  {name:'Almaty',value:parseInt(Math.random()*1000),itemStyle:{normal:{borderColor:'rgba(255,255,255,0.5)',borderWidth:1}}},
  {name:'Aqmola',value:parseInt(Math.random()*1000),itemStyle:{normal:{borderColor:'rgba(255,255,255,0.5)',borderWidth:1}}},
  {name:'Qostanay',value:parseInt(Math.random()*1000),itemStyle:{normal:{borderColor:'rgba(255,255,255,0.5)',borderWidth:1}}},
  {name:'Qaraghandy',value:parseInt(Math.random()*1000),itemStyle:{normal:{borderColor:'rgba(255,255,255,0.5)',borderWidth:1}}},
  {name:'Pavlodar',value:parseInt(Math.random()*1000),itemStyle:{normal:{borderColor:'rgba(255,255,255,0.5)',borderWidth:1}}},
  {name:'Aqtöbe',value:parseInt(Math.random()*1000),itemStyle:{normal:{borderColor:'rgba(255,255,255,0.5)',borderWidth:1}}},
  {name:'East Kazakhstan',value:parseInt(Math.random()*1000),itemStyle:{normal:{borderColor:'rgba(255,255,255,0.5)',borderWidth:1}}},
  {name:'Zhambyl',value:parseInt(Math.random()*1000),itemStyle:{normal:{borderColor:'rgba(255,255,255,0.5)',borderWidth:1}}},
  {name:'West Kazakhstan',value:parseInt(Math.random()*1000),itemStyle:{normal:{borderColor:'rgba(255,255,255,0.5)',borderWidth:1}}},
  {name:'Atyrau',value:parseInt(Math.random()*1000),itemStyle:{normal:{borderColor:'rgba(255,255,255,0.5)',borderWidth:1}}},
  {name:'Mangghystau',value:parseInt(Math.random()*1000),itemStyle:{normal:{borderColor:'rgba(255,255,255,0.5)',borderWidth:1}}},
  {name:'Qyzylorda',value:parseInt(Math.random()*1000),itemStyle:{normal:{borderColor:'rgba(255,255,255,0.5)',borderWidth:1}}},
  {name:'South Kazakhstan',value:parseInt(Math.random()*1000),itemStyle:{normal:{borderColor:'rgba(255,255,255,0.5)',borderWidth:1}}},
  {name:'North Kazakhstan',value:parseInt(Math.random()*1000),itemStyle:{normal:{borderColor:'rgba(255,255,255,0.5)',borderWidth:1}}},
  ]
let countryCode;
function setDom(ss){
  chart1 = echarts.init(document.getElementById(ss));
  var flag='show',check='show';
  chart1.on('georoam', function (params) {
    var option=chart1.getOption();
    if(option.geo[0].zoom<4){
      option.geo[0].label.show=false;
      flag='hide';
    }else{
      option.geo[0].label.show=true;
      flag='show';
    }
    if(check!=flag){
      chart1.setOption(option);
      check=flag;
    }
  })
}
function init(httpData,cCode) {
  countryCode=cCode;
  var p1=new Promise(function(resolve){
    $.getJSON("./static/mapConfig/world.json",function(data){
      resolve(data)
    })
  });
  var p2=new Promise(function(resolve){
    $.getJSON("./static/mapConfig/Kazakhstan.json",function(data){
      resolve(data)
    })
  });

  var p3=new Promise(function(resolve){
    $.getJSON("./static/mapConfig/flight.json",function(data){
      resolve(data)
    })
  });

  Promise.all([p1,p2,p3]).then(function(data){
    data[0].features.push.apply(data[0].features,data[1].data.features)
    function getAirportCoord(idx) {
      return [data[2].airports[idx][3], data[2].airports[idx][4]];
    }
    var routesBig = data[2].routes.map(function (airline) {
      return [
        getAirportCoord(airline[1]),
        getAirportCoord(airline[2])
      ];
    });
    console.log(routesBig.slice(0,1000));
    var routes=[
      [[39.9568,43.449928],[48.4437,48.1552]],
      [[49.9568,43.449928],[48.4437,48.1552]],
      [[59.9568,43.449928],[48.4437,48.1552]],
      [[29.9568,43.449928],[48.4437,48.1552]],
      [[19.9568,43.449928],[48.4437,48.1552]],
      [[9.9568,43.449928],[48.4437,48.1552]],
      [[0,0],[48.4437,48.1552]],
      [[180,0],[48.4437,48.1552]],
      [[-180,-70],[58.4437,48.1552]],

      [[-180,70],[58.4437,48.1552]],
      [[180,-70],[58.4437,48.1552]],

      [[180,70],[58.4437,48.1552]]
    ];
    var routes=[];
    //欧洲
    for(var i=0;i<20;i++){
      routes.push([[40*Math.random(),30+30*Math.random()],[50.4437,50.1552]])
    }
    for(var i=0;i<20;i++){
      routes.push([[40*Math.random(),30+30*Math.random()],[58.4437,48.1552]])
    }
    //非洲
    for(var i=0;i<20;i++){
      routes.push([[40*Math.random(),-30+60*Math.random()],[50.4437,50.1552]])
    }
    for(var i=0;i<20;i++){
      routes.push([[40*Math.random(),-30+60*Math.random()],[58.4437,48.1552]])
    }
    //亚洲
    for(var i=0;i<50;i++){
      routes.push([[40+120*Math.random(),10+60*Math.random()],[60.4437,45.1552]])
    }
    for(var i=0;i<50;i++){
      routes.push([[40+120*Math.random(),10+60*Math.random()],[70.4437,48.1552]])
    }
    //拉美洲
    for(var i=0;i<100;i++){
      routes.push([[-80+60*Math.random(),-60+120*Math.random()],[60.4437,45.1552]])
    }
    //北美洲
    for(var i=0;i<100;i++){
      routes.push([[-120+80*Math.random(),20+70*Math.random()],[75.4437,45.1552]])
    }
    echarts.registerMap('world',data[0]);
    chart1.clear();
    chart1.setOption(option={
      roam:true,
      title: {
        show:false,
        textStyle:{
          color:'rgb(255,255,255)',
          fontFamily:'Arial',
          fontWeight:'lighter',
          fontSize:20
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: function (params) {
          var value = params.value?params.value.toLocaleString():0;
          return params.name + ' : ' + value;
        }
      },
      visualMap: {
        min: 0,
        max: 1000,
        left:850,
        itemWidth:30,
        itemHeight:200,
        seriesIndex: [0],
        calculable: true,
        formatter: '{value}',
        text:['High','Low'],
        backgroundColor:'rgba(13,27,60,0.5)',
        borderColor:'rgba(0,0,0,1)',
        padding:20,
        color:['rgba(157,122,255,0.5)','rgba(97, 118, 245,.5)','rgba(103, 151, 248,0.5)','rgba(111, 191, 252,0.5)','rgb(2, 45, 88)'],
        textStyle:{
          fontSize:20,
          color:'#98AACC'
        }
      },
      geo: {
        show:true,
        center:[48.4437,48.1552],
        zoom:5,
        scaleLimit:{
          min:1,
          max:25},
        label: {
          normal: {
            show: true,
            textStyle: {
              color: 'rgb(75, 127, 175)',
              fontSize:16,
            },
            formatter:function(params){
              console.log(params);
              return ''
            }
          }
        },
        regions:[{
          name: 'Almaty',
          itemStyle:{
              borderColor:'rgba(255,255,255,0.5)',
              borderWidth:2
          },
          label:{
            show:false
          }
        },{
          name: 'Aqmola',
          itemStyle:{
            borderColor:'rgba(255,255,255,0.5)',
            borderWidth:2
          },
          label:{
            show:false
          }
        },{
          name: 'Qostanay',
          itemStyle:{
            borderColor:'rgba(255,255,255,0.5)',
            borderWidth:2
          },
          label:{
            show:false
          }
        },{
          name: 'Qaraghandy',
          itemStyle:{
            borderColor:'rgba(255,255,255,0.5)',
            borderWidth:2
          },
          label:{
            show:false
          }
        },{
          name: 'Pavlodar',
          itemStyle:{
            borderColor:'rgba(255,255,255,0.5)',
            borderWidth:2
          },
          label:{
            show:false
          }
        },{
          name: 'Aqtöbe',
          itemStyle:{
            borderColor:'rgba(255,255,255,0.5)',
            borderWidth:2
          },
          label:{
            show:false
          }
        },{
          name: 'East Kazakhstan',
          itemStyle:{
            borderColor:'rgba(255,255,255,0.5)',
            borderWidth:2
          },
          label:{
            show:false
          }
        },{
          name: 'Zhambyl',
          itemStyle:{
            borderColor:'rgba(255,255,255,0.5)',
            borderWidth:2
          },
          label:{
            show:false
          }
        },{
          name: 'West Kazakhstan',
          itemStyle:{
            borderColor:'rgba(255,255,255,0.5)',
            borderWidth:2
          },
          label:{
            show:false
          }
        },{
          name: 'Atyrau',
          itemStyle:{
            borderColor:'rgba(255,255,255,0.5)',
            borderWidth:2
          },
          label:{
            show:false
          }
        },{
          name: 'Mangghystau',
          itemStyle:{
            borderColor:'rgba(255,255,255,0.5)',
            borderWidth:2
          },
          label:{
            show:false
          }
        },{
          name: 'Qyzylorda',
          itemStyle:{
            borderColor:'rgba(255,255,255,0.5)',
            borderWidth:2
          },
          label:{
            show:false
          }
        },{
          name: 'South Kazakhstan',
          itemStyle:{
            borderColor:'rgba(255,255,255,0.5)',
            borderWidth:2
          },
          label:{
            show:false
          }
        },{
          name: 'North Kazakhstan',
          itemStyle:{
            borderColor:'rgba(255,255,255,0.5)',
            borderWidth:2
          },
          label:{
            show:false
          }
        }],
        itemStyle:{
          normal:{
            borderColor: 'rgba(75, 127, 175,0.4)',
            areaColor:'rgb(2, 45, 88)',
            borderWidth:2,
          }
        },
        type: 'map',
        map: 'world',
        top:60,
      },
      series: [{
        type: 'map',
        geoIndex: 0,
        data: tempData
      },
        {
          type: 'lines',
          coordinateSystem: 'geo',
          data: routes,
          large: true,
          effect:{
            show:true,
            period:3,
            constantSpeed:300,
            symbolSize:5,
            trailLength:0,
            large:true
          },
          largeThreshold: 5000,
          lineStyle: {
            normal: {
              color:'rgba(152, 170, 204,.4)',
              opacity: 1,
              width: 0.5,
              curveness: 0.3
            }
          },
          // 设置混合模式为叠加
          blendMode: 'lighter'
        }]
    });
  })
}
function dispose(){
  chart1.dispose();
}
export default{
  init:init,
  setDom:setDom,
  dispose:dispose
};
