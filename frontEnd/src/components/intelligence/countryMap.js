// 引入 ECharts 主模块
let echarts = require('echarts/lib/echarts');
// 引入柱状图,饼状图
require('echarts/lib/chart/map');
require('echarts/lib/chart/lines');
require('echarts/lib/chart/scatter');
require('echarts/lib/chart/effectScatter');
require('echarts/lib/component/geo');

// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');
require('echarts/lib/component/visualMap');
let chart1={},chart2={},option={};
let tempData=[
  {name:'Almaty',value:parseInt(Math.random()*1000),itemStyle:{borderColor:'red',borderWidth:1}},
  {name:'Aqmola',value:parseInt(Math.random()*1000),itemStyle:{borderColor:'red)',borderWidth:1}},
  {name:'Qostanay',value:parseInt(Math.random()*1000),itemStyle:{normal:{borderColor:'rgba(255,255,255,0.2)',borderWidth:1}}},
  {name:'Qaraghandy',value:parseInt(Math.random()*1000),itemStyle:{normal:{borderColor:'rgba(255,255,255,0.2)',borderWidth:1}}},
  {name:'Pavlodar',value:parseInt(Math.random()*1000),itemStyle:{normal:{borderColor:'rgba(255,255,255,0.2)',borderWidth:1}}},
  {name:'Aqtöbe',value:parseInt(Math.random()*1000),itemStyle:{normal:{borderColor:'rgba(255,255,255,0.2)',borderWidth:1}}},
  {name:'East Kazakhstan',value:parseInt(Math.random()*1000),itemStyle:{normal:{borderColor:'rgba(255,255,255,0.2)',borderWidth:1}}},
  {name:'Zhambyl',value:parseInt(Math.random()*1000),itemStyle:{normal:{borderColor:'rgba(255,255,255,0.2)',borderWidth:1}}},
  {name:'West Kazakhstan',value:parseInt(Math.random()*1000),itemStyle:{normal:{borderColor:'rgba(255,255,255,0.2)',borderWidth:1}}},
  {name:'Atyrau',value:parseInt(Math.random()*1000),itemStyle:{normal:{borderColor:'rgba(255,255,255,0.2)',borderWidth:1}}},
  {name:'Mangghystau',value:parseInt(Math.random()*1000),itemStyle:{normal:{borderColor:'rgba(255,255,255,0.2)',borderWidth:1}}},
  {name:'Qyzylorda',value:parseInt(Math.random()*1000),itemStyle:{normal:{borderColor:'rgba(255,255,255,0.2)',borderWidth:1}}},
  {name:'South Kazakhstan',value:parseInt(Math.random()*1000),itemStyle:{normal:{borderColor:'rgba(255,255,255,0.2)',borderWidth:1}}},
  {name:'North Kazakhstan',value:parseInt(Math.random()*1000),itemStyle:{normal:{borderColor:'rgba(255,255,255,0.2)',borderWidth:1}}},
  ]
