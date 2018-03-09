<template>
	<div class="widget">
		<div class="title">
			<div class="imgbar"></div>
			<div class="imgenlarge"></div>
			<span class="title_name"> {{$t('alarm.pie3.name')}}</span>
		</div>
		<div class="chart">
			<div class="chart3to1">
				<div class="realchart" id="right_mid1">

				</div>
				<div class="charttext">
					<span id="">
						{{data[0].name}}
					</span>
					<span class='chart3to1No' id="normal">
						{{data[0].val}}
					</span>
				</div>
			</div>
			<div class="chart3to1">
				<div class="realchart" id="right_mid2">

				</div>
				<div class="charttext">
					<span id="">
						{{data[1].name}}
					</span>
					<span class='chart3to1No' id="">
						{{data[1].val}}
					</span>
				</div>
			</div>
			<div class="chart3to1">
				<div class="realchart" id="right_mid3">

				</div>
				<div class="charttext">
					<span id="">
						{{data[2].name}}
					</span>
					<span class='chart3to1No' id="">
						{{data[2].val}}
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import pie3option from './js/pie-3-option.js'
	import config from './../../../../static/config/config.js'
	const socket = io(config.serverAddress);
	import locales from '../../../locales/alarm'
	export default {
		locales,
		name: 'right-mid',
		data() {
			return {
				data: [{
					name: this.$t('alarm.pie3.normal'),
					value: 0,
					val:0
				}, {
					name: this.$t('alarm.pie3.invalid'),
					value: 0,
					val:0
				}, {
					name: this.$t('alarm.pie3.consult'),
					value: 0,
					val:0
				}]
			}
		},
		methods: {
			injectData() {
				let that = this;
				this.data = [{
					name: 'Normal',
					value: 0
				}, {
					name: 'Inválido',
					value: 0
				}, {
					name: 'Consultar',
					value: 0
				}];
				this.init(this.data);
			},
			init: pie3option.init,
			setDom: pie3option.setDom,
			socketIo() {
				let that = this;
				socket.on('alarm info client', function(msg) {
					if(msg.name == "type-pie-refresh") {
						that.initHttpGetData();
					}
				});
			},
			systemTime(lastDay) {
				//获取系统时间。  
				var dateTime = new Date();
				var hh = dateTime.getHours();
				var mm = dateTime.getMinutes();
				var ss = dateTime.getSeconds();
				var year = dateTime.getFullYear();
				var month = dateTime.getMonth() + 1;
				var day = dateTime.getDate();
				hh = this.extra(hh);
				mm = this.extra(mm);
				ss = this.extra(ss);
				month = this.extra(month)
				day = this.extra(day);
				var hhmmss = hh + ":" + mm + ":" + ss;
				var yymmdd = year + "/" + month + "/" + day;
				var startTime = '';
				if(lastDay) {
					var lastDateTime = dateTime;
					var lastDayTime = lastDateTime.getTime() - lastDay * 24 * 60 * 60 * 1000;
					lastDateTime.setTime(lastDayTime);
					var hh = lastDateTime.getHours();
					var mm = lastDateTime.getMinutes();
					var ss = lastDateTime.getSeconds();
					var year = lastDateTime.getFullYear();
					var month = lastDateTime.getMonth() + 1;
					var day = lastDateTime.getDate();
					hh = this.extra(hh);
					mm = this.extra(mm);
					ss = this.extra(ss);
					month = this.extra(month)
					day = this.extra(day);
					var hhmmss = "00:00:00";
					var yymmdd = year + "/" + month + "/" + day;
					startTime = yymmdd + " " + hhmmss;
				}
				return {
					startTime: startTime,
					endTime: yymmdd + " " + hhmmss
				};
			},
			extra(x) {
				if(x < 10) {
					return "0" + x;
				} else {
					return x;
				}
			},
			setDataFromAlarmImp(response) {
				var that = this;
				var startTime = that.systemTime(response.body.alarmTypePie.statisticalTimeChosen.val * 1).startTime
				var endTime = that.systemTime().endTime;
				$.ajax({
					url: config.alarmServer_alarm_reType,
					type: 'post',
					dataType: 'JSON',
					crossDomain: true,
					data: JSON.stringify({
						"startTime": startTime,
						"endTime": endTime
					}),
					success: function(data) {
						if(data.code === "0000") {
							var normal=0,invalido=0,consulta=0,total=0;
							data.mess.incidentList.forEach(function(item, id) {
								if(item.callType == "Normal") {
									normal=item.incidentCount;
								} else if(item.callType == "Consultar"||item.callType == "Registro de tipos de alarma") {
									consulta+=item.incidentCount;
								} else if(item.callType == "La situación de invalidez") {
									invalido+=item.incidentCount;
								}
								total+=item.incidentCount;
							})
							that.data[0].val=normal;
							that.data[1].val=invalido;
							that.data[2].val=consulta;
							that.data[0].value=(normal/total*100).toFixed(2);
							that.data[1].value=(invalido/total*100).toFixed(2);
							that.data[2].value=(consulta/total*100).toFixed(2);
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
						that.setintervel = setInterval(function() {
							that.setDataFromAlarmImp(response);
						}, response.body.alarmTypePie.loopTimeChosen.val * 1000)
					}
				}, function(err) {
					console.log(err)
				});
			},
		},
		mounted() {
			this.setDom();
			//this.injectData();
			this.initHttpGetData();
			this.socketIo();
		},
		beforeDestroy() {
			var that = this;
			window.clearInterval(that.setintervel);
			pie3option.dispose();
		}
	}
</script>

<style scoped>
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
	
	.widget .chart3to1 {
		height: 100%;
		width: 30%;
		display: inline-block;
	}
	
	.widget .chart3to1 .realchart {
		height: 365px;
	}
	
	.widget .chart3to1 .charttext {
		font-size: 42px;
		color: #fff;
		text-align: center;
		/*border:1px solid gold;*/
		margin-top: 43px;
	}
	
	.widget .chart3to1 .charttext .chart3to1No {
		font-size: 60px;
		color: #fff;
	}
	
	.widget .chart3to1 span {
		display: block!important;
		margin-bottom: 15px;
	}
</style>