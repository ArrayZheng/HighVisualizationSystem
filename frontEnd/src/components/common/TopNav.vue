<template>
	<div class="topNav">
		<div class="widget left">
			<div class='logoimg'><img src="../../assets/images/bol-110.png"/></div>
		</div>
		<div class='box'>
			<div class="widget center">
				<div class="title1"><slot name="title1"></slot></div>
				<div class="title2"><slot name="title2"></slot></div>
			</div>
		</div>
		<div class="widget right">
			<div class="dayinfo time">
				<div class="timeinfo" id="timeZoom">{{time.hhmmss}}</div>
				<div class="timeinfo" id="dayZoom">{{ time.yymmdd }}</br><span style="color:#D8D8D8">{{time.week}}</span></div>
			</div>
			<div class="dayinfo weather" style="margin-right: 0;"><i :class=weather.picture aria-hidden="true" ></i><span id="weather"> {{weather.low}}~{{weather.high}}°F</span></div>
		</div>
		<div style="clear:both"></div>
	</div>
</template>

<script>
export default {
	name: 'top-nav',
	data(){
		return {
			time:{
				hhmmss : '',
				yymmdds : '',
				week : '',
			},
      weather:{
			    picture:"iconfont icon-sun",
          high:"",
          low:"",
      },
		}
	},
	methods:{
		systemTime(){
			let that=this;
				//获取系统时间。
	        var dateTime=new Date();
	        var hh=dateTime.getHours();
	        var mm=dateTime.getMinutes();
	        var ss=dateTime.getSeconds();
	        var year=dateTime.getFullYear();
	        var month=dateTime.getMonth()+1;
	        var day=dateTime.getDate();
	        hh=this.extra(hh);
	        mm = this.extra(mm);
	        ss = this.extra(ss);
	        month=this.extra(month)
	        day=this.extra(day);
	        var a = new Array("Sun.", "Mon.", "Tues.", "Wed.", "Thur.", "Fri.", "Sat.");
			var week = dateTime.getDay();
			week = a[week];
        	this.time.hhmmss = hh+":"+mm+":"+ss,
        	this.time.yymmdd = year+"/"+month+"/"+day;
        	this.time.week=week;
	        //每隔1000ms执行方法systemTime()。
	        setTimeout(function(){
	        	that.systemTime();
	        },1000);
		},
		extra(x){
			if(x < 10)
	        {
	            return "0" + x;
	        }
	        else
	        {
	            return x;
	        }
		},
    queryWeather(){
		    var that=this;
      $.ajax({
        url:"https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid = 346057&format=json",
        type:'Get',
        async:true,
        success:function(data){
          var wind = data.query.results;
          try {
            that.weather.high=wind.channel.item.forecast[0].high;
            that.weather.low=wind.channel.item.forecast[0].low;
            switch(wind.channel.item.forecast[0].text){
              case "cloudy":
              case "mostly cloudy (night)":
              case "mostly cloudy (day)":
              case "partly cloudy (night)":
              case "partly cloudy (day)":
              case "partly cloudy":
                that.weather.picture="iconfont icon-cloudy"
                  break;
              case "mixed rain and snow":
              case "mixed rain and sleet":
              case "mixed snow and sleet":
              case "snow flurries":
              case "light snow showers":
              case "blowing snow":
              case "sleet":
              case "snow":
              case "heavy snow":
              case "scattered snow showers":
              case "snow showers":
                that.weather.picture="iconfont icon-snow"
                break;
              case "sunny":
              case "fair (day)":
              case "hot":
                that.weather.picture="iconfont icon-sun"
                break;
              case "tornado":
              case "tropical storm":
              case "hurricane":
              case "blustery":
              case "windy":
              case "Scattered Thunderstorms":
                that.weather.picture="iconfont icon-weatherwind"
                break;
              case "dust":
              case "foggy":
              case "haze":
              case "smoky":
                that.weather.picture="iconfont icon-foggy"
                break;
              case "freezing drizzle":
              case "drizzle":
              case "freezing rain":
                that.weather.picture="iconfont icon-smallrain"
                break;
              case "severe thunderstorms":
              case "thunderstorms":
              case "isolated thunderstorms":
              case "scattered thunderstorms":
              case "thundershowers":
                that.weather.picture="iconfont icon-thounder"
                break;
              case "showers":
              case "hail":
              case "mixed rain and hail":
              case "scattered showers":
                that.weather.picture="iconfont icon-heavyrain"
                break;
            }
          }
          catch (e){}
        }
      })
    },
	},
	mounted(){
		this.systemTime();
		this.queryWeather();
	}
};
</script>
<!--<script>
  var callbackFunction = function(data) {
    var wind = data.query.results;
    console.log(wind);
  };
