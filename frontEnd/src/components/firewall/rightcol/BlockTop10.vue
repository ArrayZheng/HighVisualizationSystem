<template>
  <div class="widget">
    <div class="title">
      <div class="imgbar"></div>
      <span class="title_name"> Block top 10</span>
      <span style="position: relative;">
        <span class="tab-name">URL
        </span><span class="tab-name">WebSite
        </span><span class="tab-name">DNS</span>
        <div class="line"></div>
      </span>
    </div>
    <div class="chart" id="blockTop10">
      <table>
        <thead v-if="false">
          <tr>
            <th>circle</th>
            <th>index</th>
            <th>title</th>
            <th>length</th>
            <th>value</th>
          </tr>
        </thead>
        <tbody>
        <tr class="item" v-for ="(block,index) in blocksTop10" :class="{'deep-row':index<3}" >
          <td class="circle-span"><span class="yuanxing circle" :class="{'red':index==0,'yellow':index==1,'green':index==2}" v-show="index<3"></span></td>
          <td class="item-index">{{(index+1)<=9?'0'+(index+1):(index+1)}}</td>
          <td class="item-title">{{block.title}}</td>
          <td class="item-length"><span class="value-line" ></span></td>
          <td class="item-value"><span class="time">{{block.value.toLocaleString()}}</span></td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
    const URLTop10=[{
      title:'www.facebook.com',
      width:'20%',
      value:parseInt(Math.random()*100000000)
    },{
      title:'www.twitter.com',
      width:'100%',
      value:parseInt(Math.random()*100000000)
    },{
      title:'www.instagram.com',
      width:'20%',
      value:parseInt(Math.random()*100000000)
    },{
      title:'www.youtube.com',
      width:'100%',
      value:parseInt(Math.random()*100000000)
    },{
      title:'www.behance.net',
      width:'20%',
      value:parseInt(Math.random()*100000000)
    },{
      title:'www.google.com',
      width:'100%',
      value:parseInt(Math.random()*100000000)
    },{
      title:'www.baidu.com',
      width:'20%',
      value:parseInt(Math.random()*100000000)
    },{
      title:'www.500px.com',
      width:'100%',
      value:parseInt(Math.random()*100000000)
    },{
      title:'www.snazzymaps.com',
      width:'20%',
      value:parseInt(Math.random()*100000000)
    },{
      title:'www.thenounproject.com',
      width:'100%',
      value:parseInt(Math.random()*100000000)
    }];
    const WebSiteTop10=[{
      title:'facebook',
      width:'20%',
      value:parseInt(Math.random()*100000000)
    },{
      title:'twitter',
      width:'100%',
      value:parseInt(Math.random()*100000000)
    },{
      title:'instagram',
      width:'20%',
      value:parseInt(Math.random()*100000000)
    },{
      title:'youtube',
      width:'100%',
      value:parseInt(Math.random()*100000000)
    },{
      title:'behance',
      width:'20%',
      value:parseInt(Math.random()*100000000)
    },{
      title:'google',
      width:'100%',
      value:parseInt(Math.random()*100000000)
    },{
      title:'baidu',
      width:'20%',
      value:parseInt(Math.random()*100000000)
    },{
      title:'500px',
      width:'100%',
      value:parseInt(Math.random()*100000000)
    },{
      title:'snazzymaps',
      width:'20%',
      value:parseInt(Math.random()*100000000)
    },{
      title:'thenounproject',
      width:'100%',
      value:parseInt(Math.random()*100000000)
    }];
    const DNSTop10=[{
      title:'61.132.163.68',
      width:'20%',
      value:parseInt(Math.random()*100000000)
    },{
      title:'219.141.136.10',
      width:'100%',
      value:parseInt(Math.random()*100000000)
    },{
      title:'61.128.192.68',
      width:'20%',
      value:parseInt(Math.random()*100000000)
    },{
      title:'202.100.64.68',
      width:'100%',
      value:parseInt(Math.random()*100000000)
    },{
      title:'222.246.129.80',
      width:'20%',
      value:parseInt(Math.random()*100000000)
    },{
      title:'219.146.1.66',
      width:'100%',
      value:parseInt(Math.random()*100000000)
    },{
      title:'202.96.209.133',
      width:'20%',
      value:parseInt(Math.random()*100000000)
    },{
      title:'219.146.1.66',
      width:'100%',
      value:parseInt(Math.random()*100000000)
    },{
      title:'108.168.255.118',
      width:'20%',
      value:parseInt(Math.random()*100000000)
    },{
      title:'202.99.192.66',
      width:'100%',
      value:parseInt(Math.random()*100000000)
    }];
    export default {
      name:'black-top10',
      data() {
        return {
          activeType: 0,
          blocksTop10:[],
          setInterval:null
        };
      },
      methods: {
        swiperLoacalData() {
          let that = this;
          if (that.activeType == 0) {
            that.blocksTop10 = URLTop10;
          } else if (that.activeType == 1) {
            that.blocksTop10 = WebSiteTop10;
          } else if (that.activeType == 2) {
            that.blocksTop10 = DNSTop10;
          }
          that.blocksTop10.sort(function(a,b){
            return b.value-a.value
          })
        }
      },
      mounted(){
        let that=this;
        $('.tab-name').click(function(){
          $('.line').animate({left:($(this).index()*(80+20)+10)+'px'},450)
          that.activeType=$(this).index();
          that.swiperLoacalData()
        })
        that.blocksTop10=URLTop10;
        that.blocksTop10.sort(function(a,b){
          return b.value-a.value
        })
        var tabIndex=0;
        that.setInterval=setInterval(function(){
          tabIndex++
          if(tabIndex>2){
            tabIndex=0;
          }
          $('.tab-name:eq('+tabIndex+')').trigger('click')
        },5000)
      },
      updated(){
        let that=this;
        that.blocksTop10.forEach(function(item,id){
          item.width=(item.value/that.blocksTop10[0].value*80+20)+'%';
          $('.value-line:eq('+id+')').animate({width:item.width},600)
        })
      },
      beforeDestroy(){
        var that=this;
        window.clearInterval(that.setInterval);
      }
    }
