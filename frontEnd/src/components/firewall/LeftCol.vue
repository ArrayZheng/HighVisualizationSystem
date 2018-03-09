<template>
	<div class="content left-col">
    <double-semi-pie></double-semi-pie>
    <traffic-line></traffic-line>
    <event-bar></event-bar>
	</div>
</template>

<script>
  import doubleSemiPie from './leftcol/DoubleSemiPie.vue'
  import trafficLine from './leftcol/TrafficLine.vue'
  import eventBar from './leftcol/EventBar.vue'
	export default{
		name:'left-col',
		components:{
      doubleSemiPie,
      trafficLine,
      eventBar
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .left-col{
    position: absolute;
    top:0;
    left: 0;
    height: calc(100% - 44px);
    width: 810px;
    padding: 22px 0 22px 20px;
  }
</style>
