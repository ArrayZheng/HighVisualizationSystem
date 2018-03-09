<template>
	<div class="all">
		<div id="allmap"></div>

		<top-nav>
			<span slot="title1">{{$t('alarm.topNav.titleName')}}</span>
			<span slot="title2">{{$t('alarm.topNav.viceTitleName')}}</span>
		</top-nav>

		<div class="content left">
			<pie-semi-ec></pie-semi-ec>
			<pie-ec></pie-ec>
			<bar4-hor-ec></bar4-hor-ec>
		</div>

		<div class="content right">
			<bar-ver-ec></bar-ver-ec>
			<pie3-ec></pie3-ec>
			<video-anchor></video-anchor>
		</div>
	</div>
</template>

<script>
	import topNav from './common/TopNav'
	import PieSemiEc from './common/ec/PieSemiEc'
	import PieEc from './common/ec/PieEc'
	import Bar4HorEc from './common/ec/Bar4HorEc'
	import BarVerEc from './common/ec/BarVerEc'
	import Pie3Ec from './common/ec/Pie3Ec'
	import VideoAnchor from './common/ec/VideoAnchor'
	import locales from '../locales/alarm'
	import socketIO from "./../socketIO"

	import config from './../../static/config/config.js'
	//const socket = io(config.serverAddress);
	export default {
		locales,
		name: 'map',
		data(){
			return{
				setintervel: '',
				cmap:'',
				flash:0
			}
		},
		methods: {
			socketIo() {
				var that=this;
				socketIO.on('alarm-map information client', function(msg) {
					if(that.cmap) {
						var view = that.cmap.getMap().getView();
						view.setCenter(msg.center);
						view.setResolution(msg.resolution / 2);
					}
				});
			},

			getPointType(type) {
				var str = type.substring(0, 2)
				switch(str) {
					case "01":
						return 2;
						break;
					case "02":
						return 3;
						break;
					case "03":
						return 1;
						break;
					case "04":
						return 0;
						break;
				}
			},
			init(response) {
				var that = this;
				var mapDom = document.getElementById('allmap');
				var url = config.arcServerUrl;
				var initOpts = {
					url: url,
					long: -68.18031002592684,
					lat: -16.48472875965662,
					tileSize: 512,
					minZoom: 5,
					maxZoom: 17,
					zoom: 11
				};
				that.cmap = ceiecmap.init(mapDom, initOpts);
				that.socketIo();
				var GISMap={
					center: response.body.GISMap.center,
					resolution: response.body.GISMap.resolution/2
				}
				that.cmap.setViewStuats(GISMap)
				that.setPoints();
			},
			setPoints(){
				var that=this;
				var styleFun = that.cmap.createIconLayerSytleFun({
					zoom: 1,
					anchor: [0.5, 1],
					srcFun: function(feature) {
						var type = feature.get("type");
						if(type == 0) {
							return 'static/images/location-red_small.png';
						} else if(type == 1) {
							return 'static/images/location-blue_small.png';
						} else if(type == 2) {
							return 'static/images/location-yellow_small.png';
						} else {
							return 'static/images/location-green_small.png';
						}
					},
					lableField: ""
				});
				var items = [];
				var points = [];
				var flashColor='';
				$.ajax({
					url: config.alarmServer_alarm_gisMap,
					dataType: 'json',
					type: 'post',
					data: JSON.stringify({
						"topCount": 10
					}),
					async: false,
					success: function(data) {
						if(data.code == "0000") {
							data.mess.incidentList.forEach(function(item, id) {
								if(id ==0) {
									switch(that.getPointType(item.incidentTypeId)){
										case 0:
											flashColor=[255,135,140];
											break;
										case 1:
											flashColor=[126,190,246];
											break;
										case 2:
											flashColor=[255,215,132];
											break;
										case 3:
											flashColor=[0,190,170];
											break;
										default:
											break;
									}
									points.push(ol.proj.fromLonLat([parseFloat(item.longitude), parseFloat(item.latitude)]))
								}
								items.push({
									long: parseFloat(item.longitude),
									lat: parseFloat(item.latitude),
									id: Math.random(),
									type: that.getPointType(item.incidentTypeId)
								})
							})
							/*if(that.flash>10){
								that.flash=0;
							}else{
								that.flash++;
							}*/
						}
					},
					error: function(error) {
						console.log(error);
					}
				})
				that.cmap.pointsFlash(points, 999999, 8,flashColor)
				that.cmap.disPlayCameraLayer({
					list: items,
					cluster: 0,
					fit:0,
					callBack: function(type, feature) {
						if(type == "click") {
							var item = feature.getProperties();
							that.cmap.showPopup({
								data: item,
								poupClickCallbak: function(e) {
									if(e.target.id == "btnReal" || e.target.id == "btnRecord") {
										var data = e.data;
										e.popup.hide()
									}
								},
								html: function(item) {
									switch(item.type) {
										case 0:
											item.name = ' Incidente';
											break;
										case 1:
											item.name = ' Policía';
											break;
										case 2:
											item.name = ' Estación Policía';
											break;
										case 3:
											item.name = ' Centro de comando';
											break;
										default:
											break;
									}
									var html = '<div class="popdiv">' +
										'<span class="title">' + item.name + '</span>' +
										'</div>' +
										'<div class="popdiv">detail:...</div>'
									/*'<button id="btnReal" class="btn btn-primary">RealVideo</button>' +
									'<button id="btnRecord" class="btn btn-primary">PlayRecord</button>';*/
									return html;
								}
							})
						}
					}
				}, styleFun);
			},
			initHttpGetData() {
				var that = this;
				that.noticeData = [];
				this.$http.get(config.serverAddress + '/readAlarmConfiguration').then(function(response) {
					if(response.body) {
						that.init(response);
						window.clearInterval(that.setintervel);
						that.setintervel = setInterval(function() {
							that.setPoints();
						}, 30 * 1000)
					}
				}, function(err) {
					console.log(err)
				});
			},
		},
		components: {
			topNav,
			PieSemiEc,
			PieEc,
			Bar4HorEc,
			BarVerEc,
			Pie3Ec,
			VideoAnchor
		},
		mounted() {
			this.initHttpGetData();
		},
		beforeDestroy() {
			/*try{
          socketIO.close();
        }
		    catch (e){};*/
			/*    if(that.cmap){
		        alert(1);
        }
    that.cmap.pointsFlash([],0,30);*/
			var that = this;
			window.clearInterval(that.setintervel);
			that.cmap = null;
		      delete that.cmap;
		      ceiecmap.destroyInstances();
		},
	}
</script>

<style>
	.all {
		position: relative;
		width: 6720px;
		height: 2700px;
	}
	
	#allmap {
		width: 100%;
		height: 100%;
	}
	
	.ol-control {
		display: none;
	}
	
	.ol-scale-line {
		display: none;
	}
	
	.content {
		position: absolute;
		top: 315px;
		z-index: 999;
		width: 1320px;
	}
	
	.clearboth {
		clear: both;
	}
	
	.left {
		left: 60px
	}
	
	.right {
		right: 60px
	}
	
	.popdiv {
		color: #000;
		font-size: 26px;
	}
	
	#video-canvas {
		width: 100%;
	}
</style>