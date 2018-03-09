<template>
	<div class="widget">
		<div class="bottom">
				<div class="bottomLeft">
					<div class="widget mapAnchor">
						<div class="mapAnchorRaw">
							<img class="mapAnchorImg" src="../../../assets/images/location-yellow_small.png"/>
							<div class='mapAchorTextRow'>
								<span>&nbsp;&nbsp;{{$t('alarm.video.police')}}</span>
							</div>
						</div>

						<div class="mapAnchorRaw">
							<img class="mapAnchorImg" src="../../../assets/images/location-red_small.png"/>
							<div class='mapAchorTextRow'>
								<span>&nbsp;&nbsp;{{$t('alarm.video.fire')}}</span>
							</div>
						</div>

						<div class="mapAnchorRaw">
							<img class="mapAnchorImg" src="../../../assets/images/location-green_small.png"/>
							<div class='mapAchorTextRow'>
								<span>&nbsp;&nbsp;{{$t('alarm.video.traffic')}}</span>
							</div>
						</div>

						<div class="mapAnchorRaw">
							<img class="mapAnchorImg" src="../../../assets/images/location-blue_small.png"/>
							<div class='mapAchorTextRow'>
								<span>&nbsp;&nbsp;{{$t('alarm.video.medical')}}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="bottomRight widget">
					<div class="title">
						<div class="imgbar"></div>
						<div class="imgenlarge"></div>
						<span class="title_name"> {{$t('alarm.video.name')}}</span>
					</div>
					<div class="chart" style="padding: 5px;" id="#videoContent">
						<!--<video style="width: 100%;height: 100%;"src="./static/video/videol.webm" loop="loop" autoplay="autoplay" width="100%" height="100%" muted="muted">
							您的浏览器不支持 video 标签。
						</video>-->
            <canvas id="video-canvas" width="100%" height="100%"></canvas>
					</div>
				</div>
				<div class="clearboth">

				</div>
			</div>
	</div>
</template>

<script>
	import config from '../../../../static/config/config'
  import socketIO from "../../../socketIO"
/*	const socket = io(config.serverAddress);*/
	import locales from '../../../locales/alarm'
	export default {
		locales,
		name:'video',
		data(){
			return {
			    videoPlayerObj:{},
			}
		},
		methods:{
			socketIo() {
				let that=this;
        socketIO.on('alarm info client', function(msg) {
					if(msg.name=="video-refresh"){
						/*that.initHttpGetData();*/
            that.test()
					}
				});
			},
			initHttpGetData() {
				var that=this;
				that.noticeData=[];
				this.$http.get(config.serverAddress+'/readAlarmConfiguration').then(function(response) {
					window.clearInterval(that.setintervel);
				}, function(err) {
					console.log(err)
				});
			},
      test(){
			    var that=this;
        $.ajax({
          url:config.serverAddress+'/readAlarmConfiguration',
          type:'Get',
          dataType:'json',
          async:false,
          success:function(data){
            var videoId=data.video.url.id;
            that.getVideoUrl(videoId);
          }
        });
      },
      switchVideo(url){
        /* videoServerAddress*/
        var that=this;
        that.$http.post(config.videoServerAddress+'/event',{"rtspAddress":url}).then(function(response) {
          console.log("成功切换视频:"+url);
        }, function(err) {
          console.log(err)
        });
      },
      initVideo(){
        var canvas = document.getElementById('video-canvas');
        var url = config.videoStreamAddress;
        this.videoPlayerObj = new JSMpeg.Player(url, {canvas: canvas});
      },
      getVideoUrl(id){
        var that=this;
        $.ajax({
          url:config.RTSPServer+'queryRealVideoByDeviceId',
          type:'Post',
          dataType:'json',
          data:JSON.stringify({deviceId:id}),
          async:false,
          success:function(data){
            if(data.mess&&data.mess.rtspUrl){
                if(data.mess.rtspUrl){
                  that.switchVideo(data.mess.rtspUrl);
                }
            }
          }
        });
      },
		},

		/*watch:{
			data:function(data){
				this.init(data);
			}
		},*/
		mounted(){
      this.initVideo();
			this.initHttpGetData();
			this.socketIo();
			this.test();

		},
    destroyed(){
		    var that=this;
		   /* try{
          socketIO.close();
        }
		    catch (e){};*/
		    try{
          window.clearInterval(that.setintervel);
        }
        catch (e){};
      that.videoPlayerObj=null;
    },
	}
</script>

<style scoped>
	.clearboth{
		clear: both;
	}
	.widget{
		position: relative;
		margin-bottom: 30px;
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
  #videoContent,#video-canvas{
    width: 1320px;
    height: 624px;
  }
	.widget .bottom{
		float:right;
		height: 100%;
		width:1800px
	}
	.widget .bottomLeft{
		height:100%;
		width:450px;
		float: left;
		display: inline-block;
	}
	.widget .bottomRight{
		height:100%;
		width:1320px;
		float: right;
		display: inline-block;
	}
		/*地图标签*/
	.mapAnchor{
		width:calc(100% - 50px);
		padding:50px 0 50px 45px;
		height: calc(100% - 100px);
	}
	.mapAnchor .mapAnchorRaw{
		width: 100%;
	  	text-align: left;
		height: 25%;
		margin-bottom: 20px;
	}
	.mapAnchor .mapAnchorRaw .mapAnchorImg{
		width: 75px;
		height: 105px;
	}
	.mapAnchor .mapAnchorRaw .mapAchorTextRow{
		width: calc(100% - 80px);
		height: 100%;
		display: table;
		float:right;
	}
	.mapAnchor .mapAnchorRaw .mapAchorTextRow span{
		padding-left: 20px;
		display: table-cell!important;
		vertical-align: middle;
	    font-size: 32px;
	    color:#fff;
	}


</style>