</script>-->

<!--<script src="https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid = 346057&format=json&callback=callbackFunction"></script>-->

<style>
	@media \0screen\,screen\9 {/* 只支持IE6、7、8 */
	  .topNav{
	    background-color:#000000;
	    filter:Alpha(opacity=30);
	    position:static; /* IE6、7、8只能设置position:static(默认属性) ，否则会导致子元素继承Alpha值 */
	    *zoom:1; /* 激活IE6、7的haslayout属性，让它读懂Alpha */
	  }
	  .topNav .widget{
	    position: relative;/* 设置子元素为相对定位，可让子元素不继承Alpha值 */
	  }
	  .nav{
	    background-color:#000000;
	    filter:Alpha(opacity=30);
	    position:static; /* IE6、7、8只能设置position:static(默认属性) ，否则会导致子元素继承Alpha值 */
	    *zoom:1; /* 激活IE6、7的haslayout属性，让它读懂Alpha */
	  }
	  .nav .widget{
	    position: relative;/* 设置子元素为相对定位，可让子元素不继承Alpha值 */
	  }
	}
	.topNav{
		width:100%;
		height:240px;
		position: absolute;
		z-index: 999;
		top:0px;
		text-align: center;
	    background-color: rgba(0,0,0,0.3);/* IE9、标准浏览器、IE6和部分IE7内核的浏览器(如QQ浏览器)会读懂 */
	}

	.topNav:before {
	    content: '';
	    z-index: 998;
	    position: absolute;
	    width: calc(100% - 60px);
	    height: 6px;
	    top: 234px;
	    left: 60px;
	 }
	.topNav:before {
	    background: -webkit-linear-gradient(right, rgba(10,180,160,1), rgba(10,180,160,0)); /* Safari 5.1 - 6.0 */
	    background: -o-linear-gradient(right, rgba(10,180,160,1), rgba(10,180,160,0)); /* Opera 11.1 - 12.0 */
	    background: -moz-linear-gradient(right, rgba(10,180,160,1), rgba(10,180,160,0)); /* Firefox 3.6 - 15 */
	    background: linear-gradient(to right, rgba(10,180,160,1),rgba(10,180,160,0.2), rgba(10,180,160,0),rgba(10,180,160,0)); /* 标准的语法（必须放在最后） */
	    }
	.topNav .left{position: absolute;height:121px;width:284px;left: 60px;bottom: 6px;font-size: 30px;font-weight: bolder;border-bottom:12px solid white}
	.topNav .left .logoimg{width: 100%;position: absolute;bottom: 46px;}

	.topNav .box{
		height: 100%;
		display: -webkit-box;
		display: box;
		justify-content: center;
		align-items: center;
	}
	.topNav .box .center .title1{font-weight: bold;font-size: 60px;color: #FFFFFF;}
	.topNav .box .center .title2{margin-top:5px;font-size: 40px;color: #7EC1f6;}

	.topNav .right{
		position: absolute;
		right: 60px;
		bottom: 0;
		font-size: 90px;
		height: 100%;
		display: -webkit-box;
		display: box;
		justify-content: center;
		align-items: center;
	}
	.topNav .right .weather img{margin-right:60px;width: 156px;height: 105px;}
	.topNav .right .weather span{display:inline-block;height:70px;padding:0;text-align:left;}
	.topNav .dayinfo{
		margin-right: 145px;
	  	color: #FFFFFF;
	  	display: inline-block;
	}
	.topNav .timeinfo{
	  	color: #FFFFFF;
	  	display: inline-block;
	}
	#dayZoom{margin-left:15px;font-size: 36px;color: #fff;text-align: initial;}
  .weather i{
    margin-right: 50px;
    font-size: 120px;
  }
</style>