</script>
<style>

  *{margin:0;padding:0;}
</style>
<style scoped="">
  .widget {
    position: relative;
    margin-bottom: 16px;
    width: 100%;
    height: 500px;
    z-index: 999;
    text-align: center;
    background-color: rgba(13, 27, 60, 0.8);
    /* IE9、标准浏览器、IE6和部分IE7内核的浏览器(如QQ浏览器)会读懂 */
  }

  .widget .title {
    padding: 15px 0 15px 0;
    text-align: initial;
    position: relative;
  }

  .widget .title:before {
    content: '';
    z-index: 2;
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
    margin-right: 40px;
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
    height: 446px;
  }
  .tab-name{
    display: inline-block;
    width: 80px;
    font-size: 18px;
    color: #98AACC;
    line-height: 18px;
    text-align: center;
    cursor: pointer;
    padding: 0 10px;
  }
  .line{
    position: absolute;
    bottom: -20px;
    left: 10px;
    width: 80px;
    border-top: 6px solid rgba(126,193,246,1);
    z-index: 3;
  }
  table,tr{
    width:100%;
  }
  .item{
    font-family: HelveticaNeue;
    height: 40px;
    width: 100%;
    font-size: 18px;
    color: #98AACC;
    line-height: 18px;
  }
  .deep-row{
    font-size: 18px;
    color: #FFFFFF;
    line-height: 18px;
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
    width: 30%;
  }
  .item-length{
    text-align: left;
    width: 36%;
  }
  .value-line{
    width: 0%;
    height: 8px;
    background: linear-gradient(to right,rgba(126,193,246,0.06),rgba(126,193,246,1));
  }
</style>
