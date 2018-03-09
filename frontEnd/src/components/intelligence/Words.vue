<template>
  <div class="wordContainer">
    <div class="top">
      <div class="imgbar"></div>
      <span class="title">Word Cloud_Hot</span>
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
    <div class="chart" id="wordChart"></div>
  </div>
</template>

<script>
  import locales from "./../../locales/event/index"
  import wordOption from './word'
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
        init: wordOption.init,
        setDom: wordOption.setDom,
        dispose: wordOption.dispose,
      },
      mounted() {
        var that=this;
        that.chartObj=that.setDom("wordChart");
        var index=0;
        var data=[
          [{name:"Trump",value:4},{name:"President",value:4},{name:"USA",value:3},{name:"The White House",value:4},{name:"Customs",value:5}],
          [{name:"condemns",value:2},{name:"delcare",value:4},{name:"killed",value:3},{name:"applies",value:4},{name:"threat",value:5},{name:"trump",value:2},{name:"united",value:4},{name:"obama",value:3},{name:"george",value:4},{name:"paedoned",value:5}],
          [{name:"condemns",value:2},{name:"delcare",value:4},{name:"killed",value:3},{name:"applies",value:4},{name:"threat",value:5},{name:"trump",value:2},{name:"united",value:4},{name:"obama",value:3},{name:"george",value:4},{name:"Hilarie",value:5},{name:"Clinton",value:4},{name:"election",value:3},{name:"autobiography",value:4},{name:"petroleum",value:5}]]
        that.init(data[index]);
        that.init(data[1]);
         that.chartobj=setInterval(function () {

             if(index<2){
               index++;
             }else{
                 index=0;
             }
           $(".wordContainer .top .carousel").removeClass("selected");
           $(".wordContainer .top .carousel").eq(index).addClass("selected");
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
.wordContainer{
  width: 790px;
  height: 336px;
  opacity: 0.9;
  background: #0D1B3C;
  margin-top: 20px;
}
.wordContainer .top{
  width: 100%;
  height: 55px;
  opacity: 0.7;
  border-bottom: 1px solid #28496C;
  display: flex;
  align-items: center;
}
.wordContainer .top .imgbar{
  margin-left: 27px;
  background: url(../../assets/images/window.png) no-repeat;
  background-size: 100%;
  width: 30px;
  height: 30px;
}
.wordContainer .top .title{
  ont-family: HelveticaNeue-Medium;
  font-size: 20px;
  color: #FFFFFF;
  line-height: 20px;
  display: inline-block;
  width:276px;
  margin-left: 21px;
  text-align: left;
}
.wordContainer .top .carousel{
  height: 100%;
  width: 80px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.wordContainer .top .carousel span{
  font-size: 20px;
  color: #7B93BE;
  letter-spacing: 0;
  line-height: 18px;
}
.wordContainer .top .selected span{
  color: #7EC1F6 !important;
}
.wordContainer .top .carousel .cursor{
  width: 80px;
  height: 18px;
  display: flex;
  align-items: flex-end;
}
.wordContainer .top .selected .cursor{
  /*opacity: 0.5;*/
  background-image: linear-gradient(-180deg, rgba(31,125,200,0.00) 28%, #2886D0 100%);
  /*border-bottom: 4px solid #7EC1F6;*/
}
.wordContainer .top .selected .cursor .bottomLine{
  width: 100%;
  height: 4px;
  background-color: #7EC1F6;
}
.wordContainer .top .day,.wordContainer .top .week{
  margin-right: 65px;
}
  .wordContainer .chart{
    width: 100%;
    height: calc(100% - 55px);
  }
</style>
