<template>
  <div class="emotionContainer">
    <div class="top">
      <div class="imgbar"></div>
      <span class="title">Emotional index curve</span>
      <div class="day carousel selected">
        <span>Day</span>
        <div class="cursor">
          <div class="bottomLine"></div>
        </div>
      </div>
      <div class="week carousel">
        <span>Week</span>
        <div class="cursor">
          <div class="bottomLine"></div>
        </div>
      </div>
      <div class="month carousel">
        <span>Month</span>
        <div class="cursor">
          <div class="bottomLine"></div>
        </div>
      </div>
    </div>
    <div class="chart" id="emotionChart"></div>
  </div>
</template>

<script>
  import locales from "./../../locales/event/index"
  import emotionOption from './emotion'
    export default {
      locales,
      name: 'controller-app',
      data() {
        return {
          chartobj:null,
        }
      },
      components: {

      },
      methods: {
        init: emotionOption.init,
        setDom: emotionOption.setDom,
        dispose: emotionOption.dispose,
      },
      mounted() {
        var that=this;
        that.chartObj=that.setDom("emotionChart");
        var index=0;
        var data=[
            [8,7,4,5,5,6,15,18,28,25,23,20,22,28,20,18,17,23,28,32,25,22,18,13,10],
            [18,7,4,5,5,6,15,18,8,25,23,20,22,38,20,18,17,23,28,12,25,22,18,13,18],
          [11,13,13,14,15,26,27,28,19,20,11,32,13,24,15,30,37,18,19,20,21,22,23,24,11]]
        that.init(data[index]);
         that.chartobj=setInterval(function () {
             if(index<2){
               index++;
             }else{
                 index=0;
             }
           $(".emotionContainer .top .carousel").removeClass("selected");
           $(".emotionContainer .top .carousel").eq(index).addClass("selected");
           that.init(data[index]);
         },10000)

      },
      destroyed(){
          var that=this;
        var that=this;
        window.clearInterval(that.chartobj);
        that.dispose();
      },
    }
</script>

<style scoped>
.emotionContainer{
  width: 790px;
  height: 336px;
  opacity: 0.9;
  background: #0D1B3C;
  margin-top: 20px;
}
.emotionContainer .top{
  width: 100%;
  height: 55px;
  opacity: 0.7;
  border-bottom: 1px solid #28496C;
  display: flex;
  align-items: center;
}
.emotionContainer .top .imgbar{
  margin-left: 27px;
  background: url(../../assets/images/window.png) no-repeat;
  background-size: 100%;
  width: 30px;
  height: 30px;
}
.emotionContainer .top .title{
  ont-family: HelveticaNeue-Medium;
  font-size: 20px;
  color: #FFFFFF;
  line-height: 20px;
  display: inline-block;
  width:276px;
  margin-left: 21px;
  text-align: left;
}
.emotionContainer .top .carousel{
  height: 100%;
  width: 80px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  z-index: 10;
}
.emotionContainer .top .carousel span{
  font-size: 20px;
  color: #7B93BE;
  letter-spacing: 0;
  line-height: 18px;
}
.emotionContainer .top .selected span{
  color: #7EC1F6 !important;
}
.emotionContainer .top .carousel .cursor{
  width: 80px;
  height: 18px;
  display: flex;
  align-items: flex-end;
}
.emotionContainer .top .selected .cursor{
  /*opacity: 0.5;*/
  background-image: linear-gradient(-180deg, rgba(31,125,200,0.00) 28%, #2886D0 100%);
  /*border-bottom: 4px solid #7EC1F6;*/
}
.emotionContainer .top .selected .cursor .bottomLine{
  width: 100%;
  height: 4px;
  background-color: #7EC1F6;
}
.emotionContainer .top .day,.emotionContainer .top .week{
  margin-right: 65px;
}
  .emotionContainer .chart{
    width: 100%;
    height: calc(100% - 55px);
  }
</style>
