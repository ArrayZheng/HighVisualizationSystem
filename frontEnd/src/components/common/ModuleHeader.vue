<template>
  <div class="widget">
    <div class="title">
      <div class="imgbar"></div>
      <div class="imgenlarge"></div>
      <span class="title_name"> {{message}}</span>
    </div>
  </div>
</template>
<script>
  export  default{
    props:["message"]
  }
</script>
<style scoped>
  .widget{
    position: relative;
    /*margin-bottom: 30px;*/
    width:1320px;
    height: 120px;
    z-index: 999;
    text-align: center;
    background-color: rgba(13, 27, 60,0.8);/* IE9、标准浏览器、IE6和部分IE7内核的浏览器(如QQ浏览器)会读懂 */
  }
  .widget .title{
    /*padding: 25px 0 29px 0 ;
    height: 24px;*/
    text-align: initial;
    width: 100%;
    height:100%;
  }
  .widget .title:before {
    content: '';
    z-index: 998;
    position: absolute;
    width: 100%; height: 3px;
    top: 120px;
  }
  .widget .title:before {
    background: -webkit-linear-gradient(right, rgba(40, 73, 108,1), rgba(68, 65, 136,0)); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, rgba(40, 73, 108,1), rgba(68, 65, 136,0)); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, rgba(40, 73, 108,1), rgba(68, 65, 136,0)); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, rgba(40, 73, 108,1),rgba(68, 65, 136,0.2)); /* 标准的语法（必须放在最后） */
  }
  .widget .title .title_name{
    left: 144px;
    font-size: 3.8em;
    color:#fff;
    line-height: 38px;
    text-align: left;
    position: absolute;
    top:40px;
  }
  .widget .title .imgbar{
    display: inline-block;
    position: absolute;
    left: 47px;
    background: url(../../assets/images/window.png) no-repeat;
    background-size: 100%;
    width: 66px;
    height: 61px;
    top:30px;
  }
  .widget .title .imgenlarge{
    display: inline-block;
    position: absolute;
    right: 39px;
    background: url(../../../static/images/enlarge.png) no-repeat;
    background-size: 100%;
    width: 42px;
    height: 42px;
    top:39px;
  }
  .widget .chart{
    padding: 10px ;
    height: 393px;
  }
</style>
