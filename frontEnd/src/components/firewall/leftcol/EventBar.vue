<template>
  <div class="widget">
    <div class="title">
      <div class="imgbar"></div>
      <span class="title_name"> Amount of incident of the day</span>
    </div>
    <div class="chart" id="eventBar"></div>
  </div>
</template>

<script>
    import eventBar from './eventBar.js'
    export default {
      name:'event-bar',
      data(){
        return{
          setintervel:''
        }
      },
      methods:{
        init: eventBar.init,
        setDom: eventBar.setDom,
        dispose: eventBar.dispose,
        getHttpData(){
          let that=this;
          let data=that.getLast7Day();
          that.init(data);
          that.setInterval=setInterval(function(){
            data[data.length-1].value=parseInt(Math.random()*1000);
            that.init(data);
          },5000)
        },
        getLast7Day(){
          var date =new Date();
          var nowTimes=date.getTime();
          var randomData=[];
          for(var i=0;i<7;i++){
            var lastDateObj=new Date(nowTimes-i*24*60*60*1000);
            var lastDayTemp=lastDateObj.getDate();
            var lastMonthTemp=lastDateObj.getMonth()+1;
            var lastDay=lastDayTemp>9?lastDayTemp:'0'+lastDayTemp;
            var lastMonth=lastMonthTemp>9?lastMonthTemp:'0'+lastMonthTemp;
            randomData.unshift({
              day:lastMonth+'-'+lastDay,
              value:parseInt(Math.random()*1000)
            })
          }
          return randomData
        }
      },
      mounted(){
        this.setDom('eventBar');
        this.getHttpData()
      },
      beforeDestroy(){
        var that=this;
        window.clearInterval(that.setintervel);
      }
    }
</script>

<style scoped="">
  .widget {
    position: relative;
    margin-bottom: 16px;
    width: 100%;
    height: 336px;
    z-index: 999;
    text-align: center;
    background-color: rgba(13, 27, 60, 0.8);
    /* IE9、标准浏览器、IE6和部分IE7内核的浏览器(如QQ浏览器)会读懂 */
  }

  .widget .title {
    padding: 15px 0 15px 0;
    text-align: initial;
  }

  .widget .title:before {
    content: '';
    z-index: 998;
    position: absolute;
    width: 100%;
    height: 1px;
    top: 54px;
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
    font-family: HelveticaNeue-Medium;
    font-size: 20px;
    color: #FFFFFF;
    line-height: 20px;
    margin-left: 64px;
  }

  .widget .title .imgbar {
    display: inline-block;
    position: absolute;
    left: 18px;
    top : 5px;
    background: url(../../../assets/images/window.png) no-repeat;
    background-size: 100%;
    width: 40px;
    height: 40px;
  }


  .widget .chart {
    padding: 10px;
    height: 282px;
  }
</style>
