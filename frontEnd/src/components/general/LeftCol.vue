<template>
	<div class="content left-col">
    <notice></notice>
    <news></news>
	</div>
</template>

<script>
  import notice from './leftcol/Notice.vue'
  import news from './leftcol/News.vue'
	export default{
		name:'left-col',
		components:{
		  notice:notice,
      news:news
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
