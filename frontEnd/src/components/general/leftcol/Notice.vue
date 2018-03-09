<template>
  <div class="widget">
    <div class="title">
      <div class="imgbar"></div>
      <span class="title_name"> Notification</span>
    </div>
    <div class="chart">
      <div class="noti-contentTitle">
        <span id="notice-title">{{notice.title}}</span>
      </div>
      <div class="noti-content">
        <span id="notice-content">{{notice.content}}</span>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name:'notice',
      data(){
        return{
          notice:{
            title:'Notification',
            content:'From the moment\n' +
            'I started rolling my dad’s tube socks\n' +
            'And shooting imaginary\n' +
            'Game-winning shots\n' +
            'In the Great Western Forum\n' +
            'I knew one thing was real:\n' +
            '\n' +
            'I fell in love with you.\n' +
            '\n' +
            'A love so deep I gave you my all —\n' +
            'From my mind & body\n' +
            'To my spirit & soul.\n' +
            '\n' +
            'As a six-year-old boy\n' +
            'Deeply in love with you\n' +
            'I never saw the end of the tunnel.\n' +
            'I only saw myself\n' +
            'Running out of one.\n' +
            'Love you always,\n' +
            'Kobe'
          },
          scrollInterval:null
        }
      },
      methods:{
        initHttpGetData() {
          var that=this;
          console.log($('.noti-content').offset().top)
          $('.noti-content').animate({
            scrollTop:$('.noti-content').offset().top
          }, 4000);
          $('.noti-content').animate({scrollTop: '0px'}, 1000);

          window.clearInterval(that.scrollInterval);
          that.scrollInterval=setInterval(function(){
            $('.noti-content').animate({
              scrollTop:$('.noti-content').offset().top
            }, 4000);
            $('.noti-content').animate({scrollTop: '0px'}, 1000);
          },10000);
        },
      },
      mounted(){
        this.initHttpGetData();
      },
      destroyed(){
        window.clearInterval(this.scrollInterval);
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
  .widget .chart .noti-contentTitle{
    margin-top: 30px;
    font-family: 'HelveticaNeue-Bold';
    font-size: 40px;
    color: #FFD885;
    line-height: 40px;
  }
  .widget .chart .noti-content{
    max-height: 328px;
    /*word-break: break-all;*/
    overflow-y: auto;
    text-align: justify;
    margin-top: 30px;
    font-size: 24px;
    font-family: 'HelveticaNeue-Medium';
    color:#fff;
    line-height: 40px;
    width: auto;
    padding: 0 30px 20px;
  }
</style>
