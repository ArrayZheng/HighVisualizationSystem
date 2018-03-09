<template>
	<div class="widget">
		<div class="title">
			<div class="imgbar"></div>
			<div class="imgenlarge"></div>
			<span class="title_name"> {{$t('alarm.bar4.name')}}</span>
		</div>
		<div id="left_bottom" class="chart">
			<div class="chart-padding">
				<div class="bar4to1">
					<div class="yline chart_text">
						<span>{{$t('alarm.bar4.police')}}</span>
					</div>
					<div class="xline">
						<div style="display: table-cell;vertical-align: middle;">
							<div class="xline_text">
								<div class="bot_left">
									<span class="green">0</span>
									<span class="chart_text">0</span>
								</div>
								<div class="chart_text bot_right">
									<span>0</span>
								</div>
								<div class="clearboth"></div>
							</div>
							<div class="xline_realchart" id="single_bar1">

							</div>
						</div>
					</div>
					<div class="clearboth"></div>
				</div>
				<div class="bar4to1">
					<div class="yline chart_text">
						<span>{{$t('alarm.bar4.fire')}}</span>
					</div>
					<div class="xline">
						<div style="display: table-cell;vertical-align: middle;">
							<div class="xline_text">
								<div class="bot_left">
									<span class="yellow">0</span>
									<span class="chart_text">0</span>
								</div>
								<div class="chart_text bot_right">
									<span>0</span>
								</div>
								<div class="clearboth"></div>
							</div>
							<div class="xline_realchart" id="single_bar2">

							</div>
						</div>
					</div>
					<div class="clearboth"></div>
				</div>
				<div class="bar4to1">
					<div class="yline chart_text">
						<span>{{$t('alarm.bar4.traffic')}}</span>
					</div>
					<div class="xline">
						<div style="display: table-cell;vertical-align: middle;">
							<div class="xline_text">
								<div class="bot_left">
									<span class="blue">0</span>
									<span class="chart_text">0</span>
								</div>
								<div class="chart_text bot_right">
									<span>0%</span>
								</div>
								<div class="clearboth"></div>
							</div>
							<div class="xline_realchart" id="single_bar3">

							</div>
						</div>
					</div>
					<div class="clearboth"></div>
				</div>
				<div class="bar4to1">
					<div class="yline chart_text">
						<span>{{$t('alarm.bar4.medical')}}</span>
					</div>
					<div class="xline">
						<div style="display: table-cell;vertical-align: middle;">
							<div class="xline_text">
								<div class="bot_left">
									<span class="red">0</span>
									<span class="chart_text">0</span>
								</div>
								<div class="chart_text bot_right">
									<span>0</span>
								</div>
								<div class="clearboth"></div>
							</div>
							<div class="xline_realchart" id="single_bar4">

							</div>
						</div>
					</div>
					<div class="clearboth"></div>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
	import bar4horOp from './js/bar-4-hor-option.js';
	import config from './../../../../static/config/config.js'
	const socket = io(config.serverAddress);
	import locales from '../../../locales/alarm'
	export default {
		locales,
		name: 'left-bot',
		data() {
			return {
				data: ''
			}
		},
		methods: {
			injectData() {
				let that = this;
				this.data = [{
					name: '',
					valueUse: 0,
					valueTotal: 0
				}, {
					name: '',
					valueUse: 0,
					valueTotal: 0
				}, {
					name: '',
					valueUse: 0,
					valueTotal: 0
				}, {
					name: '',
					valueUse: 0,
					valueTotal: 0
				}];
				this.init(this.data);
			},
			init: bar4horOp.init,
			setDom: bar4horOp.setDom,
			socketIo() {
				let that = this;
				socket.on('alarm info client', function(msg) {
					if(msg.name == "use-refresh") {
						that.initHttpGetData();
					}
				});
			},
			setDataFromAlarmImp(response) {
				var that = this;
				$.ajax({
					url: config.alarmServer_alarm_use,
					type: 'post',
					dataType: 'JSON',
					crossDomain: true,
					success: function(data) {
						if(data.code === "0000") {
							that.data = [{
								name: 'Policía',
								valueUse: data.mess["policeUse"] ? data.mess["policeUse"] : 0,
								valueTotal: data.mess["policeTotal"] ? data.mess["policeTotal"] : 0,
							}, {
								name: 'Bomberos',
								valueUse: data.mess["fireUse"] ? data.mess["fireUse"] : 0,
								valueTotal: data.mess["fireTotal"] ? data.mess["fireTotal"] : 0,
							}, {
								name: 'Tráfico',
								valueUse: data.mess["trafficUse"] ? data.mess["trafficUse"] : 0,
								valueTotal: data.mess["trafficTotal"] ? data.mess["trafficTotal"] : 0,
							}, {
								name: 'Médicos',
								valueUse: data.mess["medicalUse"] ? data.mess["medicalUse"] : 0,
								valueTotal: data.mess["medicalTotal"] ? data.mess["medicalTotal"] : 0,
							}];
							that.init(that.data);
						}
					}
				})
			},
			initHttpGetData() {
				var that = this;
				that.noticeData = [];
				this.$http.get(config.serverAddress + '/readAlarmConfiguration').then(function(response) {
					if(response.body) {
						that.setDataFromAlarmImp(response);
						window.clearInterval(that.setintervel);
						that.setintervel=setInterval(function(){
				        	that.setDataFromAlarmImp(response);
				        },response.body.alarmUse.loopTimeChosen.val*1000)
					}
				}, function(err) {
					console.log(err)
				});
			},
		},
		mounted() {
			this.setDom();
			this.injectData();
			this.initHttpGetData();
			this.socketIo();
		},
		beforeDestroy() {
			var that = this;
			window.clearInterval(that.setintervel);
			bar4horOp.dispose();
		}
	}
