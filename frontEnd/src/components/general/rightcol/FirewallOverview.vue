<template>
  <div class="widget">
    <div class="title">
      <div class="imgbar"></div>
      <span class="title_name"> Network Traffic Situation</span>
    </div>
    <div class="chart">
      <div>General situation of protocol monitoring</div>
      <div class="num-bar">
        <div class="num-text">
          <span style="font-family: HelveticaNeue;font-size: 36px;color: #7EC1F6;">{{monitoring.toLocaleString()}}</span>
           /
          <span>{{total.toLocaleString()}}</span>
        </div>
        <div class="trans-bar">
          <div class="color-bar"></div>
        </div>
        <div class="text-decoration">
          <span>Monitoring amount</span>
          <span>Configuration protocol volume</span>
        </div>
      </div>

      <div style="margin: 30px 0 25px">Total amount of Block</div>
      <div style="width: 100%;position: relative">
        <ul class="runNum" id="runNum">
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
    export default {
      name:'firewall-overview',
      data(){
        return{
          monitoring:1361200,
          total:2126347
        }
      },
      methods:{
        runNum(el,val,params){
          var valString = val || '702258000'
          var com0str='000000000'+valString.toString(10)
          var valCom0Str=com0str.substring(com0str.length-9,com0str.length);
          var par= params || {};
          var runNumJson={
            el:el,
            value:valString,
            valueStr:valCom0Str,
            width:par.width || 60,
            height:par.height || 80,
            speed:par.speed || 1000,
            length:valCom0Str.toString(10).length
          };
          this.list(runNumJson.el,runNumJson)
        },
        list(el,json){
          var str='';
          var styleBox='';
          var emptyCount=0;
          el.before('');
          for(var i=0; i<9;i++){
            if((i)%3==0&&i!=0){
              emptyCount++
            }
            var w=json.width*i;
            var t=json.height*parseInt(json.valueStr[i]);
            var h=json.height*10;
            styleBox+=`<div class="numFrame" style="left: ${72*i+28*emptyCount}px"></div>`
            str +=`<li style="width:${json.width}px;left:${72*i+28*emptyCount}px;top:${-t}px;height:${h}px;">`;

            for(var j=0;j<10;j++){
              str+='<div style="height:'+json.height+'px;line-height:'+(json.height+10)+'px;">'+j+'</div>';
            }
            str+='</li>';
          }
          el.before(styleBox);
          el.html(str);
        },
        runNumAnimate(el,value){
          var valString = value || '702258000'
          el=el.children('li');
          var com0str='000000000'+valString.toString(10)
          var valCom0Str=com0str.substring(com0str.length-9,com0str.length);
          var par={};
          var json={
            el:el,
            value:valString,
            valueStr:valCom0Str,
            width:par.width || 60,
            height:par.height || 80,
            speed:par.speed || 1000,
            length:valCom0Str.toString(10).length
          }
          for(var x=0;x<json.length;x++){
            var topPx=valCom0Str[x]*json.height;
            el.eq(x).animate({top:-topPx+'px'},json.speed);
          }
        },
        runNumRandom(max,min){
          var Range = max - min;
          var Rand = Math.random();
          var num=min + Math.round(Rand * Range);
          return num;
        },
        runNumInterval(el,initNum,timeInterval){
          var that=this;
          this.setintervel=setInterval(function () {
            initNum+=that.runNumRandom(100,999999);
            that.runNumAnimate(el,initNum);
          },timeInterval);
        }
      },
      mounted(){
        let that=this;
        $('.color-bar').animate({width:that.monitoring/that.total*100+'%'},600)
        this.runNum($('#runNum'),123456789);
        this.runNumInterval($('#runNum'),123456789,5000)
      },
      updated(){
        var that=this;
        window.clearInterval(that.setintervel);
      },
      beforeDestroy(){
        var that=this;
        window.clearInterval(that.setintervel);
      }
    }
</script>
<style>
  *{
    padding: 0;
    margin: 0;
  }
  .runNum{
    margin: 0 auto;
    overflow: hidden;
    height: 80px;
    font-weight: bold;
    position: relative;
  }
  .runNum li{
    list-style: none;
    position: absolute;
    font-size: 40px;
    color: #FFFFFF;
    text-align: center;
  }
  .numFrame{
    position: absolute;
    height: 80px;
    text-align: center;
    vertical-align: middle;
    width: 60px;
    border-bottom: 1px solid rgba(255,255,255,0.7);
    background: linear-gradient(rgba(0,20,58,0.6),rgba(93,149,213,0.8));
    margin-right: 6px;
  }
  .numFrame:last-child{
    margin-right: 0px;
  }
</style>
<style scoped="">
  .widget {
    position: relative;
    margin-bottom: 16px;
    width: 100%;
    height: 512px;
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
    padding: 30px 50px;
    height: 458px;
    text-align: left;
    font-size: 20px;
  }
  .num-bar{
    margin-top: 28px;
    height: 145px;
    background-color: rgba(47, 77, 116, 0.2);
    border: 1px solid #335E80;
    padding: 20px;
  }
  .num-text{
    text-align: right;
    font-family: HelveticaNeue-Medium;
    font-size: 50px;
    color: #445B87;
  }
  .trans-bar{
    margin-top: 24px;
    background: #1F3B68;
    border-radius: 8px;
    height: 10px;
    position: relative;
  }
  .color-bar{
    position: absolute;
    width: 60%;
    border-radius: 8px;
    top:0;left:0;
    height: 10px;
    background: linear-gradient(to right, rgba(126,193,246,.1), rgba(126,193,246,1));
  }
  .text-decoration{
    margin-top: 20px;
    color: #98AACC;
    display: flex;
    justify-content: space-between;
  }
</style>
