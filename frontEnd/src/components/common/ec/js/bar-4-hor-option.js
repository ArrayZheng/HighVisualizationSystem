// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入柱状图,饼图
require('echarts/lib/chart/bar');

// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');
let myChart_leftBottomSingleBar1 = '',
	myChart_leftBottomSingleBar2 = '',
	myChart_leftBottomSingleBar3 = '',
	myChart_leftBottomSingleBar4 = '';
let data = [{
	name: 'Policía',
	value: 4830
}, {
	name: 'Bomberos',
	value: 6753
}, {
	name: 'tráfico',
	value: 4830
}, {
	name: 'Médicols',
	value: 4830
}];
let option_leftBottomSingleBar = {
	grid: {
		left: 0,
		right: 0,
		top: 65
	},
	yAxis: {
		tyoe: 'category',
		data: ['Médicos' /*, 'Tráfic', 'Bomberos','Policía'*/ ],
		show: false,
		axisLine: {
			show: false
		},
		axisTick: {
			show: false
		},

	},
	xAxis: {
		type: 'value',
		splitLine: {
			show: false
		},
		show: false
	},
	//animationDurationUpdate: 100,
	series: [{
		barWidth: 24,
		type: 'bar',
		itemStyle: {
			normal: {
				color: 'rgba(204, 204, 204,0.1)'
			}
		},
		label: {
			normal: {
				show: false,
				position: [0, -20],
			}
		},
		silent: true,
		barGap: '-100%', // Make series be overlap
		data: [100]
	}, {
		type: 'bar',
		barWidth: 24,
		z: 11,
		data: [{
			value: 0,
			itemStyle: {
				normal: {
					label: {
						show: false
					},
					color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
						offset: 1,
						color: '#00beaa'
					}, {
						offset: 0,
						color: 'rgba(0, 190, 170,0.1)'
					}])
				}
			}
		}]
	}]
};
let option_leftBottonSingleBar2_series = {
	type: 'bar',
	barWidth: 24,
	z: 10,
	data: [{
		value: 0,
		itemStyle: {
			normal: {
				label: {
					show: false
				},
				color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
					offset: 1,
					color: '#ffd885'
				}, {
					offset: 0,
					color: 'rgba(255, 216, 133,0.2)'
				}])
			}
		}
	}]
};
let option_leftBottonSingleBar3_series = {
	type: 'bar',
	barWidth: 24,
	z: 10,
	data: [{
		value: 0,
		itemStyle: {
			normal: {
				label: {
					show: false
				},
				color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
					offset: 1,
					color: '#7ec1f6'
				}, {
					offset: 0,
					color: 'rgba(126, 193, 246,0.2)'
				}])
			}
		}
	}]
};
let option_leftBottonSingleBar4_series = {
	type: 'bar',
	barWidth: 24,
	z: 10,
	data: [{
		value: 0,
		itemStyle: {
			normal: {
				label: {
					show: false
				},
				color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
					offset: 1,
					color: '#ff888d'
				}, {
					offset: 0,
					color: 'rgba(255, 136, 141,0.2)'
				}])
			}
		}
	}]
};

function clone(obj) {
	var o;
	if(typeof obj == "object") {
		if(obj === null) {
			o = null;
		} else {
			if(obj instanceof Array) {
				o = [];
				for(var i = 0, len = obj.length; i < len; i++) {
					o.push(clone(obj[i]));
				}
			} else {
				o = {};
				for(var j in obj) {
					o[j] = clone(obj[j]);
				}
			}
		}
	} else {
		o = obj;
	}
	return o;
}

function setDom() {
	myChart_leftBottomSingleBar1 = echarts.init(document.getElementById('single_bar1'));
	myChart_leftBottomSingleBar2 = echarts.init(document.getElementById('single_bar2'));
	myChart_leftBottomSingleBar3 = echarts.init(document.getElementById('single_bar3'));
	myChart_leftBottomSingleBar4 = echarts.init(document.getElementById('single_bar4'));

}

function init(param_data) {
	if(param_data) {
		data = param_data;
	}
	let dataPercentRandoms = [
		(data[0].valueTotal==0?0:(data[0].valueUse / data[0].valueTotal * 100).toFixed(2)), 
		(data[1].valueTotal==0?0:(data[1].valueUse / data[1].valueTotal * 100).toFixed(2)), 
		(data[2].valueTotal==0?0:(data[2].valueUse / data[2].valueTotal * 100).toFixed(2)), 
		(data[3].valueTotal==0?0:(data[3].valueUse / data[3].valueTotal * 100).toFixed(2))];
	$('#left_bottom .bar4to1').each(function(idx) {
		$(this).find('.green').html(data[idx].valueUse);
		$(this).find('.yellow').html(data[idx].valueUse);
		$(this).find('.blue').html(data[idx].valueUse);
		$(this).find('.red').html(data[idx].valueUse);
		$(this).find('.xline .chart_text span').html(dataPercentRandoms[idx] + '%');
		$(this).find('.bot_left .chart_text').html("/"+data[idx].valueTotal);
	})
	var option_leftBottomSingleBar2 = clone(option_leftBottomSingleBar),
		option_leftBottomSingleBar3 = clone(option_leftBottomSingleBar),
		option_leftBottomSingleBar4 = clone(option_leftBottomSingleBar);
	option_leftBottomSingleBar.series[1].data[0].value = dataPercentRandoms[0];

	option_leftBottonSingleBar2_series.data[0].value = dataPercentRandoms[1];
	option_leftBottomSingleBar2.series[1] = option_leftBottonSingleBar2_series;

	option_leftBottonSingleBar3_series.data[0].value = dataPercentRandoms[2];
	option_leftBottomSingleBar3.series[1] = option_leftBottonSingleBar3_series;

	option_leftBottonSingleBar4_series.data[0].value = dataPercentRandoms[3];
	option_leftBottomSingleBar4.series[1] = option_leftBottonSingleBar4_series;

	myChart_leftBottomSingleBar1.setOption(option_leftBottomSingleBar);
	myChart_leftBottomSingleBar2.setOption(option_leftBottomSingleBar2);
	myChart_leftBottomSingleBar3.setOption(option_leftBottomSingleBar3);
	myChart_leftBottomSingleBar4.setOption(option_leftBottomSingleBar4);

}
/*module.exports={
	init:init
}*/
function dispose(){
	myChart_leftBottomSingleBar1.dispose()
	myChart_leftBottomSingleBar2.dispose()
	myChart_leftBottomSingleBar3.dispose()
	myChart_leftBottomSingleBar4.dispose()
}
export default {
	init: init,
	setDom: setDom,
	dispose:dispose
}