</script>

<style scoped>
	.clearboth {
		clear: both;
	}
	
	.green {
		color: #00beaa;
	}
	
	.red {
		color: #ff888d
	}
	
	.blue {
		color: #7ec1f6
	}
	
	.yellow {
		color: #ffd885
	}
	
	.chart_text {
		color: #fff;
	}
	
	.widget {
		position: relative;
		margin-bottom: 45px;
		width: 1320px;
		height: 743px;
		z-index: 999;
		text-align: center;
		background-color: rgba(13, 27, 60, 0.8);
		/* IE9、标准浏览器、IE6和部分IE7内核的浏览器(如QQ浏览器)会读懂 */
	}
	
	.widget .title {
		padding: 41px 0 41px 0;
		height: 38px;
		text-align: initial;
	}
	
	.widget .title:before {
		content: '';
		z-index: 998;
		position: absolute;
		width: 100%;
		height: 3px;
		top: 120px;
	}
	
	.widget .title:before {
		background: -webkit-linear-gradient(right, rgba(40, 73, 108, 1), rgba(68, 65, 136, 0));
		/* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(right, rgba(40, 73, 108, 1), rgba(68, 65, 136, 0));
		/* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(right, rgba(40, 73, 108, 1), rgba(68, 65, 136, 0));
		/* Firefox 3.6 - 15 */
		background: linear-gradient(to right, rgba(40, 73, 108, 1), rgba(68, 65, 136, 0.2));
		/* 标准的语法（必须放在最后） */
	}
	
	.widget .title .title_name {
		margin-left: 146px;
		font-size: 38px;
		color: #fff;
	}
	
	.widget .title .imgbar {
		display: inline-block;
		position: absolute;
		left: 50px;
		background: url(../../../assets/images/window.png) no-repeat;
		background-size: 100%;
		width: 55px;
		height: 48px;
	}
	
	.widget .title .imgenlarge {
		display: inline-block;
		position: absolute;
		right: 40px;
		background: url(../../../assets/images/enlarge.png) no-repeat;
		background-size: 100%;
		width: 42px;
		height: 42px;
	}
	
	.widget .chart {
		padding: 10px;
		height: 590px;
	}
	
	.widget .chart .chart-padding {
		padding: 45px 0;
		height: calc(100% - 80px)
	}
	
	.widget .bar4to1 {
		display: block;
		height: 25%;
		margin-right: 80px;
	}
	
	.widget .chart .bar4to1 .yline {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 25%;
		float: left;
		font-size: 36px;
	}
	
	.widget .chart .bar4to1 .yline span {
		display: table-cell;
		vertical-align: middle;
	}
	
	.widget .chart .bar4to1 .xline {
		display: table;
		height: 100%;
		width: 70%;
		float: right;
	}
	
	.widget .chart .bar4to1 .xline_text {
		text-align: justify;
		font-size: 30px;
	}
	
	.widget .chart .bar4to1 .xline_text .bot_left {
		float: left;
	}
	
	.widget .chart .bar4to1 .xline_text .bot_right {
		float: right;
	}
	
	.widget .chart .bar4to1 .xline_realchart {
		height: 25%;
	}
</style>