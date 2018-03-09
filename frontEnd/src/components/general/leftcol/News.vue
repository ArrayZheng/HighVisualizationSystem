<template>
  <div class="widget">
    <div class="title">
      <div class="imgbar"></div>
      <span class="title_name"> Important news</span>
    </div>
    <div class="chart">
      <swiper :options="swiperOption">
        <swiper-slide>
          <div class="swipper-content">
            <td-item v-if="index<3" v-for="(item, index) in noticeData" :key="item.id" :data="item"></td-item>
          </div>
        </swiper-slide>
        <swiper-slide v-show="twoPage">
          <div class="swipper-content">
            <td-item v-if="index>=3&&index<6" v-for="(item, index) in noticeData" :key="item.id" :data="item"></td-item>
          </div>
        </swiper-slide>
        <swiper-slide v-show="thirdPage">
          <div class="swipper-content">
            <td-item v-if="index>=6&&index<9" v-for="(item, index) in noticeData" :key="item.id" :data="item"></td-item>
          </div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueAwesomeSwiper from 'vue-awesome-swiper'

  import 'swiper/dist/css/swiper.css'
  Vue.use(VueAwesomeSwiper)
  var tdItem={
    name:'new',
    props: ['data'],
    template: '<div class="notice">' +
    '<div class="line time">' +
    '<span class="notice-time">{{ data.time}}</span>' +
    '</div>' +
    '<div class="line">' +
    '<span class="notice-info">{{ data.content }}</span>' +
    '</div>' +
    '</div>'
  }
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
    export default {
      name:'news',
      data(){
        return{
          swiperOption: {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            autoplay: 10000,
          },
          twoPage: true,
          thirdPage: true,
          noticeData: [{
            id: 0,
            time: '2017/08/22 13:01:16',
            content: 'JOHN SNOW knows nothing',
            type: 'alarm',
            show: 'true' === 'false' ? false : true
          }, {
            id: 1,
            time: '2017/08/21 16:03:36',
            content: "Tyrion Lannister killed his father",
            type: 'alarm',
            show: 'true' === 'false' ? false : true
          }, {
            id: 2,
            time: '2017/08/17 13:01:16',
            content: "NBA will get started on 11/10",
            type: 'event',
            show: 'true' === 'false' ? false : true
          }, {
            id: 3,
            time: '2017/07/28 13:01:16',
            content: 'Fixie tote bag ethnic keytar. Neutra vinyl American',
            type: 'alarm',
            show: 'true' === 'false' ? false : true
          }, {
            id: 4,
            time: '2017/07/11 13:01:16',
            content: "Keytar McSweeney's Williamsburg, readymade leggings try-hard 90's street art",
            type: 'dynamic',
            show: 'true' === 'false' ? false : true
          }, {
            id: 5,
            time: '2017/07/09 13:01:16',
            content: "This is a good news",
            type: 'dynamic',
            show: 'true' === 'false' ? false : true
          }, {
            id: 6,
            time: '2017/06/11 13:01:16',
            content: 'Presdent XIJINPING loves soccer',
            type: 'news',
            show: 'true' === 'false' ? false : true
          }, {
            id: 7,
            time: '2017/05/11 13:01:16',
            content: "Kyrie Irving arrive CHINA",
            type: 'news',
            show: 'true' === 'false' ? false : true
          }, {
            id: 8,
            time: '2017/01/11 13:01:16',
            content: "Melo To Houston",
            type: 'event',
            show: 'true' === 'false' ? false : true
          }],
        }
      },
      components: {
        swiper,
        swiperSlide,
        tdItem
      },
      methods:{
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
    padding: 10px;
    height: 458px;
  }
  .swipper-content {
    padding: 20px 10px 0;
    height: 422px;
    overflow: auto;
  }
</style>

<style>
  .swipper-content .notice {
    min-height: 80px;
    background: rgba(47, 77, 116, 0.2);
    padding: 14px 30px;
    margin-bottom: 20px;
  }

  .swipper-content .notice .line {
    line-height: 28px;
    font-family: "HelveticaNeue-Medium";
    font-size: 20px;
    color: #fff;
    text-align: left;
  }
  .swipper-content .notice .line .notice-info {
    line-height: 30px;
  }

  .swipper-content .notice .time {
    color: #7EC1F6;
  }
  .swiper-pagination-bullet {
    width: 12px;
    height: 12px;
    display: inline-block;
    border-radius: 100%;
    background: #3d5370;
    opacity: 1;
  }

  .swiper-pagination-bullet-active {
    opacity: 1;
    background: #7ec1f6;
    border-radius: 8px;
    width: 40px;
    height: 12px;
  }
  .swipper-content .notice .line span {
    word-break: break-all;
  }
</style>
