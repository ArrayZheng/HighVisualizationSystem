<template>
  <div class="hotContainer">
    <div class="top">
      <div class="imgbar"></div>
      <span class="title">Hot public opinion</span>
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
    <div class="chart" id="hotChart">
      <div class="item" v-for="(item,index) in data">
        <div :class="item.circle" v-show="index<3"></div>
        <div :class="item.circle" v-show="index>2"></div>
        <span class="index">{{item.index}}</span>
        <span :class="index<3?'name1':'name3'">{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import locales from "./../../locales/event/index"
  export default {
    locales,
    name: 'controller-app',
    data() {
      return {
        chartobj:null,
        data:[
          {circle:"circle circle1",index:"01",name:"U.S. election"},
          {circle:"circle circle2",index:"02",name:"Trump Visits China"},
          {circle:"circle circle3",index:"03",name:"The U.S. president announced the amendment of the constitution"},
          {circle:"circle",index:"04",name:"North Korean athletes attend Winter Olympics"},
          {circle:"circle",index:"05",name:"The world's first artificial heart"},
          {circle:"circle",index:"06",name:"Influenza virus quietly changed"},
          {circle:"circle",index:"07",name:"China's best university rankings"},
          {circle:"circle",index:"08",name:"Libyan government forces shelled the besieged rebel-held"},
          {circle:"circle",index:"09",name:"Apple founder cheated"},
          {circle:"circle",index:"10",name:"In Cairo, he emphasized his Muslim heritage to show Muslims "}
        ],
      }
    },
    components: {

    },
    methods: {

    },
    mounted() {
      var that=this;
      var index=0;
      var data=[[
        {circle:"circle circle1",index:"01",name:"U.S. election"},
        {circle:"circle circle2",index:"02",name:"Trump Visits China"},
        {circle:"circle circle3",index:"03",name:"The U.S. president announced the amendment of the constitution"},
        {circle:"circle",index:"04",name:"North Korean athletes attend Winter Olympics"},
        {circle:"circle",index:"05",name:"The world's first artificial heart"},
        {circle:"circle",index:"06",name:"Influenza virus quietly changed"},
        {circle:"circle",index:"07",name:"China's best university rankings"},
        {circle:"circle",index:"08",name:"Libyan government forces shelled the besieged rebel-held"},
        {circle:"circle",index:"09",name:"Apple founder cheated"},
        {circle:"circle",index:"10",name:"In Cairo, he emphasized his Muslim heritage to show Muslims "}
      ],[
        {circle:"circle circle1",index:"01",name:"North Korean athletes attend Winter Olympics"},
        {circle:"circle circle2",index:"02",name:"Libyan government forces shelled the besieged rebel-held"},
        {circle:"circle circle3",index:"03",name:"Apple founder cheated"},
        {circle:"circle",index:"04",name:"U.S. election"},
        {circle:"circle",index:"05",name:"The world's first artificial heart"},
        {circle:"circle",index:"06",name:"Influenza virus quietly changed"},
        {circle:"circle",index:"07",name:"China's best university rankings"},
        {circle:"circle",index:"08",name:"Trump Visits China"},
        {circle:"circle",index:"09",name:"The U.S. president announced the amendment of the constitution"},
        {circle:"circle",index:"10",name:"In Cairo, he emphasized his Muslim heritage to show Muslims"}
      ],[
        {circle:"circle circle1",index:"01",name:"In Cairo, he emphasized his Muslim heritage to show Muslims"},
        {circle:"circle circle2",index:"02",name:"Apple founder cheated"},
        {circle:"circle circle3",index:"03",name:"China's best university rankings"},
        {circle:"circle",index:"04",name:"North Korean athletes attend Winter Olympics"},
        {circle:"circle",index:"05",name:"The world's first artificial heart"},
        {circle:"circle",index:"06",name:"Influenza virus quietly changed"},
        {circle:"circle",index:"07",name:"The U.S. president announced the amendment of the constitution"},
        {circle:"circle",index:"08",name:"Libyan government forces shelled the besieged rebel-held"},
        {circle:"circle",index:"09",name:"Trump Visits China"},
        {circle:"circle",index:"10",name:"U.S. election"}
      ]];
      that.chartobj=setInterval(function () {
        if(index<2){
          index++;
        }else{
          index=0;
        }
        $(".hotContainer .top .carousel").removeClass("selected");
        $(".hotContainer .top .carousel").eq(index).addClass("selected");
        that.data=data[index];
      },10000)
    },
    destroyed(){
      var that=this;
      window.clearInterval(that.chartobj);
    },
  }
</script>

<style scoped>
  .hotContainer{
    width: 790px;
    height: 512px;
    opacity: 0.9;
    background: #0D1B3C;
    margin-top: 20px;
  }
  .hotContainer .top{
    width: 100%;
    height: 55px;
    opacity: 0.7;
    border-bottom: 1px solid #28496C;
    display: flex;
    align-items: center;
  }
  .hotContainer .top .imgbar{
    margin-left: 27px;
    background: url(../../assets/images/window.png) no-repeat;
    background-size: 100%;
    width: 30px;
    height: 30px;
  }
  .hotContainer .top .title{
    ont-family: HelveticaNeue-Medium;
    font-size: 20px;
    color: #FFFFFF;
    line-height: 20px;
    display: inline-block;
    width:276px;
    margin-left: 21px;
    text-align: left;
  }
  .hotContainer .top .carousel{
    height: 100%;
    width: 80px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  .hotContainer .top .carousel span{
    font-size: 20px;
    color: #7B93BE;
    letter-spacing: 0;
    line-height: 18px;
  }
  .hotContainer .top .selected span{
    color: #7EC1F6 !important;
  }
  .hotContainer .top .carousel .cursor{
    width: 80px;
    height: 18px;
    display: flex;
    align-items: flex-end;
  }
  .hotContainer .top .selected .cursor{
    /*opacity: 0.5;*/
    background-image: linear-gradient(-180deg, rgba(31,125,200,0.00) 28%, #2886D0 100%);
    /*border-bottom: 4px solid #7EC1F6;*/
  }
  .hotContainer .top .selected .cursor .bottomLine{
    width: 100%;
    height: 4px;
    background-color: #7EC1F6;
  }
  .hotContainer .top .day,.hotContainer .top .week{
    margin-right: 65px;
  }
  .hotContainer .chart{
    width: 100%;
    height: calc(100% - 55px);
  }
  #hotChart .item{
    display: flex;
    align-items: center;
    margin-top: 26px;
  }
  #hotChart .item .circle{
    width: 10px;
    height: 10px;
    border-radius: 5px;
    margin-left: 15px;
  }
  #hotChart .item .circle1{
    background: #DC524C;
  }
  #hotChart .item .circle2{
    background: #F37B1F;
  }
  #hotChart .item .circle3{
    background: #5EB95E;
  }
  #hotChart .item .index{
    font-family: HelveticaNeue-Bold;
    font-size: 16px;
    color: #FDFDFD;
    letter-spacing: 0;
    line-height: 16px;
    margin-left: 10px;
  }
  #hotChart .item img{
    width: 18px;
    height: 18px;
    margin-left: 16px;
  }
  #hotChart .item .name1{
    display: inline-block;
    font-family: HelveticaNeue;
    font-size: 18px;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 18px;
    width: 690px;
    margin-left: 30px;
    text-align: left;
  }
  #hotChart .item .name3{
    display: inline-block;
    font-family: HelveticaNeue;
    font-size: 18px;
    color: #7B93BE;
    letter-spacing: 0;
    line-height: 18px;
    width: 690px;
    margin-left: 30px;
    text-align: left;
  }
</style>
