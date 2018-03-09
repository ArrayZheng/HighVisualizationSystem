<template>
  <div class="leaderContainer">
    <div class="top">
      <div class="imgbar"></div>
      <span class="title">Opinion leader</span>
      <!--<div class="day carousel selected">-->
        <!--<span>Day</span>-->
        <!--<div class="cursor">-->
          <!--<div class="bottomLine"></div>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="week carousel">-->
        <!--<span>Week</span>-->
        <!--<div class="cursor">-->
          <!--<div class="bottomLine"></div>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="month carousel">-->
        <!--<span>Month</span>-->
        <!--<div class="cursor">-->
          <!--<div class="bottomLine"></div>-->
        <!--</div>-->
      <!--</div>-->
    </div>
    <div class="chart" id="leaderChart">
      <div class="item" v-for="(item,index) in data">
        <div :class="item.circle" v-show="index<3"></div>
        <div :class="item.circle" v-show="index>2"></div>
        <span class="index">{{item.index}}</span>
        <img :src="item.img" alt="">
        <span :class="index<3?'name1':'name3'">{{item.name1}}</span>
        <span class="name2">{{item.name2}}</span>
        <span class="num">{{item.num}}</span>
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
          chartObj:null,
          data:[
              {circle:"circle circle1",index:"01",img:"static/images/intelligence/l1.jpg",name1:"AppSame",name2:"@AppSame",num:"132,344"},
              {circle:"circle circle2",index:"02",img:"static/images/intelligence/l2.jpg",name1:"Paul Lopez",name2:"@Andrew Peterson",num:"123,699"},
              {circle:"circle circle3",index:"03",img:"static/images/intelligence/l3.jpg",name1:"Emma Richards",name2:"@Evelyn Barrett",num:"118,333"},
              {circle:"circle",index:"04",img:"static/images/intelligence/l4.jpg",name1:"30,000 ARMY SUIDES",name2:"@Judy Perez",num:"106,270"},
              {circle:"circle",index:"05",img:"static/images/intelligence/l5.jpg",name1:"Billy Hernandez",name2:"@Gregory Castro",num:"98,454"},
              {circle:"circle",index:"06",img:"static/images/intelligence/l6.jpg",name1:"Kevin Arnold",name2:"@Pamela Lane",num:"4,903"},
              {circle:"circle",index:"07",img:"static/images/intelligence/l7.jpg",name1:"Kathryn Mason",name2:"@Mark Reynolds",num:"3,494"},
              {circle:"circle",index:"08",img:"static/images/intelligence/l8.jpg",name1:"Laura Stewart",name2:"@Judy Grant",num:"2,803"},
              {circle:"circle",index:"09",img:"static/images/intelligence/l9.jpg",name1:"Cheryl Morrison",name2:"@Raymond Marshall",num:"2962"},
              {circle:"circle",index:"10",img:"static/images/intelligence/l10.jpg",name1:"Willie Spencer",name2:"@Judy Simpson",num:"2351"}
          ],
        }
      },
      components: {

      },
      methods: {

      },
      mounted() {
        var that=this;


      },
      destroyed(){
          var that=this;
      },
    }
</script>

<style scoped>
.leaderContainer{
  width: 790px;
  height: 512px;
  opacity: 0.9;
  background: #0D1B3C;
  margin-top: 20px;
}
.leaderContainer .top{
  width: 100%;
  height: 55px;
  opacity: 0.7;
  border-bottom: 1px solid #28496C;
  display: flex;
  align-items: center;
}
.leaderContainer .top .imgbar{
  margin-left: 27px;
  background: url(../../assets/images/window.png) no-repeat;
  background-size: 100%;
  width: 30px;
  height: 30px;
}
.leaderContainer .top .title{
  ont-family: HelveticaNeue-Medium;
  font-size: 20px;
  color: #FFFFFF;
  line-height: 20px;
  display: inline-block;
  width:276px;
  margin-left: 21px;
  text-align: left;
}
.leaderContainer .top .carousel{
  height: 100%;
  width: 80px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.leaderContainer .top .carousel span{
  font-size: 20px;
  color: #7B93BE;
  letter-spacing: 0;
  line-height: 18px;
}
.leaderContainer .top .selected span{
  color: #7EC1F6 !important;
}
.leaderContainer .top .carousel .cursor{
  width: 80px;
  height: 18px;
  display: flex;
  align-items: flex-end;
}
.leaderContainer .top .selected .cursor{
  opacity: 0.5;
  background-image: linear-gradient(-180deg, rgba(31,125,200,0.00) 28%, #2886D0 100%);
  /*border-bottom: 4px solid #7EC1F6;*/
}
.leaderContainer .top .selected .cursor .bottomLine{
  width: 100%;
  height: 4px;
  background-color: #7EC1F6;
}
.leaderContainer .top .day,.leaderContainer .top .week{
  margin-right: 65px;
}
  .leaderContainer .chart{
    width: 100%;
    height: calc(100% - 55px);
  }
  #leaderChart .item{
    display: flex;
    align-items: center;
    margin-top: 26px;
  }
#leaderChart .item .circle{
  width: 10px;
  height: 10px;
  border-radius: 5px;
  margin-left: 15px;
}
#leaderChart .item .circle1{
  background: #DC524C;
}
#leaderChart .item .circle2{
  background: #F37B1F;
}
#leaderChart .item .circle3{
  background: #5EB95E;
}
#leaderChart .item .index{
  font-family: HelveticaNeue-Bold;
  font-size: 16px;
  color: #FDFDFD;
  letter-spacing: 0;
  line-height: 16px;
  margin-left: 10px;
}
#leaderChart .item img{
  width: 18px;
  height: 18px;
  margin-left: 16px;
}
#leaderChart .item .name1{
  display: inline-block;
  font-family: HelveticaNeue;
  font-size: 18px;
  color: #FFFFFF;
  letter-spacing: 0;
  line-height: 18px;
  width: 220px;
  margin-left: 30px;
  text-align: left;
}
#leaderChart .item .name2{
  display: inline-block;
  font-family: HelveticaNeue;
  font-size: 18px;
  color: #2581C1;
  letter-spacing: 0;
  line-height: 18px;
  width: 200px;
  margin-left: 50px;
  text-align: left;
}
#leaderChart .item .name3{
  display: inline-block;
  font-family: HelveticaNeue;
  font-size: 18px;
  color: #7B93BE;
  letter-spacing: 0;
  line-height: 18px;
  width: 220px;
  margin-left: 30px;
  text-align: left;
}
#leaderChart .item .num{
  display: inline-block;
  font-family: HelveticaNeue;
  font-size: 18px;
  color: #FFFFFF;
  letter-spacing: 0;
  line-height: 18px;
  width: 130px;
  margin-left: 52px;
  text-align: right;
}
</style>
