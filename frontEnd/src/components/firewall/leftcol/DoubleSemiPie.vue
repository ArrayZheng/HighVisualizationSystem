<template>
  <div class="widget">
    <div class="title">
      <div class="imgbar"></div>
      <span class="title_name"> General situation of protocol monitoring</span>
    </div>
    <div class="chart" id="doubleSemiPieEc"></div>
    <div class="self-legend">
      <div class="row-info">
        <div style="line-height: 46px;margin-right: 35px">
          <span class="circle blue"></span>
        </div>
        <div class="text-num">
          <span>Configuration protocol volume</span>
          <span class="text-blue" id="total">0</span>
        </div>
      </div>
      <div class="row-info">
        <div style="line-height: 46px;margin-right: 35px">
          <span class="circle green"></span>
        </div>
        <div class="text-num">
          <span>Monitoring amount</span>
          <span class="text-green" id="monitor">0</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import doubleSemiPieOp from './doubleSemiPie'
    export default {
      name:'doubleSemiPie',
      data(){
        return{
          setintervel:''
        }
      },
      methods:{
        init: doubleSemiPieOp.init,
        setDom: doubleSemiPieOp.setDom,
        dispose: doubleSemiPieOp.dispose,
        getRandomData(){
          let data=[{name:'total',value:2126347},{name:'monitor',value:1361200}];
          data[0].value+=parseInt(Math.random()*1000000)
          data[1].value+=parseInt(Math.random()*1000)
          return data;
        },
        getHttpData(){
          let that=this;
          that.init(that.getRandomData());
          that.setintervel=setInterval(function(){
            that.init(that.getRandomData());
          },5000)
        }
      },
      mounted() {
        this.setDom('doubleSemiPieEc');
        this.getHttpData();
      },
      destroyed(){
        let that=this
        window.clearInterval(that.setintervel);
        that.dispose();
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
  .self-legend{
    position: absolute;
    width: 340px;
    height: 300px;
    bottom: 0;
    right:0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .self-legend .row-info{
    width: 100%;
    height: 56px;
    margin:40px 0 50px;
    display: flex;
    justify-content: flex-start;

  }
  .self-legend .row-info:last-child{
     margin: 0px;
   }
  .blue{
    color:rgba(99,169,255,1);
    box-shadow: 5px 5px 5px rgba(99,169,255,0.3);;
  }
  .text-blue{
    font-size: 24px;
    color:rgba(99,169,255,1);
  }
  .text-green{
    font-size: 24px;
    color:rgba(0,190,170,1);
  }
  .green{
    color:rgba(0,190,170,1);
    box-shadow: 5px 5px 5px rgba(0,190,170,0.3);;
  }
  .circle{
    border: 10px solid;
    border-radius: 10px;
  }
  .text-num{
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    text-align: left;
    font-size: 18px;
    line-height: 18px;
    color: #D6F6FF;
  }
</style>
