<template>
  <div class="intelligenceContainer all">
    <div class="map" id="countryMap">
      <!--<component is="infoMap" ref="child"></component>-->
    </div>
    <div class="left">
      <component is="emotionPart" ref="child"></component>
      <component is="sourcePart" ref="child"></component>
      <component is="wordPart" ref="child"></component>
    </div>
    <div class="center">
      <component is="centerPart" ref="child"></component>
    </div>
    <div class="right">
      <component is="leaderPart" ref="child"></component>
      <component is="hotPart" ref="child"></component>
    </div>
  </div>
</template>

<script>
  import locales from "./../../locales/event/index"
  import centerPart from "./Center.vue"
  import emotionPart from "./Emotion.vue"
  import sourcePart from "./Source.vue"
  import wordPart from "./Words.vue"
  import leaderPart from "./Leader.vue"
  import hotPart from "./Hot.vue"
  import infoMap from './countryMap.js'
  import socketIO from '../../socketIO'
    export default {
      locales,
      name: 'controller-app',
      data() {
        return {
          activeWidgetName:this.$t('event.consultation.consultationTitle'),
          activeWidget: 'Consultation',
          fullscreenLoading:false,
          selecedID:"#consultation",
          socket:io(this.$localServerUrl),
          chartobj:{},
        }
      },
      components: {
        centerPart,
        emotionPart,
        sourcePart,
        wordPart,
        leaderPart,
        hotPart,
      },
      methods: {
        init: infoMap.init,
        setDom: infoMap.setDom,
        setData: infoMap.setData,
        dispose: infoMap.dispose,
        setZoom: infoMap.setZoom,
        getHttpData(){
          this.init([],117);
        },
        getArrayItems(arr, num) {
          //新建一个数组,将传入的数组复制过来,用于运算,而不要直接操作传入的数组;
          var temp_array = new Array();
          for (var index in arr) {
            temp_array.push(arr[index]);
          }
          //取出的数值项,保存在此数组
          var return_array = new Array();
          for (var i = 0; i<num; i++) {
            //判断如果数组还有可以取出的元素,以防下标越界
            if (temp_array.length>0) {
              //在数组中产生一个随机索引
              var arrIndex = Math.floor(Math.random()*temp_array.length);
              //将此随机索引的对应的数组元素值复制出来
              return_array[i] = temp_array[arrIndex];
              //然后删掉此索引的数组元素,这时候temp_array变为新的数组
              temp_array.splice(arrIndex, 1);
            } else {
              //数组中数据项取完后,退出循环,比如数组本来只有10项,但要求取出20项.
              break;
            }
          }
          return return_array;
        }
      },
      mounted() {
        var that=this;
        that.setDom('countryMap');
        that.getHttpData();
        var pointData=[{name:"1",value:[61.3987500000,48.4212920000,120]},
          {name:"2",value:[52.2916950000,50.8926380000,120]},
          {name:"3",value:[63.3987500000,48.4212920000,120]},
          {name:"4",value:[49.8264570000,48.6043610000,120]},
          {name:"5",value:[51.4086250000,50.2523810000,120]},
          {name:"6",value:[52.3284900000,49.0175010000,120]},
          {name:"7",value:[47.6555760000,49.6427480000,120]},
          {name:"8",value:[68.3987500000,43.9212920000,120]},
          {name:"9",value:[69.3987500000,44.4212920000,120]},
          {name:"10",value:[49.0566450000,47.6190260000,120]},
          {name:"11",value:[51.9999900000,47.9983550000,120]},
          {name:"12",value:[54.1886280000,46.8010220000,120]},
          {name:"13",value:[55.4764390000,45.5097670000,120]},
          {name:"14",value:[52.0545420000,44.7282340000,120]},
          {name:"15",value:[54.9245200000,43.1058800000,120]},
          {name:"16",value:[54.1150390000,44.1482590000,120]},
          {name:"17",value:[58.6039800000,48.6503830000,120]},
          {name:"18",value:[57.8312930000,46.8136550000,120]},
          {name:"19",value:[55.7707960000,49.5922280000,120]},
          {name:"20",value:[58.1992390000,50.3751550000,120]},
          {name:"21",value:[61.6947260000,49.9734290000,120]},
          {name:"22",value:[63.8288120000,44.0682210000,120]},
          {name:"23",value:[66.4412280000,44.2541400000,120]},
          {name:"24",value:[60.517299000,45.6131570000,120]},
          {name:"25",value:[62.5777960000,46.3824810000,120]},
          {name:"26",value:[68.3545470000,41.7153290000,120]},
          {name:"27",value:[70.5990170000,45.2244560000,120]},
          {name:"28",value:[73.5425850000,43.9359220000,120]},
          {name:"29",value:[70.7829900000,43.2405350000,120]},
          {name:"30",value:[78.1419090000,44.0592380000,120]},
          {name:"31",value:[75.4559040000,45.6647800000,120]},
          {name:"32",value:[81.1590660000,45.8707950000,120]},
          {name:"33",value:[79.9816390000,43.1867090000,120]},
          {name:"34",value:[77.0012770000,44.1217590000,120]},
          {name:"35",value:[77.2588390000,45.3802600000,120]},
          {name:"36",value:[78.6570330000,46.0760430000,120]},
          {name:"37",value:[82.1157250000,46.6871970000,120]},
          {name:"38",value:[82.0053410000,50.2573530000,120]},
          {name:"39",value:[78.9513900000,49.2561990000,120]},
          {name:"40",value:[78.693828000,48.3569600000,120]},
          {name:"41",value:[85.4640330000,48.8207580000,120]},
          {name:"42",value:[84.6545520000,47.6656530000,120]},
          {name:"43",value:[81.8949570000,47.7401680000,120]},
          {name:"44",value:[82.6308490000,49.0873160000,120]},
          {name:"45",value:[76.3389740000,49.6400430000,120]},
          {name:"46",value:[76.2285900000,48.2587730000,120]},
          {name:"47",value:[72.7331040000,47.0656740000,120]},
          {name:"48",value:[70.7461960000,46.3315270000,120]},
          {name:"49",value:[74.0577090000,47.8641210000,120]},
          {name:"50",value:[64.9694440000,47.1912360000,120]},
          {name:"51",value:[66.8827630000,46.6111790000,120]},
          {name:"52",value:[68.4649310000,49.4964560000,120]},
          {name:"53",value:[70.8933740000,49.4004950000,120]},
          {name:"54",value:[69.6055630000,48.0478110000,120]},
          {name:"55",value:[72.5859250000,48.2096080000,120]},
          {name:"56",value:[68.0969850000,47.4664230000,120]},
          {name:"57",value:[70.0838930000,47.3665220000,120]},
          {name:"58",value:[73.9841200000,49.2080060000,120]},
          {name:"59",value:[72.9906660000,50.4456960000,120]},
          {name:"60",value:[78.3994710000,50.3751550000,120]},
          {name:"61",value:[75.6030820000,50.5161310000,120]},
          {name:"62",value:[76.8908930000,51.4911650000,120]},
          {name:"63",value:[74.5143680000,52.4231890000,120]},
          {name:"64",value:[76.3389740000,53.4458010000,120]},
          {name:"65",value:[72.7331040000,51.8799790000,120]},
          {name:"66",value:[70.7094010000,52.7369910000,120]},
          {name:"67",value:[66.6619960000,51.4222030000,120]},
          {name:"68",value:[70.4886330000,50.7268030000,120]},
          {name:"69",value:[67.2507090000,52.8707880000,120]},
          {name:"70",value:[67.1771200000,54.3583910000,120]},
          {name:"71",value:[70.4886330000,54.8496870000,120]},
          {name:"72",value:[73.1378440000,53.2476340000,120]},
          {name:"73",value:[65.4477740000,54.0130990000,120]},
          {name:"74",value:[62.2834390000,53.5773990000,120]},
          {name:"75",value:[63.8656070000,52.9375310000,120]},
          {name:"76",value:[61.5107530000,51.9255010000,120]},
          {name:"77",value:[64.5958550000,50.7221530000,120]},
          {name:"78",value:[63.3504820000,49.3524440000,120]},
          {name:"79",value:[67.213915000,49.9021840000,120]},
          {name:"80",value:[64.0863740000,48.7964540000,120]},
          {name:"81",value:[64.7486770000,49.8070250000,120]},
          {name:"82",value:[69.3987500000,49.4212920000,120]},
          {name:"83",value:[53.1215850000,42.7272530000,120]},
          {name:"84",value:[53.8206820000,45.1724260000,120]},
          {name:"85",value:[47.7863690000,48.4794270000,120]},
          {name:"86",value:[55.7340010000,47.1410470000,120]},
          {name:"87",value:[56.7642500000,47.9630690000,120]},
          {name:"88",value:[56.0651530000,49.0147610000,120]},
          {name:"89",value:[59.9653800000,49.4484990000,120]},
          {name:"90",value:[60.7748610000,46.5858160000,120]},
          {name:"91",value:[61.0324230000,44.8330610000,120]},
          {name:"92",value:[64.5279090000,46.0504290000,120]},
          {name:"93",value:[66.6987900000,45.3283730000,120]},
          {name:"94",value:[65.8525150000,44.8068720000,120]},
          {name:"95",value:[66.8459690000,42.1001410000,120]},
          {name:"96",value:[69.8999200000,42.3735750000,120]},
          {name:"97",value:[68.7960820000,42.6729730000,120]},
          {name:"98",value:[67.8762170000,45.3543220000,120]},
          {name:"99",value:[68.7224930000,44.9115550000,120]},
          {name:"100",value:[71.9604170000,45.3543220000,120]},
          {name:"101",value:[73.4322010000,45.0421400000,120]},
          {name:"102",value:[71.9972120000,44.9115550000,120]},
          {name:"103",value:[70.3046600000,44.0952470000,120]},
          {name:"104",value:[73.1010500000,42.7543760000,120]},
          {name:"105",value:[71.7396500000,43.5089490000,120]},
          {name:"106",value:[75.3455200000,44.4389710000,120]},
          {name:"107",value:[77.4796060000,46.3315270000,120]},
          {name:"108",value:[77.1852490000,43.2405350000,120]},
          {name:"109",value:[80.0024060000,44.3862220000,120]},
          {name:"110",value:[79.9980490000,45.2504530000,120]},
          {name:"111",value:[80.4231740000,47.2163120000,120]},
          {name:"112",value:[80.4967630000,49.9021840000,120]},
          {name:"113",value:[83.5507140000,49.8784120000,120]},
          {name:"114",value:[74.6096280000,51.1915700000,120]},
          {name:"115",value:[77.9211410000,52.5130770000,120]},
          {name:"116",value:[74.7936010000,53.1813720000,120]},
          {name:"117",value:[67.8394230000,53.8611210000,120]},
          {name:"118",value:[68.5753150000,54.8072020000,120]},
          {name:"119",value:[67.9498060000,51.4222030000,120]},
          {name:"120",value:[72.1443900000,51.7659700000,120]},
          {name:"121",value:[63.5712500000,52.4231890000,120]},
          {name:"122",value:[63.9391960000,53.8828660000,120]}
        ];
        that.chartobj=setInterval(function () {
            var num=that.getArrayItems([30,50,70,80,90,100],1)
          that.setData(that.getArrayItems(pointData,num));
        },6000);

        that.socket.on("map information client",function (msg) {
            if(msg.zoom){
              that.setZoom(msg.zoom);
            }
        });

      },
      updated() {},
      destroyed(){
        var that=this;
        that.dispose();
        window.clearInterval(that.chartobj);
      },
    }
</script>

<style scoped>
.intelligenceContainer{
  position: relative;
  width: 3840px;
  height: 1080px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  /*position: relative;*/
}
.intelligenceContainer .map{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgb(16,19,43);
}
.left,.center,.right{
  height: 100%;
}
.center{
  height: 200px;
}
  .left,.right{
    width: 790px;
  }
.left{
  margin-left: 20px;
}
.right{
  margin-right: 20px;
}
  .center{
    width: calc(100% - 1660px);
    /*border: 1px solid blue;*/
  }
</style>
