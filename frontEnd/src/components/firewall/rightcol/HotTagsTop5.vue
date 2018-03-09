<template>
  <div class="widget">
    <div class="title">
      <div class="imgbar"></div>
      <span class="title_name"> Hot tags block TOP5</span>
    </div>
    <div class="chart" id="hotTagTop10">
      <table>
        <thead v-if="false">
        <tr>
          <th>circle</th>
          <th>index</th>
          <th>title</th>
          <th>value</th>
        </tr>
        </thead>
        <tbody>
        <tr class="item" v-for ="(block,index) in tagBlocksTop10" :class="{'deep-row':index<3}" >
          <td class="circle-span"><span class="yuanxing circle" :class="{'red':index==0,'yellow':index==1,'green':index==2}" v-show="index<3"></span></td>
          <td class="item-index">{{(index+1)<=9?'0'+(index+1):(index+1)}}</td>
          <td class="item-title"><span class="value-line-tag" ></span><span style="position: absolute;left:0;top:calc(50% - 9px);">{{block.title}}</span></td>
          <td class="item-value"><span class="time">{{block.value.toLocaleString()}}</span></td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  const Top10=[{
    title:'Winter Olympics',
    width:'20%',
    value:parseInt(Math.random()*100000000)
  },{
    title:'Trump',
    width:'100%',
    value:parseInt(Math.random()*100000000)
  },{
    title:'Housing prices',
    width:'20%',
    value:parseInt(Math.random()*100000000)
  },{
    title:'Spring festival',
    width:'100%',
    value:parseInt(Math.random()*100000000)
  },{
    title:'Park Geun-hye',
    width:'20%',
    value:parseInt(Math.random()*100000000)
  }];
    export default {
      name:'tab-block10',
      data(){
        return{
          setInterval:null,
          tagBlocksTop10:[]
        }
      },
      methods:{

      },
      mounted(){
        let that=this;
        that.tagBlocksTop10=Top10;
        that.tagBlocksTop10.sort(function(a,b){
          return b.value-a.value
        })
      },
      updated(){
        let that=this;
        that.tagBlocksTop10.forEach(function(item,id){
          item.width=(item.value/that.tagBlocksTop10[0].value*80+20)+'%';
          $('.value-line-tag:eq('+id+')').animate({width:item.width},600)
        })
      },
      beforeDestroy(){
        var that=this;
        window.clearInterval(that.setInterval);
      }

    }
</script>

<style scoped="">
  .widget {
    position: relative;
    margin-bottom: 16px;
    width: 100%;
    height: 360px;
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
    height: 306px;
  }
  table,tr{
    width:100%;
  }
  .item{
    font-family: HelveticaNeue;
    height: 55px;
    width: 100%;
    font-size: 18px;
    color: rgba(152,170,204,1);
    line-height: 55px;
  }
  .deep-row{
    font-size: 18px;
    color: #FFFFFF;
  }
  .yuanxing{
    border: 7px solid #fff;
    border-radius: 7px;
  }
  .circle-span{
    width: 6%;
    text-align: center;
  }
  .red{
    border-color:rgba(247,105,111,1);
  }
  .yellow{
    border-color:rgba(255,216,133,1);
  }
  .green{
    border-color: rgba(0,190,170,1);
  }
  .item-index{
    width: 6%;
    text-align: left;
  }
  .item-title{
    text-align: left;
    width: 67%;
    line-height: 100%;
    vertical-align: middle;
    padding: 0!important;
    position: relative;
  }
  .value-line-tag{
    width: 0%;
    height: 55px;
    background: linear-gradient(to right,rgba(126,193,246,0.06),rgba(126,193,246,1));
  }
</style>
