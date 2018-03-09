<template>
	<div class="widget">
		<div class="title">
			<div class="imgbar"></div>
			<div class="imgenlarge"></div>
			<span class="title_name"> {{$t('alarm.barVer.name')}}</span>
		</div>
		<div class="chart" id="right-top"></div>
	</div>
</template>

<script>
	import barVerOp from './js/bar-ver-option.js'
	import config from './../../../../static/config/config.js'
	const socket = io(config.serverAddress);
	import locales from '../../../locales/alarm'
	export default {
		locales,
		name:'right-top',
		data(){
			return{
				data:[],
				setintervel:''
			}
		},
		methods:{
			injectData(){
				let that=this;
				this.data=[{name:'Area1',value:(Math.ceil(Math.random()*100))},{name:'Area2',value:(Math.ceil(Math.random()*100))},{name:'Area3',value:(Math.ceil(Math.random()*100))},
				{name:'Area4',value:(Math.ceil(Math.random()*100))},{name:'Area5',value:(Math.ceil(Math.random()*100))}];
				this.init(this.data);
			},
			init:barVerOp.init,
			setDom:barVerOp.setDom,
			socketIo() {
				let that=this;
				socket.on('alarm info client', function(msg) {
					if(msg.name=="area-refresh"){
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
				var startTime = that.systemTime(response.body.alarmArea.statisticalTimeChosen.val * 1).startTime
				var endTime = that.systemTime().endTime;
				$.ajax({
					url: config.alarmServer_alarm_area,
					type: 'post',
					dataType: 'JSON',
					crossDomain: true,
					data: JSON.stringify({
						"startTime": startTime,
						"endTime": endTime,
						"areaCount":100
					}),
					success: function(data) {
						if(data.code === "0000") {
								response.body.alarmArea.area.arrays.forEach(function(itemx,idx){
									data.mess.incidentList.forEach(function(item, id) {
									if(item.areaName==itemx.areaName){
										that.data.push({name:item.areaName,value:item.incidentCount})
									}
								})
							})
							that.init(that.data);
						}
					}
				})
			},
			initHttpGetData() {
				var that=this;
				this.$http.get(config.serverAddress+'/readAlarmConfiguration').then(function(response) {
					if(response.body) {
						that.data=[];
						that.setDataFromAlarmImp(response);
						window.clearInterval(that.setintervel);
						that.setintervel = setInterval(function() {
							that.data=[];
							that.setDataFromAlarmImp(response);
						}, response.body.alarmArea.loopTimeChosen.val * 1000)
					}
				}, function(err) {
					console.log(err)
				});
			},
		},
		mounted(){
			this.setDom();
			//this.injectData();
			this.initHttpGetData();
			this.socketIo();
		},
    beforeDestroy(){
      var that=this;
      window.clearInterval(that.setintervel);
      barVerOp.dispose();
    }
	}
</script>

<style scoped>
	.widget{
		position: relative;
		margin-bottom: 45px;
		width:1320px;
		height: 743px;
		z-index: 999;
		text-align: center;
	  	background-color: rgba(13, 27, 60,0.8);/* IE9、标准浏览器、IE6和部分IE7内核的浏览器(如QQ浏览器)会读懂 */
	}
	.widget .title{
		padding: 41px 0 41px 0 ;
		height: 38px;
		text-align: initial;
	}
	.widget .title:before {
	    content: '';
	    z-index: 998;
	    position: absolute;
	    width: 100%; height: 3px;
	    top: 120px;
	 }
	.widget .title:before {
	    background: -webkit-linear-gradient(right, rgba(40, 73, 108,1), rgba(68, 65, 136,0)); /* Safari 5.1 - 6.0 */
	    background: -o-linear-gradient(right, rgba(40, 73, 108,1), rgba(68, 65, 136,0)); /* Opera 11.1 - 12.0 */
	    background: -moz-linear-gradient(right, rgba(40, 73, 108,1), rgba(68, 65, 136,0)); /* Firefox 3.6 - 15 */
	    background: linear-gradient(to right, rgba(40, 73, 108,1),rgba(68, 65, 136,0.2)); /* 标准的语法（必须放在最后） */
	    }
	.widget .title .title_name{
		margin-left: 146px;
		font-size: 38px;
		color:#fff;
	}
	.widget .title .imgbar{
		display: inline-block;
		position: absolute;
		left: 50px;
		background: url(../../../assets/images/window.png) no-repeat;
		background-size: 100%;
		width: 55px;
		height: 48px;
	}
	.widget .title .imgenlarge{
		display: inline-block;
		position: absolute;
		right: 40px;
		background: url(../../../assets/images/enlarge.png) no-repeat;
		background-size: 100%;
		width: 42px;
		height: 42px;
	}
	.widget .chart{
		padding: 10px ;
		height: 590px;
	}
</style>
