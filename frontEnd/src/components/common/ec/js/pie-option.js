// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入柱状图,饼图
require('echarts/lib/chart/pie');

// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');

let data = [{
		name: 'Temperatura',
		value: 92
	},
	{
		name: 'GPS dela culpa',
		value: 65
	},
	{
		name: 'Cámara oclusión',
		value: 159
	},
	{
		name: 'Cámara sin señal',
		value: 134
	},
	{
		name: 'Tensión anormal',
		value: 134
	}
];
let chart = '',itemGap=0;
let colorArr = [
	{'name':'green','rgb':'rgb(0,190,170)','rgba':'rgba(0,190,170,0.5)'},
	{'name':'yellow','rgb':'rgb(255,216,133)','rgba':'rgba(255, 216, 133,0.5)'},
	{'name':'blue','rgb':'rgb(126,193,246)','rgba':'rgba(126,193,246,0.5)'},
	{'name':'red','rgb':'rgb(255,136,141)','rgba':'rgba(255,136,141,0.5)'},
	{'name':'purple','rgb':'rgb(110,92,195)','rgba':'rgba(110,92,195,0.5)'},
	{'name':'other','rgb':getBGColor().rgb,'rgba':getBGColor().rgba}];
	let option={};

function initOpts(data){
	option={
    tooltip: {
    	show:false,
        trigger: 'item',
        formatter: function(params){
        }
    },
    legend: {
        selectedMode:false,
    	itemGap:itemGap,
    	top:60,
        orient: 'vertical',
        right : 90,
        textStyle:{
        	color:'#fff',
        	fontSize:location.pathname.indexOf('alarm')>0?30:24,
        	fontFamily:'YaHei Consolas Hybrid'
        },
        formatter:function(name){
        	let s=getConfigData(data).longestStr.split("");
        	let a='';
        	for(let i=0;i<s.length;i++){
        		if(i<name.length){
        			s.splice(i,1,name.split("")[i])
        		}else{
        			s.splice(i,1," ")
        		}
        	}
        	s.splice(-1,1,getConfigData(data,name).value);
        	for(let i=0;i<s.length;i++){
        		a+=s[i]
        	}
       		return a;
        },
        data:getConfigData(data).legendName
    },
    calculable : true,
    series: [
    	{
        	silent:true,
        	center:['32%','50%'],
            name:'访问来源',
            type:'pie',
            selectedMode: 'single',
            radius: [0, '27%'],

            label: {
                normal: {
                	show:false,
                    position: 'inner'
                }
            },
            labelLine: {
                normal: {
                    show: false,
                    length:360,
                    length2:20,
                    smooth:true
                }
            },
            data:[
                {
                	value:1, name:'', itemStyle:{normal:{
                     color:'rgba(0, 0, 0,0.2)'
                }},
                tooltip:{
                	show:false
                }
                }
            ]
        },
        {
        	silent:true,
        	center:['32%','50%'],
        	avoidLabelOverlap:true,
            name:'访问来源',
            type:'pie',
            radius: ['32%', '45%'],
            label: {
                normal: {
                	show:false
                }
            }, 
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
                return Math.random() * 200;
            },
            data:[]
        },{
        	
        	center:['32%','50%'],
        	avoidLabelOverlap:true,
            name:'访问来源',
            type:'pie',
            radius: ['45%', '75%'],
            label: {
                normal: {
                	textStyle:{
                		color:'#fff'
                	},
                    position: 'inner'
                }
            }, 
            labelLine: {
                normal: {
                    show: true,
                    length:20,
                    length2:30,
                    smooth:0
                }
            },
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
                return Math.random() * 200;
            },
            data:[]
        
        }
    ]
};
}
function getConfigData(data) {
	var noData = 0,flag=0,emptyFlag=0,
		longestStr = '',
		legendName=[],
		value=0,
		key=arguments[1];
	for(var i = 0; i < data.length; i++) {
		if(data[i].value==0){
			flag++;
		}
		if(data[i].value==1){
			emptyFlag++
		}
		noData += data[i].value;
		legendName.push({name:data[i].name,icon:'circle'});
		if(data[i].name.toString().length > longestStr.length) {
			longestStr = data[i].name;
		}
		if(key==data[i].name){
			value=data[i].value
		}
	}
	return {
		empty: (flag>=3)?(flag==4?1:0):(emptyFlag>=1?0.01:noData / 150),
		//empty: noData / 150,
		total: noData,
		legendName:legendName,
		longestStr:longestStr+'    ',
		value:value
	}
}
function setDom(){
	chart = echarts.init(document.getElementById('pieEc'));
}
function dispose(){
	chart.dispose();
}
function getBGColor () {
	var r=Math.floor(Math.random()*256); 
    var g=Math.floor(Math.random()*256); 
    var b=Math.floor(Math.random()*256); 
    return {'rgb':"rgb("+r+','+g+','+b+")",'rgba':"rgb("+r+','+g+','+b+",0.5)"}
}
function init(param_data, domEc) {
	if(param_data) {
		data = param_data;
		initOpts(data);
	itemGap = Math.ceil(($('#pieEc').height()-30*(data.length+2))/data.length);
	let top = Math.ceil(($('#pieEc').height()-30*(data.length+2))/data.length);
	}
	var rDataArr = new Array();
	var seriesData1 = [],
		seriesData2 = [];
	for(let i = 0; i < data.length; i++) {
		if(i > 5) {
			colorArr.push({
				'name': 'other',
				'rgb': getBGColor().rgb,
				'rgba': getBGColor().rgba
			});
		}
		seriesData1.push({
			value: data[i].value,
			name: '',
			itemStyle: {
				normal: {
					color: colorArr[i].rgba
				}
			}
		});
		seriesData1.push({
			value: getConfigData(data).empty,
			name: '',
			itemStyle: {
				normal: {
					color: 'rgba(0, 0, 0,0)'
				}
			}
		});
		let outside = {
			value: data[i].value,
			name: data[i].name,
			itemStyle: {
				normal: {
					color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
						offset: 1,
						color: colorArr[i].rgb
					}, {
						offset: 0,
						color: colorArr[i].rgba
					}])
				}
			},
			label: {
				normal: {
					position: 'outside',
					formatter: function(params) {
						var percent = (getConfigData(data).total==0)?0:((data[i].value / (getConfigData(data).total) * 100).toFixed(2));
						return percent + '%';
					},
					textStyle: {
						color: colorArr[i].rgb,
						fontSize: 26
					}
				}
			}
		};
		let empty = {
			value: getConfigData(data).empty,
			name: '',
			itemStyle: {
				normal: {
					color: 'rgba(0, 0, 0,0)'
				}
			},
			label: {
				normal: {
					show: false
				}
			},
			tooltip: {
				show: false
			}
		};
			seriesData2.push(outside);
			seriesData2.push(empty);
			rDataArr.push(data[i].value);
			rDataArr.push(getConfigData(data));
	}
	option.series[1].data=seriesData1;
	option.series[2].data=seriesData2;
	
	option.legend.itemGap=Math.ceil(($('#pieEc').height()-30*(data.length+2))/data.length);
	option.legend.top=Math.ceil(($('#pieEc').height()-30*(data.length+2))/data.length);
	chart.setOption(option);
}
module.exports={
	init:init,
	setDom:setDom,
	dispose:dispose
}