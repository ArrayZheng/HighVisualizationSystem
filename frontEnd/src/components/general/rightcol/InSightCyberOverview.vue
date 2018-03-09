<template>
  <div class="widget">
    <div class="title">
      <div class="imgbar"></div>
      <span class="title_name"> Public Opinion Situation</span>
    </div>
    <div class="chart">
      <div class="card">
        <div class="rect">
          <div class="count-num">{{information.toLocaleString()}}</div>
          <div class="count-name">Information</div>
        </div>
        <img :src="circlePng">
        <img style="top:30px" src="./../../../assets/images/information.png">
      </div>

      <div class="card">
        <div class="rect">
          <div class="count-num">{{addedToday.toLocaleString()}}</div>
          <div class="count-name">Added today</div>
        </div>
        <img :src="circlePng">
        <img style="top:30px" src="./../../../assets/images/added_today.png">
      </div>

      <div class="card">
        <div class="rect">
          <div class="count-num">{{twitter.toLocaleString()}}</div>
          <div class="count-name">Twitter</div>
        </div>
        <img :src="circlePng">
        <img style="top:30px" src="./../../../assets/images/twitter.png">
      </div>

      <div class="card">
        <div class="rect">
          <div class="count-num">{{facebook.toLocaleString()}}</div>
          <div class="count-name">Facebook</div>
        </div>
        <img :src="circlePng">
        <img style="top:30px" src="./../../../assets/images/facebook.png">
      </div>

      <div class="card">
        <div class="rect">
          <div class="count-num">{{events.toLocaleString()}}</div>
          <div class="count-name">Events</div>
        </div>
        <img :src="circlePng">
        <img style="top:30px" src="./../../../assets/images/events.png">
      </div>

      <div class="card">
        <div class="rect">
          <div class="count-num">{{account.toLocaleString()}}</div>
          <div class="count-name">Account</div>
        </div>
        <img :src="circlePng">
        <img style="top:30px" src="./../../../assets/images/account.png">
      </div>
    </div>
  </div>
</template>

<script>
  import circlePng from '@/assets/images/round.png'
    export default {
      name:'insight-cyber-overview',
      data(){
        return{
          circlePng:circlePng,
          information:5123516130,
          addedToday:5370653,
          twitter:123797290,
          facebook:5123516130,
          events:5370653,
          account:123797270
        }
      },
      methods:{
      },
      mounted(){
      },
      beforeDestroy(){
      }
    }
</script>

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
    padding: 10px 20px 20px;
    height: 438px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .card{
    position: relative;
    width: 240px;
    height: 204px;
  }
  .card img{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
   }
  .card .rect{
    position: absolute;
    width: 100%;
    border: 1px solid #335E80;
    height: 150px;
    bottom: 0;
    background:no-repeat url("./../../../assets/images/card.png") 50% 50%;
  }
  .count-num{
    margin-top: 64px;
    text-align: center;
    font-size: 28px;
    color: #709CE0;
    line-height: 32px;
  }
  .count-name{
    margin-top: 12px;
    font-size: 18px;
    color: #FFFFFF;
    line-height: 18px;
  }
</style>
