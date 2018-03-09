<template>
  <div class="sourceContainer">
    <div class="top">
      <div class="imgbar"></div>
      <span class="title">Source of information</span>
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
    <div class="chart" id="pieEc"></div>
  </div>
</template>

<script>
  import locales from "./../../locales/event/index"
  import leftMid from './source'
    export default {
      locales,
      name: 'controller-app',
      data() {
        return {
          data: '',
          setintervel: '',
          chartobj:{},
        }
      },
      components: {

      },
      methods: {
        init: leftMid.init,
        setDom: leftMid.setDom,
        dispose: leftMid.dispose,
        injectData: function() {
          let that = this;
          this.data = [{
            name: 'Policía',
            value: ''
          }, {
            name: 'Bomberos',
            value: ''
          }, {
            name: 'Tráfico',
            value: ''
          }, {
            name: 'Médicos',
            value: ''
          }];
          this.init(this.data);
        },
      },
      mounted() {
        var that=this;
        that.setDom();
//        this.injectData();
//        that.init([{name:'Mirror',value:1492},{name:'Euronews.com',value:5265},{name:'The guardian',value:3259},{name:'Voanews',value:3134},{name:'Us Online',value:3555},{name:'Newsweek',value:2312},{name:'Other',value:1334}]);
        var index=0;
        var data=[
          [{name:'Mirror',value:1492},{name:'Euronews.com',value:5265},{name:'The guardian',value:3259},{name:'Voanews',value:3134},{name:'Us Online',value:3555},{name:'Newsweek',value:2312},{name:'Other',value:1334}],
          [{name:'Mirror',value:21492},{name:'Euronews.com',value:45265},{name:'The guardian',value:13259},{name:'Voanews',value:43134},{name:'Us Online',value:63555},{name:'Newsweek',value:52312},{name:'Other',value:21334}],
          [{name:'Mirror',value:81492},{name:'Euronews.com',value:95265},{name:'The guardian',value:103259},{name:'Voanews',value:113134},{name:'Us Online',value:83555},{name:'Newsweek',value:92312},{name:'Other',value:101334}]]
        that.init(data[index]);
       that.chartobj=setInterval(function () {
          if(index<2){
            index++;
          }else{
            index=0;
          }
          $(".sourceContainer .top .carousel").removeClass("selected");
          $(".sourceContainer .top .carousel").eq(index).addClass("selected");
          that.init(data[index]);
        },10000)

      },
      destroyed(){
        var that=this;
        window.clearInterval(that.chartobj);
        that.dispose();
      },
    }
</script>

<style scoped>
.sourceContainer{
  width: 790px;
  height: 336px;
  opacity: 0.9;
  background: #0D1B3C;
  margin-top: 20px;
}
.sourceContainer .top{
  width: 100%;
  height: 55px;
  opacity: 0.7;
  border-bottom: 1px solid #28496C;
  display: flex;
  align-items: center;
}
.sourceContainer .top .imgbar{
  margin-left: 27px;
  background: url(../../assets/images/window.png) no-repeat;
  background-size: 100%;
  width: 30px;
  height: 30px;
}
.sourceContainer .top .title{
  ont-family: HelveticaNeue-Medium;
  font-size: 20px;
  color: #FFFFFF;
  line-height: 20px;
  display: inline-block;
  width:276px;
  margin-left: 21px;
  text-align: left;
}
.sourceContainer .top .carousel{
  height: 100%;
  width: 80px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.sourceContainer .top .carousel span{
  font-size: 20px;
  color: #7B93BE;
  letter-spacing: 0;
  line-height: 18px;
}
.sourceContainer .top .selected span{
  color: #7EC1F6 !important;
}
.sourceContainer .top .carousel .cursor{
  width: 80px;
  height: 18px;
  display: flex;
  align-items: flex-end;
}
.sourceContainer .top .selected .cursor{
  /*opacity: 0.5;*/
  background-image: linear-gradient(-180deg, rgba(31,125,200,0.00) 28%, #2886D0 100%);
  /*border-bottom: 4px solid #7EC1F6;*/
}
.sourceContainer .top .selected .cursor .bottomLine{
  width: 100%;
  height: 4px;
  background-color: #7EC1F6;
}
.sourceContainer .top .day,.sourceContainer .top .week{
  margin-right: 65px;
}
  .sourceContainer .chart{
    width: 100%;
    height: calc(100% - 55px);
  }
</style>
