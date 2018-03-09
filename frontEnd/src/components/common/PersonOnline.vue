<template>
	<div class="widget">
		<div class="title">
			<div class="imgbar"></div>
			<div class="imgenlarge"></div>
			<span class="title_name">{{$t('index.personOnline.name')}}</span>
		</div>
		<div class="chart">
			<div class="list">
				<div class="position">
					<span>{{$t('index.personOnline.directorOfGuard')}}</span>
				</div>
				<div class="name">
					<span>{{dutyChiefOff.userName}}</span>
				</div>
				<div class="position">
					<span>{{$t('index.personOnline.policeAccept')}}</span>
				</div>
				<div class="name">
					<span>{{seRePoOff.userName}}</span>
				</div>
				<div class="position">
					<span>{{$t('index.personOnline.policeTreatment')}}</span>
				</div>
				<div class="name">
					<span>{{seDiPoOff.userName}}</span>
				</div>
				<div class="position">
					<span>{{$t('index.personOnline.coordinator')}}</span>
				</div>
				<div class="name">
					<span>{{corOff1.userName}}</span>
					<span class="rowmulti">{{corOff2.userName}}</span>
				</div>

			</div>
			<div class="abstract">
				<div class="column row2">
					<div class="item">
						<div seatNo="1" role="receive-police" class="seat receive-police-offline"></div>
						<div seatNo="2" role="receive-police" class="seat receive-police-offline gap-column"></div>
						<div seatNo="3" role="receive-police" class="seat receive-police-offline"></div>
						<div seatNo="7" role="receive-police" class="seat receive-police-offline"></div>
						<div seatNo="8" role="receive-police" class="seat receive-police-offline gap-column"></div>
						<div seatNo="9" role="receive-police" class="seat receive-police-offline"></div>
					</div>
					<div class="item">
						<div seatNo="4" role="receive-police" class="seat receive-police-offline"></div>
						<div seatNo="5" role="receive-police" class="seat receive-police-offline gap-column"></div>
						<div seatNo="6" role="receive-police" class="seat receive-police-offline"></div>
						<div seatNo="10" role="receive-police" class="seat receive-police-offline"></div>
						<div seatNo="20" role="senior-receive-police" class="seat senior-receive-police-offline gap-column"></div>
						<div seatNo="100" role="duty-chief" class="seat duty-chief-offline"></div>
					</div>
				</div>
				<div class="column row3 gap-row">
					<div class="item">
						<div seatNo="30" role="disposal-police" class="seat disposal-police-offline"></div>
						<div seatNo="31" role="disposal-police" class="seat disposal-police-offline  gap-column"></div>
						<div seatNo="32" role="disposal-police" class="seat disposal-police-offline"></div>
						<div seatNo="70" role="medical-police" class="seat medical-police-offline"></div>
						<div seatNo="36" role="disposal-police" class="seat disposal-police-offline  gap-column"></div>
						<div seatNo="37" role="disposal-police" class="seat disposal-police-offline"></div>
						<div seatNo="71" role="medical-police" class="seat medical-police-offline"></div>
						<div seatNo="60" role="traffic-police" class="seat traffic-police-offline  gap-column"></div>
						<div seatNo="61" role="traffic-police" class="seat traffic-police-offline"></div>
					</div>
					<div class="item">
						<div seatNo="33" role="disposal-police" class="seat disposal-police-offline"></div>
						<div seatNo="34" role="disposal-police" class="seat disposal-police-offline gap-column"></div>
						<div seatNo="35" role="disposal-police" class="seat disposal-police-offline"></div>
						<div seatNo="38" role="disposal-police" class="seat disposal-police-offline"></div>
						<div seatNo="39" role="disposal-police" class="seat disposal-police-offline gap-column"></div>
						<div seatNo="40" role="disposal-police" class="seat disposal-police-offline"></div>
						<div seatNo="50" role="fire-control-police" class="seat fire-control-police-offline"></div>
						<div seatNo="51" role="fire-control-police" class="seat fire-control-police-offline gap-column"></div>
						<div seatNo="80" role="senior-disposal-police" class="seat senior-disposal-police-offline"></div>
					</div>
				</div>
				<div class="column row1 gap-row">
					<div class="item flex-end">
						<div seatNo="90" role="coordinator" class="seat coordinator-offline"></div>
					</div>
					<div class="item flex-start">
						<div seatNo="91" role="coordinator" class="seat coordinator-offline"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import locales from "../../locales/general/"
	import config from './../../../static/config/config.js'
	export default {
		locales,
		name: 'left-top',
		data() {
			return {
				socket:io(config.serverAddress),
				data: '',
				setintervel: '',
				seRePoOff: {
					seatState: 3,
					seatInformationNumber: 20,
					userName: ''
				},
				seDiPoOff: {
					seatState: 3,
					seatInformationNumber: 80,
					userName: ''
				},
				corOff1: {
					seatState: 3,
					seatInformationNumber: 90,
					userName: ''
				},
				corOff2: {
					seatState: 3,
					seatInformationNumber: 91,
					userName: ''
				},
				dutyChiefOff: {
					seatState: 3,
					seatInformationNumber: 100,
					userName: ''
				},
			}
		},
		methods: {
			randomOnline() {
				var that = this;
				var reg = /\s+.*line/;
				$('.item div').each(function(idx, item) {
					var className = reg.exec($(item).attr('class'))[0];
					var changeClassName;
					if(className.indexOf('online') > -1) {
						changeClassName = className.replace(/online/, 'offline')
					} else if(className.indexOf('offline') > -1) {
						changeClassName = className.replace(/offline/, 'online')
					}
					if(Math.random() >= 0.5) {
						$(item).removeClass(className).addClass(changeClassName);
					}
				});
			},
			setSeatInfoFromHttpData(item) {
				if(item.seatState == 3) {
					var reg = /\s+.*line/;
					var seatJq = $('.item div[seatNo="' + item.seatInformationNumber + '"]')
					if(seatJq.length>0){
						var className = reg.exec(seatJq.attr('class'))[0];
						if(className.indexOf('online') > -1) {
							var changeClassName = className.replace(/online/, 'offline');
							seatJq.removeClass(className).removeClass(changeClassName).addClass(changeClassName);
						}
					}
					
				} else {
					var reg = /\s+.*line/;
					var seatJq = $('.item div[seatNo="' + item.seatInformationNumber + '"]')
					if(seatJq.length>0){
						var className = reg.exec(seatJq.attr('class'))[0];
						if(className.indexOf('offline') > -1) {
							var changeClassName = className.replace(/offline/, 'online');
							seatJq.removeClass(className).removeClass(changeClassName).addClass(changeClassName);
						}
					}
					
				}
			},
			setDeplicaToOnlyOne(vueData, seatNo, item) {
				var that = this;
				var flag;
				item.seatInformationNumber = seatNo;
				if(item.seatState < 3) {
					vueData.item = item;
					flag = false;
					vueData.notShow = vueData.notShow && flag;
				} else {
					flag = true;
					vueData.notShow = vueData.notShow && flag;
				}
			},
			socketIo() {
				let that = this;
				that.socket.on('general info client', function(msg) {
					if(msg.name == "duty-refresh") {
						that.initHttpGetData();
					}
				});
			},
			initHttpGetData() {
				var that = this;
				that.seRePoOff.seatState = 3, that.seRePoOff.userName = '';
				that.seDiPoOff.seatState = 3, that.seDiPoOff.userName = '';
				that.dutyChiefOff.seatState = 3, that.dutyChiefOff.userName = '';
				that.corOff1.seatState = 3, that.corOff1.userName = '';
				that.corOff2.seatState = 3, that.corOff2.userName = '';
				this.$http.get(config.serverAddress + '/readGeneralConfiguration').then(function(response) {
					if(response.body) {
						$.ajax({
							url: config.alarmServer_alarm_duty,
							type: 'post',
							dataType: 'json',
							success: function(data) {
								if(data && data.code == "0000") {
									data.mess.seatList.forEach(function(item, id) {
										switch(item.roleCode) {
											/*case 1://普通接警员
												that.setSeatInfoFromHttpData(item);
												break;
											case 11://处警
												that.setSeatInfoFromHttpData(item);
												break;
											case 12://消防
												that.setSeatInfoFromHttpData(item);
												break;
											case 13://交警
												break;
											case 14://医疗
												break;*/
											case 21: //高接
												if(item.seatState == 1) {
													$.extend(that.seRePoOff, item);
													that.seRePoOff.seatInformationNumber = 20;
												}
												break;
											case 31: //高处
												if(item.seatState == 1) {
													$.extend(that.seDiPoOff, item);
													that.seDiPoOff.seatInformationNumber = 80;
												}
												break;
											case 41: //协调太复杂
												if(item.seatState == 1) {
													if(that.corOff1.seatState == 3) {
														$.extend(that.corOff1, item);
														that.corOff1.seatInformationNumber = 90;
														break;
													} else if(that.corOff2.seatState == 3) {
														$.extend(that.corOff2, item);
														that.corOff2.seatInformationNumber = 91;
														break;
													}
												}
												if(item.seatInformationNumber == 90) {
													$.extend(that.corOff1, item);
													that.setSeatInfoFromHttpData(item);
												}
												break;
											case 51: //值班主任
												if(item.seatState == 1) {
													$.extend(that.dutyChiefOff, item);
													console.log()
													that.dutyChiefOff.seatInformationNumber = 100;
												}
												break;
											case 99:
												break;
											default: //case(1普通接警员/11处警/12消防/13交警/14医疗)一一匹配
												that.setSeatInfoFromHttpData(item);
												break;
										}
									})

									///接触警生产模式
									
									that.setSeatInfoFromHttpData(that.seRePoOff);
									that.setSeatInfoFromHttpData(that.seDiPoOff);
									that.setSeatInfoFromHttpData(that.corOff1);
									that.setSeatInfoFromHttpData(that.corOff2);
									that.setSeatInfoFromHttpData(that.dutyChiefOff);
									/*if(that.seRePoOff.seatState == 1) {
										that.setSeatInfoFromHttpData(that.seRePoOff);
									}
									if(that.seDiPoOff.seatState == 1) {
										that.setSeatInfoFromHttpData(that.seDiPoOff);
									}
									if(that.corOff1.seatState == 1) {
										that.setSeatInfoFromHttpData(that.corOff1);
									}
									if(that.corOff2.seatState == 1) {
										that.setSeatInfoFromHttpData(that.corOff2);
									}
									if(that.dutyChiefOff.seatState == 1) {
										that.setSeatInfoFromHttpData(that.dutyChiefOff);
									}*/
									///接触警生产模式
								}
							},
							error: function(err) {
								console.log(err)
							}

						})
						window.clearInterval(that.setintervel);
						that.setintervel = setInterval(function() {
							that.seRePoOff.seatState = 3, that.seRePoOff.userName = '';
							that.seDiPoOff.seatState = 3, that.seDiPoOff.userName = '';
							that.dutyChiefOff.seatState = 3, that.dutyChiefOff.userName = '';
							that.corOff1.seatState = 3, that.corOff1.userName = '';
							that.corOff2.seatState = 3, that.corOff2.userName = '';
							$.ajax({
								url: config.alarmServer_alarm_duty,
								type: 'post',
								dataType: 'json',
								success: function(data) {
									if(data && data.code == "0000") {
										data.mess.seatList.forEach(function(item, id) {
											switch(item.roleCode) {
												/*case 1://普通接警员
													that.setSeatInfoFromHttpData(item);
													break;
												case 11://处警
													that.setSeatInfoFromHttpData(item);
													break;
												case 12://消防
													that.setSeatInfoFromHttpData(item);
													break;
												case 13://交警
													break;
												case 14://医疗
													break;*/
												case 21: //高接
													if(item.seatState == 1) {
														$.extend(that.seRePoOff, item);
														that.seRePoOff.seatInformationNumber = 20;
													}
													break;
												case 31: //高处
													if(item.seatState == 1) {
														$.extend(that.seDiPoOff, item);
														that.seDiPoOff.seatInformationNumber = 80;
													}
													break;
												case 41: //协调太复杂
													if(item.seatState == 1) {
														if(that.corOff1.seatState == 3) {
															$.extend(that.corOff1, item);
															that.corOff1.seatInformationNumber = 90;
															break;
														} else if(that.corOff2.seatState == 3) {
															$.extend(that.corOff2, item);
															that.corOff2.seatInformationNumber = 91;
															break;
														}
													}
													if(item.seatInformationNumber == 90) {
														$.extend(that.corOff1, item);
														that.setSeatInfoFromHttpData(item);
													}
													break;
												case 51: //值班主任
													if(item.seatState == 1) {
														$.extend(that.dutyChiefOff, item);
														that.dutyChiefOff.seatInformationNumber = 100;
													}
													break;
												default: //case(1普通接警员/11处警/12消防/13交警/14医疗)一一匹配
													that.setSeatInfoFromHttpData(item);
													break;
											}
										})

										///接触警生产模式
									that.setSeatInfoFromHttpData(that.seRePoOff);
									that.setSeatInfoFromHttpData(that.seDiPoOff);
									that.setSeatInfoFromHttpData(that.corOff1);
									that.setSeatInfoFromHttpData(that.corOff2);
									that.setSeatInfoFromHttpData(that.dutyChiefOff);
										/*if(that.seRePoOff.seatState == 1) {
											that.setSeatInfoFromHttpData(that.seRePoOff);
										}
										if(that.seDiPoOff.seatState == 1) {
											that.setSeatInfoFromHttpData(that.seDiPoOff);
										}
										if(that.corOff1.seatState == 1) {
											that.setSeatInfoFromHttpData(that.corOff1);
										}
										if(that.corOff2.seatState == 1) {
											that.setSeatInfoFromHttpData(that.corOff2);
										}
										if(that.dutyChiefOff.seatState == 1) {
											that.setSeatInfoFromHttpData(that.dutyChiefOff);
										}*/
										///接触警生产模式
									}
								},
								error: function(err) {
									console.log(err)
								}

							})
						}, response.body.duty.loopTimeChosen.val * 1000)
					}
				}, function(err) {
					console.log(err)
				});
			},
		},
		mounted() {
			this.initHttpGetData();
			this.socketIo();
		},
		beforeDestroy() {
			var that = this;
			that.socket.close();
			window.clearInterval(that.setintervel);
		}
	}
