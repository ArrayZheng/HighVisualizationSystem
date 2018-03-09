<template>
	<div class="all">
    <!--地图-->
		<div id="allmap"></div>
    <!--header-->
		<top-nav>
      <span slot="title1">{{$t('event.topNav.titleName')}}</span>
      <span slot="title2">{{$t('event.topNav.viceTitleName')}}</span>
    </top-nav>
    <!--左边内容-->
    <div class="leftModules">
      <moduleHeader :message="$t('event.consultation.consultationTitle')"></moduleHeader>
      <div class="participantList">
        <div v-for="(item,index) in consultationMember" :id="'participant'+(index+1)" class="participantImg">
          <img :src="item.httpUserPhoto.length>1?item.httpUserPhoto:'./../../static/images/avatar1.png'" alt="">
          <span>{{item.userName}}</span>
        </div>
       <div class="pollingCircle" style="width: 322px;height:18px;margin:425px auto 0 auto;">
          <div  v-for="(item,index) in pollingCircle" class="Ccircle otherCircle" :id="'circle'+(index+1)"></div>
       </div>
      </div>
      <div id="overLayer"></div>
      <div class="chatContents">
        <div v-for="(item,index) in chartMessages" class="chartContent" :id="'message'+(index+1)" v-show="item.messageType==1">
          <div class="time" v-show="true">
            <div class="userName"><span>{{item.userName}}</span></div>
            <div class="messageDate"><span>{{item.messageDate}}</span></div>
          </div>
          <div class="chartMessage">
            <img class="chartImg" :src="item.httpUserPhoto.length>1?item.httpUserPhoto:'./../../static/images/avatar1.png'" alt="">
            <div class="message">
              <div class="messageContent"><span>{{item.message}}</span></div>
            </div>
          </div>
        </div>
      <div id="scrollPosition"></div>
      </div>
    </div>
    <!--右边内容-->
    <div class="rightModules">
      <!--事件状态-->
      <div class="eventStatus">
        <moduleHeader :message="$t('event.eventStatus.eventStatusTitle')"></moduleHeader>
        <div class="eventTime"><span >{{eventStatus.eventInfo[eventStatus.lastEventIndex].time}}</span></div>
        <div class="lastEventDescription"><span >{{eventStatus.eventInfo[eventStatus.lastEventIndex].desc}}</span></div>
        <div class="eventTrack">
          <div class="circleBarContainer">
              <div class="circleBar" v-for="index in eventStatus.circleBarNum" v-show="(eventStatus.eventInfo&&eventStatus.eventInfo.length>1)||(eventStatus.eventInfo.length==1&&eventStatus.eventInfo[0].desc.length>0&&eventStatus.eventInfo[0].time.length>0)">
                <div class="circle"></div>
                <div class="ellipsis" v-show="(index==1&&eventStatus.firstEllipsisShow)||(index==eventStatus.circleBarNum&&eventStatus.lastEllipsisShow)"></div>
                <div class="bar"></div>
              </div>
              <div class="lastEvent" v-show="(eventStatus.eventInfo&&eventStatus.eventInfo.length>1)||(eventStatus.eventInfo.length==1&&eventStatus.eventInfo[0].desc.length>0&&eventStatus.eventInfo[0].time.length>0)">
                <div id="lastLine"></div>
                <div id="lastBall"><div id="lastInnerBall"></div></div>
              </div>
              <div class="currentEvent" v-show="eventStatus.currentEvent&&eventStatus.currentEvent.desc">
                <div id="currentBall"><div id="innerBall"></div></div>
                <div id="currentLine"></div>
              </div>
          </div>
        </div>
        <div id="currentEventInfo">
          <div id="currentTime"><span>{{eventStatus.currentEvent.time}}</span></div>
          <div id="currentDescription"><span>{{eventStatus.currentEvent.desc}}</span></div>
        </div>
      </div>
      <div id="resourceList">
        <moduleHeader :message="$t('event.resourceList.resourceListHeader')"></moduleHeader>
        <div id="listContainer">
          <div id="listContent">
            <div  v-for="(item,index) in resourceList"  class="listItem">
              <div class="resourceName"><span>{{item.name}}</span></div>
              <div class="resourceNum"><span>{{item.num}}</span></div>
            </div>
          </div>
          <div id="listPolling">
              <div class="Rcircle otherCircle" v-for="index in resourcePollingCircle" :id="'recircle'+index"></div>
          </div>
        </div>
      </div>
      <div id="video">
        <moduleHeader :message="$t('event.video.videoHeader')"></moduleHeader>
        <div id="videoContent">
          <canvas id="video-canvas"></canvas>
        </div>
        <!--<div class="chart" style="padding: 5px;">
          <video style="width: 100%;height: 100%;"src="./static/video/videol.webm" loop="loop" autoplay="autoplay" width="100%" height="100%" muted="muted">
            您的浏览器不支持 video 标签。
          </video>
        </div>-->
      </div>
    </div>
	</div>
