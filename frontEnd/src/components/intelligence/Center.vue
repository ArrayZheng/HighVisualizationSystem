<template>
  <div class="centerContainer">
    <div class="titleContainer">
      <div class="img">
        <img src="../../assets/images/top_bar.png" alt="">
      </div>

      <span>INSIGHT CYBER</span>
    </div>
    <div class="dataContainer">
      <div class="leftContainer">
        <div class="top"></div>
        <div class="center">
          <div class="item" v-for="(item,index) in data.left">
            <span class="num">{{item.value|numFormate}}</span>
            <span class="name">{{item.name}}</span>
          </div>
        </div>
        <div class="bottom"></div>
      </div>
      <div class="leftContainer">
        <div class="top"></div>
        <div class="center">
          <div class="item" v-for="(item,index) in data.right">
            <span class="num">{{item.value|numFormate}}</span>
            <span class="name">{{item.name}}</span>
          </div>
        </div>
        <div class="bottom"></div>
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
            data:{
                left:[{name:"Information",value:23612500},{name:"Added today",value:23612500},{name:"Twitter",value:23612500}],
              right:[{name:"Facebook",value:23612500},{name:"Events",value:23612500},{name:"Account",value:23612500}]
            },
          chartobj:{},
        }
      },
      components: {

      },
      methods: {
          setData(){
              var that=this;
            for(var i=0;i<3;i++){
              that.data.left[i].value=parseInt(Math.random()*10000000);
              that.data.right[i].value=parseInt(Math.random()*10000000);
            }
          }
      },
      filters: {
        numFormate: function (str) {
          if (!str) return ''
          str = str.toString()
          if(/\./.test(str)){
            return str.replace(/\d(?=(\d{3})+\.)/g, "$&,").split("").reverse().join("").replace(/\d(?=(\d{3})+\.)/g, "$&,").split("").reverse().join("");
          }else{
            return str.replace(/\d(?=(\d{3})+$)/g, "$&,");
          }
        }
      },
      mounted() {
        var that=this;
        var index=0;
        that.setData();
        that.chartobj=setInterval(function () {
            that.setData();
        },4000)
      },
      updated() {},
      destroyed(){
          var that=this;
        window.clearInterval(that.chartobj);
      },
    }
</script>

<style scoped>
  .centerContainer{
    width: 100%;
    height: 100%;
  }
  .centerContainer  .titleContainer{
    width: 100%;
    height: 95px;
    background: url(../../assets/images/top_bar.png) no-repeat center top;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .centerContainer  .titleContainer .img{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
  }
  .centerContainer  .titleContainer .img img{
    margin-left: -830px;
  }
  .centerContainer  .titleContainer span{
    font-family: HelveticaNeue-Medium;
    font-size: 26px;
    color: #FFFFFF;
    line-height: 26px;
    margin-top: -20px;
    z-index: 9;
  }
  .centerContainer .dataContainer{
    /*width: 100%;*/
    width: 100%;
    height: 136px;
    /*border: 1px solid yellow;*/
    display: flex;
    justify-content: space-between;
    margin-top: -33px;
  }
  .centerContainer .dataContainer .leftContainer, .centerContainer .dataContainer .rightContainer{
    width: 650px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .centerContainer .dataContainer .leftContainer .top,.centerContainer .dataContainer .leftContainer .bottom{
    width: 100%;
    height: 2px;
    background-image: linear-gradient(-90deg, #0C3F7B 30%, #1089BE 49%, #0C3F7B 68%);
    z-index: 999;
  }
  .centerContainer .dataContainer .leftContainer .center{
    width: 100%;
    height: calc(100% - 4px);
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #111F44;
    z-index: 999;
  }
  .centerContainer .item{
    width: 194px;
    height: 113px;
    opacity: 0.9;
    background-image: linear-gradient(-1deg, rgba(22,85,134,0.00) 26%, #194F7A 100%);
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .centerContainer .item .num{
    font-family: HelveticaNeue-Medium;
    font-size: 24px;
    color: #7EC1F6;
    letter-spacing: 0;
  }
  .centerContainer .item .name{
    font-family: HelveticaNeue;
    font-size: 18px;
    color: #97C1E5;
    letter-spacing: 0;
    margin-top: 20px;
  }
</style>