let countryCode;
function setDom(ss){
  chart1 = echarts.init(document.getElementById(ss));
  chart1.on('zoomend', function (params) {
    console.log('1')
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
    /*var routes = data[2].routes.map(function (airline) {
      return [
        getAirportCoord(airline[1]),
        getAirportCoord(airline[2])
      ];
    });*/
    var routes=[
      [[39.9568,43.449928],[48.4437,48.1552]],
      [[49.9568,43.449928],[48.4437,48.1552]],
      [[59.9568,43.449928],[48.4437,48.1552]],
      [[29.9568,43.449928],[48.4437,48.1552]],
      [[19.9568,43.449928],[48.4437,48.1552]],
      [[9.9568,43.449928],[48.4437,48.1552]]
    ];
    var pointData=[{name:"1",value:[61.3987500000,48.4212920000,120]},
      {name:"2",value:[52.2916950000,50.8926380000,120]},
      {name:"3",value:[63.3987500000,48.4212920000,120]},
      {name:"4",value:[49.8264570000,48.6043610000,120]},
      {name:"8",value:[68.3987500000,43.9212920000,120]},
      {name:"9",value:[69.3987500000,44.4212920000,120]},
      {name:"10",value:[49.0566450000,47.6190260000,120]},
      {name:"11",value:[51.9999900000,47.9983550000,120]},
      {name:"16",value:[54.1150390000,44.1482590000,120]},
      {name:"17",value:[58.6039800000,48.6503830000,120]},
      {name:"18",value:[57.8312930000,46.8136550000,120]},
      {name:"19",value:[55.7707960000,49.5922280000,120]},
      {name:"24",value:[60.517299000,45.6131570000,120]},
      {name:"25",value:[62.5777960000,46.3824810000,120]},
      {name:"26",value:[68.3545470000,41.7153290000,120]},
      {name:"31",value:[75.4559040000,45.6647800000,120]},
      {name:"32",value:[81.1590660000,45.8707950000,120]},
      {name:"33",value:[79.9816390000,43.1867090000,120]},
      {name:"34",value:[77.0012770000,44.1217590000,120]},
      {name:"40",value:[78.693828000,48.3569600000,120]},
      {name:"41",value:[85.4640330000,48.8207580000,120]},
      {name:"42",value:[84.6545520000,47.6656530000,120]},
      {name:"43",value:[81.8949570000,47.7401680000,120]},
      {name:"50",value:[64.9694440000,47.1912360000,120]},
      {name:"51",value:[66.8827630000,46.6111790000,120]},
      {name:"52",value:[68.4649310000,49.4964560000,120]},
      {name:"53",value:[70.8933740000,49.4004950000,120]},
      {name:"54",value:[69.6055630000,48.0478110000,120]},
      {name:"59",value:[72.9906660000,50.4456960000,120]},
      {name:"60",value:[78.3994710000,50.3751550000,120]},
      {name:"61",value:[75.6030820000,50.5161310000,120]},
      {name:"62",value:[76.8908930000,51.4911650000,120]},
      {name:"63",value:[74.5143680000,52.4231890000,120]},
      {name:"69",value:[67.2507090000,52.8707880000,120]},
      {name:"70",value:[67.1771200000,54.3583910000,120]},
      {name:"71",value:[70.4886330000,54.8496870000,120]},
      {name:"72",value:[73.1378440000,53.2476340000,120]},
      {name:"78",value:[63.3504820000,49.3524440000,120]},
      {name:"79",value:[67.213915000,49.9021840000,120]},
      {name:"84",value:[53.8206820000,45.1724260000,120]},
      {name:"85",value:[47.7863690000,48.4794270000,120]},
      {name:"86",value:[55.7340010000,47.1410470000,120]},
      {name:"87",value:[56.7642500000,47.9630690000,120]},
      {name:"90",value:[60.7748610000,46.5858160000,120]},
      {name:"91",value:[61.0324230000,44.8330610000,120]},
      {name:"92",value:[64.5279090000,46.0504290000,120]},
      {name:"95",value:[66.8459690000,42.1001410000,120]},
      {name:"96",value:[69.8999200000,42.3735750000,120]},
      {name:"98",value:[67.8762170000,45.3543220000,120]},
      {name:"99",value:[68.7224930000,44.9115550000,120]},
      {name:"101",value:[73.4322010000,45.0421400000,120]},
      {name:"103",value:[70.3046600000,44.0952470000,120]},
      {name:"105",value:[71.7396500000,43.5089490000,120]},
      {name:"106",value:[75.3455200000,44.4389710000,120]},
      {name:"108",value:[77.1852490000,43.2405350000,120]},
      {name:"109",value:[80.0024060000,44.3862220000,120]},
      {name:"111",value:[80.4231740000,47.2163120000,120]},
      {name:"113",value:[83.5507140000,49.8784120000,120]},
      {name:"114",value:[74.6096280000,51.1915700000,120]},
      {name:"116",value:[74.7936010000,53.1813720000,120]},
      {name:"122",value:[63.9391960000,53.8828660000,120]}
    ];
    echarts.registerMap('world',data[0]);
    chart1.clear();
    chart1.setOption({
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
        show:false,
        trigger: 'item',
        formatter: function (params) {
          var value = params.value?params.value.toLocaleString():0;
          return params.name + ' : ' + value;
        }
      },
      visualMap: {
        show:false,
        min: 0,
        max: 1000,
        left:850,
        itemWidth:30,
        itemHeight:200,
        seriesIndex: [0],
        calculable: true,
        formatter: '{value}',
        // color:['rgba(157,117,255,1)','rgba(97, 118, 245,0.5)','rgba(103, 151, 248,0.5)','rgba(111, 191, 252,0.5)','rgba(118, 225, 255,0.5)'],
        color:['rgb(2, 45, 88)'],
        textStyle:{
          color:'rgba(220,220,220,0.6)'
        }
      },
      geo: {
        show:true,
        center:[67.3987500000,48.4212920000],
        zoom:8,
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
        // regions:[{
        //   name: 'Qyzylorda',
        //   itemStyle:{
        //       borderColor:'rgba(255,255,255,0.5)',
        //       borderWidth:2
        //   },
        //   label:{
        //     show:false
        //   }
        // }],
        itemStyle:{
          normal:{
            borderColor: 'rgba(75, 127, 175,0.4)',
            // areaColor:'rgb(2, 45, 88)',
            areaColor:'rgb(20, 45, 88)',
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
        data: tempData,
        itemStyle:{
          color:"red",
        },
      },
        {
          name: 'pm2.5',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          zlevel: 2,
          rippleEffect: {
            brushType: 'stroke'
          },
          // label: {
          //   normal: {
          //     show: true,
          //     position: 'right',
          //     formatter: '{b}'
          //   }
          // },
          data: pointData,
          symbolSize: function (val) {
            return val[2] / 10;
          },
          itemStyle: {
            normal: {
              shadowBlur: 200,
              shadowColor: '#A27DFF',
              // color: 'rgba(14, 241, 242, 0.8)'
              color: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.8,
                colorStops: [{
                  offset: 0, color: 'rgba(255,255,255,1)' // 0% 处的颜色
                }, {
                  offset: 0.3, color: 'rgba(255,255,255,0.8)' // 100% 处的颜色
                }
                  , {
                    offset: 1, color: 'rgb(20, 45, 88)' // 100% 处的颜色
                  }],
                globalCoord: false // 缺省为 false
              }
            }
          }
        },
        // {
        //   type: 'lines',
        //   coordinateSystem: 'geo',
        //   data: routes,
        //   large: true,
        //   largeThreshold: 100,
        //   lineStyle: {
        //     normal: {
        //       color:'rgba(115,122,255,1)',
        //       opacity: 1,
        //       width: 1,
        //       curveness: 0.3
        //     }
        //   },
        //   // 设置混合模式为叠加
        //   blendMode: 'light'
        // }
        ]
    });
  })
}
function setZoom(zoom) {
  var option = chart1.getOption();
  var scale=zoom/8;
  chart1.setOption({
    geo: {
      zoom:zoom,
      label: {
        normal: {
          show:zoom>5?true:false,
          textStyle: {
            fontSize:16*scale,
          },
        }
      },
    },
    series: [
      {
        name: 'pm2.5',
        type: 'effectScatter',
        symbolSize: function (val) {
          return (val[2]*scale)/ 10;
        },
      },

    ]
  });
}
function dispose(){
  chart1.dispose();
}
function setData(pointData) {
  chart1.setOption({
    series: [
      {
        name: 'pm2.5',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        data: pointData,
      },
    ]
  })
}

export default{
  init:init,
  setDom:setDom,
  setData:setData,
  dispose:dispose,
  setZoom:setZoom,
};
