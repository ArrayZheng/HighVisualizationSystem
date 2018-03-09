<template>
  <div class="all-map" id="countryMap">

  </div>
</template>

<script>
    import infoMap from './countryMap.js'
    export default {
      name:'countryMap',
      methods:{
        init: infoMap.init,
        setDom: infoMap.setDom,
        dispose: infoMap.dispose,
        getHttpData(){
          this.init([],117);
        }
      },
      mounted() {
        this.setDom('countryMap');
        this.getHttpData();
      },
      destroyed(){
        this.dispose();
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .all-map{
    height: 100%;
    width: 100%;
  }
</style>
