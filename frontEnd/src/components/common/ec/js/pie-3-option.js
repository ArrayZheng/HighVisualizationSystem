// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入柱状图,饼图
require('echarts/lib/chart/pie');

// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');


let data=[{name:'Normal',value:68},{name:'Inválido',value:56},{name:'Consulta',value:77}]
let myChart_rightMid1='',myChart_rightMid2='',myChart_rightMid3='';
let labelCalcVal = {
    normal : {
        label : {
            formatter : function (params){
                return params.value + '%'
            },
            textStyle: {
                baseline : 'top'
            }
        }
    },
}
let option_rightMid = {
	backgroundColor:'rgba(0,0,0,0)',
    tooltip : {
    	show:false,
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    series : [
        {
        	hoverAnimation:false,
    		avoidLabelOverlap: false,
            name:'统计数据',
            type:'pie',
            center:['50%','60%'],
            radius : ['70%','80%'],
            data:[
                {value:68, name:'Normal',itemStyle:{
                    normal:{
                        color:'#1abb9c',
                         label : {
                            show : true,
                            position: 'center',
                            textStyle:{
                                color:'#fff',
                                fontSize:64
                            }
        },
                    }
                    
                }},
                {value:32, name:'Others',itemStyle:{normal:{label:{show:false},color:"rgba(26, 187, 156 ,0.4)"}}}
            ],
            roseType: 'radius',
            label: {
                normal: {
                    show:true,
                    textStyle: {
                        color: '#fff'
                    },
                    position:'center'
                }
            },
            itemStyle: labelCalcVal,
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
                return Math.random() * 200;
            }
        }
    ]
};

let option_rightMid2_series_data=[
	{value:56, name:'Inválido',itemStyle:{
                    normal:{
                        color:'#8b98ae',
                         label : {
                            show : true,
                            position: 'center',
                            textStyle:{
                                color:'#fff',
                                fontSize:64
                            }}}}},
    {value:44, name:'Others',itemStyle:{normal:{label:{show:false},color:"rgba(139, 152, 174,0.2)"}}}] 

//设置右中三
let option_rightMid3_series_data =[
	{value:77, name:'Consulta',itemStyle:{
                    normal:{
                        color:'#7ec1f6',
                         label : {
                            show : true,
                            position: 'center',
                            textStyle:{
                                color:'#fff',
                                fontSize:64
                            }}}}},
    {value:23, name:'Others',itemStyle:{normal:{label:{show:false},color:"rgba(126, 193, 246,0.2)"}}}]; 
function clone(obj) {  
    var o;  
    if (typeof obj == "object") {  
        if (obj === null) {  
            o = null;  
        } else {  
            if (obj instanceof Array) {  
                o = [];  
                for (var i = 0, len = obj.length; i < len; i++) {  
                    o.push(clone(obj[i]));  
                }  
            } else {  
                o = {};  
                for (var j in obj) {  
                    o[j] = clone(obj[j]);  
                }  
            }  
        }  
    } else {  
        o = obj;  
    }  
    return o;  
}
function setDom(){
	 myChart_rightMid1 = echarts.init(document.getElementById('right_mid1'));
	 myChart_rightMid2 = echarts.init(document.getElementById('right_mid2'));
	 myChart_rightMid3 = echarts.init(document.getElementById('right_mid3'));
}
function dispose(){
	myChart_rightMid1.dispose()
	myChart_rightMid2.dispose()
	myChart_rightMid3.dispose()
}
function init(param_data){
	if(param_data){
		data=param_data;
	}
	var dataRandoms=[50+Math.ceil(50*Math.random()),50+Math.ceil(50*Math.random()),50+Math.ceil(50*Math.random())];
	
	var option_rightMid2=clone(option_rightMid),option_rightMid3=clone(option_rightMid);
	option_rightMid2.series[0].data=option_rightMid2_series_data;
	option_rightMid3.series[0].data=option_rightMid3_series_data;
	option_rightMid.series[0].data[0].value=data[0].value,option_rightMid.series[0].data[1].value=100-data[0].value;
	option_rightMid2.series[0].data[0].value=data[1].value,option_rightMid2.series[0].data[1].value=100-data[1].value;
	option_rightMid3.series[0].data[0].value=data[2].value,option_rightMid3.series[0].data[1].value=100-data[2].value;
  myChart_rightMid1.setOption(option_rightMid);
  myChart_rightMid2.setOption(option_rightMid2);
  myChart_rightMid3.setOption(option_rightMid3);
		
	/*$('.chart3to1').each(function(idx){
		$(this).find('.chart3to1No').html(dataRandoms[idx]);
	})*/
}
export default {
	init :init,
	setDom:setDom,
	dispose:dispose
}
