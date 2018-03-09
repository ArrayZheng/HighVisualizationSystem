<template>
	<div class="widget">
		<div class="title">
			<div class="imgbar"></div>
			<div class="imgenlarge"></div>
			<span class="title_name"> {{$t('alarm.pieSemi.name')}}</span>
		</div>
		<div class="chart" id="left-top"></div>
		<div class="self-lengend">
			<div class="legend border-green">
				<span class="legend-text">{{$t('alarm.pieSemi.processed')}}</span>
				<span class="legend-value" id="pieSemiOptValue1">327</span>
			</div>
			<div class="legend border-yellow">
				<span class="legend-text">{{$t('alarm.pieSemi.processing')}}</span>
				<span class="legend-value" id="pieSemiOptValue2">96</span>
			</div>
		</div>
	</div>
</template>

<script>
	import pieSemiOpt from './js/pie-semi-option.js'
	import config from './../../../../static/config/config.js'
	import locales from '../../../locales/alarm'
	export default {
		locales,
		name: 'left-top',
		data() {
			return {
				socket:io(config.serverAddress),
				data: [{
					name: this.$t('alarm.pieSemi.processed'),
					value: 0
				},{
					name: this.$t('alarm.pieSemi.processing'),
					value: 0
				}],
				setintervel: ''
			}
		},
		methods: {
			injectData() {
				let that = this;
				this.data = [{
					name: 'Despachado',
					value: Math.ceil(0)
				}, {
					name: 'Procesando',
					value: Math.ceil(0)
				}];
				this.init(this.data);
			},
			init: pieSemiOpt.init,
			setDom: pieSemiOpt.setDom,
			socketIo() {
				let that = this;
				that.socket.on('alarm info client', function(msg) {
					if(msg.name == "state-refresh") {
						that.initHttpGetData();
					}
				});
			},
			systemTime() {
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
				return {
					startTime: yymmdd + " 00:00:00",
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
				var startTime = that.systemTime().startTime
				var endTime = that.systemTime().endTime;
//        var startTime = "2017-11-01 00:00:00";
//        var endTime = "2017-11-20 23:59:59"
				$.ajax({
					url: config.alarmServer_alarm_state,
					type: 'post',
					dataType: 'JSON',
					crossDomain: true,
					data: JSON.stringify({
						"startTime": startTime,
						"endTime": endTime
					}),
					success: function(data) {
						if(data.code=="0000"){
							that.data[0].value=data.mess["processed"];
							that.data[1].value=data.mess["processing"];
						}
						that.init(that.data,that.$t('alarm.pieSemi.total'));

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
						}, response.body.alarmState.loopTimeChosen.val * 1000)
					}
				}, function(err) {
					console.log(err)
				});
			},
		},

		mounted() {
			this.setDom();
			this.initHttpGetData();
			this.socketIo();
		},
		beforeDestroy() {
			var that = this;
			that.socket.close();
			window.clearInterval(that.setintervel);
			pieSemiOpt.dispose();
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

	.widget .self-lengend {
		position: absolute;
		bottom: 60px;
		height: 50px;
		width: calc(100% - 100px);
		padding: 0 50px;
	}

	.widget .self-lengend .legend {
		position: relative;
		display: inline-block;
		height: calc(100% - 5px);
		width: 346px;
		margin-right: 66px;
		color: #fff;
		font-size: 38px;
	}

	.widget .self-lengend .border-green {
		border-bottom: 9px #00beaa solid;
	}

	.widget .self-lengend .border-red {
		border-bottom: 9px #ff888d solid;
	}

	.widget .self-lengend .border-yellow {
		margin-right: 0;
		border-bottom: 9px #ffd885 solid;
	}

	.widget .self-lengend .legend-text {
		position: absolute;
		bottom: 20px;
		left: 0px;
	}

	.widget .self-lengend .legend-value {
		position: absolute;
		bottom: 20px;
		right: 0px;
	}
</style>
