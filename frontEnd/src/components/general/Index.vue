<template>
  <div class="all">
    <div class="topbar">
      <img :src="topbarImg">
      <span class="title">GENERAL SCENE</span>
    </div>
    <left-col></left-col>
    <right-col></right-col>
  </div>
</template>

<script>
  import topbarImg from '@/assets/images/top_bar.png'
  import leftCol from './LeftCol.vue'
  import rightCol from './RightCol.vue'
  export default {
    name:'firewall',
    data(){
      return{
        topbarImg:topbarImg
      }
    },
    components:{
      leftCol,
      rightCol,
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .all{
    background: no-repeat url(../../assets/images/bg.jpg) 100% 100%;
    position: relative;
    width: 3840px;
    height: 1080px;
  .topbar{
    text-align: center;
    position:absolute;
    left:0;
    z-index: 10;
    top:0;
  .title{
    position: absolute;
    font-family: HelveticaNeue-Medium;
    font-size: 26px;
    color: #FFFFFF;
    line-height: 26px;
    left:0; right:0;
    margin:auto;
    top:22px;
  }
  }
  }
</style>