</script>

<style scoped>
	@font-face {
		font-family: 'HelveticaNeue-Medium';
		src: url('../../assets/font/HelveticaNeue-Medium.otf');
	}
	
	@font-face {
		font-family: 'HelveticaNeue-Bold';
		src: url('../../assets/font/HelveticaNeue-Bold.otf');
	}
	
	.clearboth {
		clear: both;
	}
	
	.widget {
		position: relative;
		margin-bottom: 45px;
		width: 1320px;
		height: 2319px;
		z-index: 999;
		text-align: center;
		background-color: rgba(13, 27, 60, 0.8);
		/* IE9、标准浏览器、IE6和部分IE7内核的浏览器(如QQ浏览器)会读懂 */
	}
	
	.widget .title {
		padding: 44px 0 44px 0;
		height: 32px;
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
		font-size: 32px;
		color: #fff;
	}
	
	.widget .title .imgbar {
		display: inline-block;
		position: absolute;
		left: 50px;
		background: url(../../assets/images/window.png) no-repeat;
		background-size: 100%;
		width: 55px;
		height: 48px;
	}
	
	.widget .title .imgenlarge {
		display: inline-block;
		position: absolute;
		right: 40px;
		background: url(../../assets/images/enlarge.png) no-repeat;
		background-size: 100%;
		width: 42px;
		height: 42px;
	}
	
	.widget .chart {
		padding: 75px 105px;
	}
	
	.widget .chart .list {
		border-bottom: 3px solid rgba(32, 127, 202, 0.2);
	}
	
	.widget .chart .list .position {
		display: table;
		width: 100%;
		font-size: 36px;
		background-color: rgba(32, 127, 202, 0.2);
		height: 60px;
	}
	
	.widget .chart .list .position span {
		display: table-cell;
		vertical-align: middle;
	}
	
	.widget .chart .list .name {
		padding: 57px 0;
		width: 100%;
		font-size: 50px;
		font-family: 'HelveticaNeue-Medium';
	}
	
	.widget .chart .list .name span {
		display: block !important;
		height: 50px;
	}
	
	.widget .chart .list .name .rowmulti {
		margin-top: 57px;
	}
	
	.widget .chart .abstract {
		height: 910px;
		margin-top: 104px;
		overflow: hidden;
		display: -webkit-flex;
		display: flex;
		flex-wrap: wrap;
		-webkit-flex-wrap: wrap;
		justify-content: space-between;
		-webkit-flex-direction: column;
		flex-direction: column;
	}
	
	.widget .chart .abstract .column {
		overflow: hidden;
		display: -webkit-flex;
		display: flex;
		flex-wrap: wrap;
		-webkit-flex-wrap: wrap;
		justify-content: space-between;
	}
	
	.widget .chart .abstract .item {
		width: 458px;
		display: -webkit-flex;
		display: flex;
		flex-wrap: wrap;
		-webkit-flex-wrap: wrap;
		justify-content: space-between;
		-webkit-justify-content: space-between;
		align-content: space-between;
		-webkit-align-content: space-between;
	}
	
	.gap-row {
		margin-top: 90px;
	}
	
	.gap-column {
		margin: 0 90px
	}
	/*.row2 .online{
		width: 92px;
		height: 105px;
		background-image: url(../../assets/images/receive-police_online.png);
		background-repeat: no-repeat;
	}
	.row2 .offline{
		width: 92px;
		height: 105px;
		background-image: url(../../assets/images/receive-police_offline.png);
		background-repeat: no-repeat;
	}
	.row3 .online{
		width: 92px;
		height: 105px;
		background-image: url(../../assets/images/disposal-police_online.png);
		background-repeat: no-repeat;
	}
	.row3 .offline{
		width: 92px;
		height: 105px;
		background-image: url(../../assets/images/disposal-police_offline.png);
		background-repeat: no-repeat;
	}
	.row1 .offline{
		width: 92px;
		height: 105px;
		background-image: url(../../assets/images/coordinator_online.png);
		background-repeat: no-repeat;
	}
	.row1 .online{
		width: 92px;
		height: 105px;
		background-image: url(../../assets/images/coordinator-offline.png);
		background-repeat: no-repeat;
	}*/
	
	.seat {
		width: 92px;
		height: 105px;
		background-repeat: no-repeat;
	}
	/*接警员*/
	
	.receive-police-online {
		background-image: url(../../assets/images/receive-police_online.png);
	}
	
	.receive-police-offline {
		background-image: url(../../assets/images/receive-police_offline.png);
	}
	/*高级接警员*/
	
	.senior-receive-police-online {
		background-image: url(../../assets/images/senior_receive-police_online.png);
	}
	
	.senior-receive-police-offline {
		background-image: url(../../assets/images/senior_receive-police_offline.png);
	}
	/*值班主任*/
	
	.duty-chief-online {
		background-image: url(../../assets/images/duty_chief_online.png);
	}
	
	.duty-chief-offline {
		background-image: url(../../assets/images/duty_chief_offline.png);
	}
	/*处警员*/
	
	.disposal-police-online {
		background-image: url(../../assets/images/disposal-police_online.png);
	}
	
	.disposal-police-offline {
		background-image: url(../../assets/images/disposal-police_offline.png);
	}
	/*高级处警员*/
	
	.senior-disposal-police-online {
		background-image: url(../../assets/images/senior_disposal-police_online.png);
	}
	
	.senior-disposal-police-offline {
		background-image: url(../../assets/images/senior_disposal-police_offline.png);
	}
	/*医疗*/
	
	.medical-police-online {
		background-image: url(../../assets/images/medical_police_online.png);
	}
	
	.medical-police-offline {
		background-image: url(../../assets/images/medical_police_offline.png);
	}
	/*交通*/
	
	.traffic-police-online {
		background-image: url(../../assets/images/traffic_police_online.png);
	}
	
	.traffic-police-offline {
		background-image: url(../../assets/images/traffic_police_offline.png);
	}
	/*消防*/
	
	.fire-control-police-online {
		background-image: url(../../assets/images/fire-control_police_online.png);
	}
	
	.fire-control-police-offline {
		background-image: url(../../assets/images/fire-control_police_offline.png);
	}
	/*协调员*/
	
	.coordinator-online {
		background-image: url(../../assets/images/coordinator_online.png);
	}
	
	.coordinator-offline {
		background-image: url(../../assets/images/coordinator_offline.png);
	}
	
	.row1 {
		-webkit-flex: 1;
		flex: 1;
	}
	
	.row2 {
		-webkit-flex: 2;
		flex: 2;
	}
	
	.row3 {
		-webkit-flex: 3;
		flex: 3;
	}
	
	.widget .chart .abstract .flex-end {
		display: -webkit-flex;
		display: flex;
		-webkit-justify-content: flex-end;
		justify-content: flex-end;
	}
	
	.widget .chart .abstract .flex-start {
		display: -webkit-flex;
		display: flex;
		-webkit-justify-content: flex-start;
		justify-content: flex-start;
	}
</style>