</template>

<script>
	import topNav from './common/TopNav'
  import moduleHeader from './common/ModuleHeader'
  import 'vue-resource'
//  var JSMpeg = require('./../../static/JSMpeg/jsmpeg.min.js')
  import locales from "./../locales/event/index"
  import socketIO from './../socketIO'
  import config from "../../static/config/config"
  var cmap;
	export default {
    locales,
	  name: 'map',
    data(){
        return{
            consultationMember:[],
          totalConsultationMember:[],
            /*pollingCircle:[{id:"circle1",class:"otherCircle"},{id:"circle2",class:"currentCircle"},{id:"circle3",class:"otherCircle"},{id:"circle4",class:"otherCircle"}],*/
            pollingCircle:0,
          chartMessages:[],
          GISMessages:[],
          index:4,
          messageTime:"",
          showTime:true,
          eventStatus:{eventInfo:[
            {time:"",desc:"",id:"event1"}
            ],lastEventIndex:0,circleBarNum:11,firstEllipsisShow:true,lastEllipsisShow:true,hasLastEvent:true,currentEvent:{time:"",desc:""}},
          pollingEventStatusObj:{},
          pollingConsultationImgObj:{},
          pollingConsultationObj:{},
          pollingResourceList:{},
          scale:1,
          resourceList:[{name:"Coche de mando de emergencia",num:10},{name:"Vehículo de emergencia para la comunicación",num:42},{name:"Una ambulancia",num:981},{name:"Excavadora",num:124}],
          totalResourceList:[],
          resourcePollingCircle:3,
          videoUrl:"",
          notice:{
            event:{cooperativeConsultation:true,eventStatus:true,resourceList:true,video:true},
            alarm:{},
            traffic:{},
            general:{},
          },
          updateModel:"Consultation",
          settingInfo:{},
          videoPlayerObj:{},
          sourcePageSize:4,
        }

    },
	  methods:{
	  	init(){
      var that=this;
        var mapDom = document.getElementById('allmap');
		    var url=config.arcServerUrl;
        var initOpts = {
          url: url,
          long: -68.18031002592684,
          lat: -16.48472875965662,
          tileSize:1024,
          minZoom:5,
          maxZoom:17,
          zoom: 11
        };

        cmap = ceiecmap.init(mapDom, initOpts);
        function getUrl(iconType) {
          var name="";
          switch (iconType){
            case "Ambulance" : name="Ambulance";break;
            case "Car" : name="Car";break;
            case "Doctor" : name="Doctor";break;
            case "FireEngine" : name="FireEngine";break;
            case "Fireman" : name="Fireman";break;
            case "GasStation" : name="GasStation";break;
            case "Hand" : name="Hand";break;
            case "Police" : name="Police";break;
            case "PoliceCar" : name="PoliceCar";break;
            case "PoliceHat" : name="PoliceHat";break;
            case "UAV" : name="UAV";break;
          }
          return 'static/images/Plot/'+name+'.png'
        }
        cmap.setPlotIconUrlFun(getUrl);

        cmap.getTargetControl(false);//*/
        var styleFun = cmap.createIconLayerSytleFun({
          zoom: 1,
          anchor: [0.5, 70],
          srcFun: function(feature) {
            var type = feature.get("type");
            if(type == 0) {
              return './static/images/location-red_small.png';
            } else if(type == 1) {
              return './static/images/location-blue_small.png';
            } else if(type == 2) {
              return './static/images/location-yellow_small.png';
            } else {
              return './static/images/location-green_small.png';
            }
          },
          lableField: ""
        });
        var items = [];
        for(var i = 0; i < 2; i++) {
          var item = {

            long: -68.18031002592684 + (Math.random > 0.5 ? 1 : -1) * (Math.random() * 0.2),
            lat: -16.48472875965662 + (Math.random > 0.5 ? 1 : -1) * (Math.random() * 0.2),
            id: "mkkkkkk" + (i + 10),
            //name:"Incidente",
            type: 0
          }
          items.push(item);
        }
        for(var i = 0; i < 10; i++) {
          var item = {
            long: -68.18031002592684 + (Math.random > 0.5 ? 1 : -1) * (Math.random() * 0.2),
            lat: -16.48472875965662 + (Math.random > 0.5 ? 1 : -1) * (Math.random() * 0.2),
            id: "mkkkkkk" + i,
            type: 1 + parseInt(Math.random() * 2.9),
            name: ''
          }
          items.push(item);
        }
        cmap.disPlayCameraLayer({
          list: items,
          cluster: 0,
          callBack: function(type, feature) {
            if(type == "click") {
              var item = feature.getProperties();
              cmap.showPopup({
                data: item,
                poupClickCallbak: function(e) {
                  console.log(e.data);
                  console.log(e.target);
                  if(e.target.id == "btnReal" || e.target.id == "btnRecord") {
                    var data = e.data;
                    e.popup.hide()
                  }
                },
                html: function(item) {
                  console.log(item)
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
       /* cmap.setPlotIconUrlFun(that.getUrl);
        $.ajax({
          url:'../../static/config/plot.json',
          type:'Get',
          dataType:'json',
          async:false,
          success:function(data){
            cmap.plotImportFromCs(data);
          }
        });
      /*  $.getJSON('../data/plot.json',function(result) {
          cmap.plotImportFromCs(result);
        });*/

	  	},
      //初始化配置数据
      initData(){
	  	    var that=this;
        $.ajax({
          url:config.serverAddress+'/readEventConfiguration',
          type:'Get',
          dataType:'json',
          async:false,
          success:function(data){
            that.settingInfo=data;
            //給事件状态赋值
            if(that.settingInfo.eventStatus.eventList.length>1){
              that.eventStatus.eventInfo=that.settingInfo.eventStatus.eventList.slice(0,that.settingInfo.eventStatus.eventList.length-1);
              that.eventStatus.circleBarNum=that.eventStatus.eventInfo.length-1;
            }else{
              that.eventStatus.eventInfo=[{time:"",desc:"",id:"event1"}];
              that.eventStatus.circleBarNum=0;
            }
            if(that.settingInfo.eventStatus.eventList.length>0){
              that.eventStatus.currentEvent=that.settingInfo.eventStatus.eventList[that.settingInfo.eventStatus.eventList.length-1];
            }else{
              that.eventStatus.currentEvent={time:"",desc:"",id:"event1"};
            }

           that.pollingEventStatus();
            //给资源列表赋值
            that.totalResourceList=that.settingInfo.resourceList.list;
            if(that.settingInfo.resourceList.list.length>-1&&that.settingInfo.resourceList.list.length<4){
                that.sourcePageSize=that.settingInfo.resourceList.list.length
            }
            that.pollingResource();
            //给视频赋值
//            that.videoUrl=that.settingInfo.video.url.id;
            var videoId=that.settingInfo.video.url.id;
            that.getVideoUrl(videoId);
            //设置GISMap
            if(cmap){
              var view=cmap.getMap().getView();
				      cmap.setViewStuats({
                center:that.settingInfo.GISMap.center,
                resolution:that.settingInfo.GISMap.resolution/3
              })
            }
          }
        });
      },
      //轮询参与会商人员的头像
     pollingParticipantImg(){

	  	    var that=this;
	  	    var index=1;
	  	    if(that.totalConsultationMember.length%4){
	  	        that.pollingCircle=parseInt(that.totalConsultationMember.length/4)+1;
          }else{
            that.pollingCircle=parseInt(that.totalConsultationMember.length/4);
          }
          var width=that.pollingCircle*45+50+"px";
          $(".pollingCircle").css("width",width);
          var loopTime=that.settingInfo.consultation.loopTime.timeVal*1000;
          if(!loopTime){
              loopTime=3000;
          }
       $("#circle1").removeClass("otherCircle").addClass("currentCircle");

       if(that.totalConsultationMember.length>3){

         that.consultationMember=that.totalConsultationMember.slice(0,4);
       }else{
         that.consultationMember=that.totalConsultationMember.slice(0);
       }
       if(that.pollingConsultationImgObj){
         window.clearInterval(that.pollingConsultationImgObj);
       }
	  	    that.pollingConsultationImgObj=setInterval(function () {
            if(index<that.pollingCircle){
                index++;
            }else{
                index=1;
            }
            var id="#circle"+index;
            $(".Ccircle").removeClass("currentCircle").addClass("otherCircle");
            $(id).removeClass("otherCircle").addClass("currentCircle");
            try{
              that.consultationMember=that.totalConsultationMember.slice((index-1),index+3);
            }catch (e){
              that.consultationMember=that.totalConsultationMember.slice(index-1);
            }

          },loopTime);
    },
      //轮询资源列表
      pollingResource(){
        var that=this;
        var index=1;
        var len=that.totalResourceList.length;
        $(".Rcircle").removeClass("currentCircle").addClass("otherCircle");
        if(len%4){
          that.resourcePollingCircle=parseInt(len/4)+1;
        }else{
          that.resourcePollingCircle=parseInt(len/4);
        }
        var width=that.resourcePollingCircle*45+50+"px";
        $("#listPolling").css("width",width);
        var loopTime=that.settingInfo.resourceList.loopTime.timeVal*1000;
        if(!loopTime){
          loopTime=5000;
        }
        $("#recircle1").removeClass("otherCircle").addClass("currentCircle");
        if(that.totalResourceList.length>4){
          that.resourceList=that.totalResourceList.slice(0,4);
        }else{
          that.resourceList=that.totalResourceList.slice();
        }

        if(that.pollingResourceList){
          window.clearInterval(that.pollingResourceList);
        }
        that.pollingResourceList=setInterval(function () {
          if(index<that.resourcePollingCircle){
            index++;
          }else{
            index=1;
          }
          var id="#recircle"+index;
          $(".Rcircle").removeClass("currentCircle").addClass("otherCircle");
          $(id).removeClass("otherCircle").addClass("currentCircle");
          if(index*4<that.totalResourceList.length||index*4==that.totalResourceList.length){
            that.resourceList=that.totalResourceList.slice(index*4-4,index*4);
          }else{
              var len=that.totalResourceList.length;
            that.resourceList=that.totalResourceList.slice(index*4-4,len);
            console.log(that.resourceList)
          }

        },loopTime);
      },
      pollingEventStatus(){
          var unitWidth=95;
          if(this.pollingEventStatusObj){
            window.clearInterval(this.pollingEventStatusObj);
          }
          //
        if(this.eventStatus.eventInfo.length<6&&this.eventStatus.eventInfo.length>1){/*设置当前时间信息框的位置*/
          var currentEventPosition=(81+unitWidth*(this.eventStatus.eventInfo.length))*this.scale;
          $("#currentEventInfo").css({"left":currentEventPosition});
          $("#currentEventInfo #currentTime,#currentEventInfo #currentDescription").css({"text-align":"left"});
        }else if(this.eventStatus.eventInfo.length<2){
          $("#currentEventInfo").css({"left":81});
          $("#currentEventInfo #currentTime,#currentEventInfo #currentDescription").css({"text-align":"left"});
        }else {
            if(this.eventStatus.eventInfo.length>5&&this.eventStatus.eventInfo.length<13){
              var currentEventPosition=(81+unitWidth*(this.eventStatus.eventInfo.length)-643)*this.scale;
              $("#currentEventInfo").css({"left":currentEventPosition});
              $("#currentEventInfo #currentTime,#currentEventInfo #currentDescription").css({"text-align":"right"});
            }
        }
        if(this.eventStatus.hasLastEvent){
          var temp=this.eventStatus;
          temp.circleBarNum=0;

          if(this.eventStatus.eventInfo.length<13&&this.eventStatus.eventInfo.length>0){
            temp.circleBarNum=this.eventStatus.eventInfo.length;
            temp.firstEllipsisShow=false;
            temp.lastEllipsisShow=false;
          }else if(this.eventStatus.eventInfo.length>12){
            temp.circleBarNum=11;
            temp.firstEllipsisShow=false;
            temp.lastEllipsisShow=true;
            //设置当前事件框的位置
            var currentEventPosition=538*this.scale;
            $("#currentEventInfo").css({"left":currentEventPosition});
            $("#currentEventInfo #currentTime,#currentEventInfo #currentDescription").css({"text-align":"right"});
          }
          //历史时间轮询
          var that=this;
          var loopTime=that.settingInfo.eventStatus.loopTime.timeVal*1000;
//          var loopTime=1000;
          this.pollingEventStatusObj=setInterval(function () {
            if(temp.eventInfo.length<13&&temp.eventInfo.length>0){//长度小于13的情况
                if(temp.lastEventIndex<temp.eventInfo.length-1){
                  temp.lastEventIndex++;
                }
                else{
                  temp.lastEventIndex=0;
                }
                var leftPosition=(-4+unitWidth*(temp.lastEventIndex))*that.scale;
                $(".lastEvent").css({"left":leftPosition});
                temp.circleBarNum=temp.eventInfo.length;
                temp.firstEllipsisShow=false;
                temp.lastEllipsisShow=false;
            }else if(temp.eventInfo.length>12){
                if(temp.lastEventIndex<6){
                  var leftPosition=(-4+unitWidth*(temp.lastEventIndex+1))*that.scale;
                  $(".lastEvent").css({"left":leftPosition});
                  temp.circleBarNum=11;
                  temp.firstEllipsisShow=false;
                  temp.lastEllipsisShow=true;
                  temp.lastEventIndex++;
                  //设置当前事件框的位置
                  var currentEventPosition=538*that.scale;
                  $("#currentEventInfo").css({"left":currentEventPosition});
                  $("#currentEventInfo #currentTime,#currentEventInfo #currentDescription").css({"text-align":"right"});
                }else {
                  if((temp.eventInfo.length-temp.lastEventIndex)<8){
                    temp.lastEventIndex++;
                    var leftPosition=(unitWidth*(12-temp.eventInfo.length+temp.lastEventIndex)-21)*that.scale;
                    $(".lastEvent").css({"left":leftPosition});
                    temp.circleBarNum=11;
                    temp.firstEllipsisShow=true;
                    temp.lastEllipsisShow=false;
                    if(temp.eventInfo.length==temp.lastEventIndex){
                      temp.lastEventIndex=0;
                      var leftPosition=-4;
                      $(".lastEvent").css({"left":leftPosition});
                      temp.firstEllipsisShow=false;
                      temp.lastEllipsisShow=true;
                    }
                    //设置当前事件框的位置
                    var currentEventPosition=538*that.scale;
                    $("#currentEventInfo").css({"left":currentEventPosition});
                    $("#currentEventInfo #currentTime,#currentEventInfo #currentDescription").css({"text-align":"right"});
                  }
                  else {
                    temp.lastEventIndex++;
                    var leftPosition=(unitWidth*6-21)*that.scale;
                    $(".lastEvent").css({"left":leftPosition});
                    temp.circleBarNum=10;
                    temp.firstEllipsisShow=true;
                    temp.lastEllipsisShow=true;
                    //设置当前事件框的位置
                    var currentEventPosition=518*that.scale;
                    $("#currentEventInfo").css({"left":currentEventPosition});
                    $("#currentEventInfo #currentTime,#currentEventInfo #currentDescription").css({"text-align":"right"});
                  }
                }

            }

          },loopTime);
        }
      },
      adjustSize(){
          var containerWidth=$(".eventStatus").width();
          console.log(containerWidth);
      },
      readConsultationMember(){
       var that=this;
       var temp={"conferenceId":that.settingInfo.consultation.conference.id};
        $.ajax({
          url:config.event_conferenceMember,
          type:'Post',
          dataType:'json',
          data:JSON.stringify(temp),
          success:function(data){
              that.totalConsultationMember=data.mess.memberList;
              if(data.mess.memberList.length>0){
               that.pollingParticipantImg();
              }
          }
        })
      },
      readConsultationMsg(){
        var that=this;
        var temp={
          "conferenceId":that.settingInfo.consultation.conference.id,
          "pageIndex":1,
          "pageSize":20,
          "messageType":1
        };
        $.ajax({
          url:config.event_conferenceMsg,
          type:'Post',
          dataType:'json',
          data:JSON.stringify(temp),
          success:function(data){
            that.chartMessages=data.mess.messageList;
          }
        })
        temp.messageType=4
        $.ajax({
          url:config.event_conferenceMsg,
          type:'Post',
          dataType:'json',
          data:JSON.stringify(temp),
          success:function(data){
            that.GISMessages=[];
            for(var i=0;i<data.mess.messageList.length;i++){
              that.GISMessages.push(data.mess.messageList[i].message)
            }
            cmap.plotImportFromCs(that.GISMessages);
          }
        })
      },
      pollingConsultation(){
          var that=this;
        window.clearInterval(that.pollingConsultationObj);
        var loopTime=5000;
        if(that.settingInfo.consultation.loopTime.timeVal){
          loopTime=that.settingInfo.consultation.loopTime.timeVal*1000;
        }
        if(that.pollingConsultationObj){
          window.clearInterval(that.pollingConsultationObj);
        }
        that.readConsultationMember();
        that.readConsultationMsg();
        that.pollingConsultationObj=setInterval(function () {
            that.readConsultationMember();
            that.readConsultationMsg();
            try{
              document.getElementById("scrollPosition").scrollIntoView();
            }catch (e){
            }

        },loopTime);
      },
      switchVideo(rtsp){
       /* videoServerAddress*/
        var that=this;
         that.$http.post(config.videoServerAddress+'/event',{"rtspAddress":rtsp}).then(function(response) {
            console.log("成功切换视频:"+rtsp);
         }, function(err) {
         console.log(err)
         });
      },
      initVideo(){
        var that=this;
        var canvas = document.getElementById('video-canvas');
        var url = config.videoStreamAddress;
        that.videoPlayerObj= new JSMpeg.Player(url, {canvas: canvas});
      },
      socketIo() {
        var that=this;
        socketIO.on("map information client",function (msg) {
          console.log("socketIO接收到消息:"+msg);
          if(cmap){
            var view=cmap.getMap().getView();
            view.setCenter(msg.center);
            view.setResolution(msg.resolution);
          }
        });
      },
      getUrl(iconType) {
        var name="";
        switch (iconType){
          case "Ambulance" : name="Ambulance";break;
          case "Car" : name="Car";break;
          case "Doctor" : name="Doctor";break;
          case "FireEngine" : name="FireEngine";break;
          case "Fireman" : name="Fireman";break;
          case "GasStation" : name="GasStation";break;
          case "Hand" : name="Hand";break;
          case "Police" : name="Police";break;
          case "PoliceCar" : name="PoliceCar";break;
          case "PoliceHat" : name="PoliceHat";break;
          case "UAV" : name="UAV";break;
        }
        return '../../static/images/Plot/'+name+'.png'
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
                that.switchVideo(data.mess.rtspUrl);
              }
          }
        });
      },
	  },
	  components:{
	  	topNav,
      moduleHeader,
	  },
	  mounted(){
      var that=this;
      that.init();
      that.initData();
      that.socketIo();
      window.onresize=function () {
        that.adjustSize();
      }
      socketIO.on("eventClient",function (msg) {
        console.log("socketIO接收到消息:"+msg);
        that.initData();
        switch (msg){
          case "Consultation":
            that.pollingConsultation();
              break;
          case "GISMap":
            break;
//          case "eventStatus":
//            that.initData();
//            break;
//          case "Resource":
//            that.initData();
//            break;
//          case "VideoSupervision":
//            that.initData();
//            break;
        }
      });
      that.pollingConsultation();
      that.initVideo();
	  },
    created(){
	      if(!this.eventStatus.hasLastEvent){
          this.eventStatus.eventInfo.push({time:"000/00/00 00:00:00",description:"Sin acontecimientos históricos"})
        }
    },
    beforeDestroy(){
        var that=this;
   /*     socketIO.close();*/
        /*try{
            //关闭视频流
          that.videoPlayerObj.destroy();
        }
        catch (e){};*/
       window.clearInterval(that.pollingEventStatusObj);
       window.clearInterval(that.pollingConsultationImgObj);
       window.clearInterval(that.pollingConsultationObj);
       window.clearInterval(that.pollingResourceList);
        /*that.consultationMember=null;
        that.totalConsultationMember=null;
        that.chartMessages=null;
        that.eventStatus=null;
        that.pollingEventStatusObj=null;
        that.pollingConsultationImgObj=null;
        that. pollingConsultationObj=null;
        that.pollingResourceList=null;
        that.resourceList=null;
        that.totalResourceList=null;
        that.notice=null;
        that.settingInfo=null;
        that.videoPlayerObj=null;*/
        that.videoPlayerObj=null;
        cmap=null;

    }
	}
</script>

<style scoped>
	.all{
		position: relative;
		width: 6720px;
		height: 2700px;
	}
	#allmap{
		width: 100%;
		height: 100%;
	}

	.content{
		position: absolute;
		top: 210px;
		z-index: 999;
		width:880px;
	}
	.clearboth{
		clear: both;
	}
	.left{
		left:40px
	}
	.right{
		right:40px
	}
	.popdiv{
		color: #000;
		font-size: 14px;
	}
  /*span{*/
    /*color:black;*/
  /*}*/
  .leftModules{
    width:1320px;
    height:2320px;
    position: absolute;
    z-index: 999;
    top:315px;
    text-align: center;
    left:60px;
    background-color: rgba(0,0,0,0.5);/* IE9、标准浏览器、IE6和部分IE7内核的浏览器(如QQ浏览器)会读懂 */
  }
  .rightModules{
    width:1320px;
    height:2320px;
    position: absolute;
    z-index: 999;
    top:315px;
    text-align: center;
    right:60px;
  }
  .participantList{
    position: absolute;
    top: 120px;
    left: 0;
    width: 1320px;
    height: 489px;
    background-color:#23345b ;
  }
  .participantImg{
    display: inline-block;
    width: 270px;
    height: 258px;
    top:77px;
    position: absolute;
  }
  .participantImg img{
    position: absolute;
    top: 0;
    left:45px;
    width: 180px;
    height: 180px;
    border: 4px solid #ffffff;
    border-radius: 100%;

  }
  .participantImg span{
    position: absolute;
    display: inline-block;
    overflow: hidden;
    width: 270px;
    height: 40px;
    text-align: center;
    font-size: 3.2em;
    line-height: 40px;
    font-family:HelveticaNeue;
    color: #ffffff;
    left: 0;
    bottom: 0;
  }
  #participant1{
    left:75px;
  }
  #participant2{
    left:375px;
  }
  #participant3{
    left:675px;
  }
  #participant4{
    left:975px;
  }
  .otherCircle{
    background:#3d5370;
    width:18px;
    height:18px;
    border-radius:100%;
    display: inline-block;
    margin-left: 27px;
  }
  .currentCircle{
    background:#7ec1f6;
    border-radius:9px;
    width:60px;
    height:18px;
    display: inline-block;
    margin-left: 27px;
  }
  .time{
    width: 1120px;
    height: 32px;
    margin: 55px auto 0px auto;
    padding-bottom: 10px;
  }
  .time span{
    font-family:HelveticaNeue;
    font-size:32px;
    line-height:32px;
    color:#7687aa;

  }
  .chatContents{
    opacity:0.9;
    background:#0d1b3c;
    width:1320px;
    height:1710px;
    position: absolute;
    top: 611px;
    overflow-y: scroll;
    overflow-x:hidden;
  }
  .chartContent{
    width:1110px;
    margin:45px auto 0 auto ;
  }
  .chartMessage{
    width:1110px;
    margin-top: 45px;
  }
  .chartImg{
    border:4px solid #ffffff;
    width:127px;
    height:127px;
    border-radius:100%;
    display: inline-block;
    float: left;
  }
  .message{
    background:#2f4d74;
    border-radius:0px 45px 45px 45px;
    width:900px;
    display: inline-block;
    margin-left: 60px;
  }
  .messageContent{
    min-height: 66px;
    width: 810px;
    margin: 30px auto;
   /* border: 1px solid white;*/
  }
  .messageContent span{
    font-family:HelveticaNeue;
    font-size:32px;
    color:#ffffff;
    line-height:60px;
    text-align:justify;
    display: inline-block;
  }
  #scrollPosition{
   height: 77px;
    width: 1110px;
    margin:0 auto;
  }
  .eventStatus{
    opacity:0.9;
    background:#0d1b3c;
    width:100%;
    height:32.026%;
  }
  .eventTime{
    margin: 44px auto auto 75px;
    width: 50%;
    text-align:left;
  }
  .eventTime span{
    font-family:HelveticaNeue;
    font-size:32px;
    color:#7ec1f6;
    line-height:32px;

  }
  .lastEventDescription{
    width: 1171px;
    /*min-height: 60px;*/
    height: 120px;
    margin-left: 75px;
    margin-top:14px;
    /*text-align: left;*/
  }
  .lastEventDescription span{
    font-family:HelveticaNeue;
    font-size:32px;
    color:#7ec1f6;
    line-height:60px;
    text-align:justify;
    display: inline-block;
    width: 100%;
    word-wrap: break-word;
    word-break: break-all;
    white-space: pre-wrap !important;
  }
  .eventTrack{
    width: 88.712%;
    height: 31.09%;
    margin:2.422% auto auto 5.682%;
    position: relative;
  }
  .circleBarContainer{
    width: 100%;
    height:5.195% ;
    top: 31.169%;
    position: absolute;
  }
  .circleBar{
    display: inline-block;
    float: left;
  }
  .circle,.bar,.ellipsis,.currentEvent,.lightBall{
    display: inline-block;
  }
  .circle{
    opacity:0.3;
    background:#ffffff;
    width:12px;
    height:12px;
    border-radius:100%;
  }
  .bar{
    opacity:0.3;
    background:#ffffff;
    width:60px;
    height:3px;
    margin:auto 9px 4.5px 9px;
  }
  .ellipsis{
    /*background:#ffffff;*/
    width:15px;
    height:3px;
    margin:auto 29px 2px 29px;
    border-top: dotted 3px white;
  }
  .currentEvent{
    width: 30px;
    height: 158px;
    margin: -9px auto auto 0px;
    float: left;
/*display: none;*/

  }
  #currentBall{
    /*background:#00beaa;*/
    border:4px solid rgba(0,190,170,0.30);
    width:22px;
    height:22px;
    border-radius:100%;
    margin-top: -5px;
  }
  #innerBall{
    width: 22px;
    height: 22px;
    background:#00beaa;
    margin:0px auto;
    border-radius: 100%;
  }
  #currentLine{
    opacity:1;
    border:1px solid #ffffff;
    width:1px;
    height:126px;
    margin:0 auto;
  }
  .lastEvent{
    width: 20px;
    height: 91px;
    position: absolute;
    top: -74px;
    left: -4px;
  }
  #lastLine{
    opacity:1;
    border:1px solid #ffffff;
    width:1px;
    height:68px;
    margin: 0px auto;
  }
  #lastBall{
    /*background:#7ec1f6;*/
    border:4px solid rgba(126,192,246,1);
    width:12px;
    height:12px;
    border-radius:100%;
  }
  #lastInnerBall{
    width:12px;
    height:12px;
    border-radius:100%;
    background:#7ec1f6;
  }
  #currentEventInfo{
    width: 50%;
    position: absolute;
    left: 81px;
    height: 106px;
  }
  #currentTime{
    text-align:left;
  }
  #currentTime span{
    font-family:HelveticaNeue;
    font-size:32px;
    color:#00beaa;
    line-height:32px;
  }
  #currentDescription{
    text-align:left;
  }
  #currentDescription span{
    font-family:HelveticaNeue;
    font-size:32px;
    color:#00beaa;
    line-height:60px;
    word-wrap: break-word;
    word-break: break-all;
    white-space: pre-wrap !important;
    display: inline-block;
  }
  #resourceList{
    opacity:0.9;
    background:#0d1b3c;
    width:1320px;
    height:743px;
    margin-top:45px
  }
  #listContainer{
    width: 1140px;
    height: 562px;
    margin: 17px auto auto auto;

  }
  #listContent{
    width: 1140px;
    height: 496px;
  }
  #listPolling{
    height: 18px;
    min-width: 60px;
    margin: 48px auto;
  }
  .listItem{
    width: 1140px;
    height: 120px;
    margin: 0 auto;
    border-bottom: 4px solid #74787b;
  }
  .resourceName,.resourceNum{
    display: inline-block;
  }
  .resourceName{
    margin-top: 41px;
    float: left;
  }
  .resourceNum{
    margin-top: 41px;
    margin-right: 5px;
    float: right;
  }
  .listItem span{
    font-family:HelveticaNeue-Medium;
    font-size:24px;
    color:#ffffff;
    line-height:24px;
    text-align:left;
  }
  .resourceCircle{
    height: 18px;
    min-width: 60px;
  }
  #video{
    width: 1320px;
    /*height: 744px;*/
    height: 715px;
    margin-top: 44px;
    opacity:0.9;
    background:#0d1b3c;
  }
  #videoContent,#video-canvas{
    width: 1320px;
    height: 624px;
  }
  #title1{
    font-family:HelveticaNeue-Bold;
    font-size:60px;
    color:#ffffff !important;
    line-height:60px;
    text-align:center;
  }
  #title2{
    font-family:HelveticaNeue;
    font-size:40px;
    color:#7ec1f6 !important;
    line-height:40px;
    text-align:center;
  }
  #overLayer{
    position: absolute;
    background-image:linear-gradient(-180deg, rgba(5,8,16,0.6) 0%, rgba(5,8,16,0.00) 98%);
    width:1320px;
    height:120px;
    top:611px;
    left:0;
    z-index: 1;
  }
  ::-webkit-scrollbar-track {
    border-radius: 10px;
    background: #0d1b3c;
    opacity:0.9;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #2f4d74;
    width: 20px;
  }
  .messageDate,.userName{
    display: inline-block;
  }
  .messageDate{
    width: 30%;
    text-align: right;
  }
  .userName{
    width: 65%;
    text-align: left;
  }

</style>
