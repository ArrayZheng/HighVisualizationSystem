<template>
	<div class="content right-col">
    <total-count></total-count>
    <block-top10></block-top10>
    <hot-tags-top5></hot-tags-top5>
	</div>
</template>

<script>
  import totalCount from './rightcol/TotalCount.vue'
  import blockTop10 from './rightcol/BlockTop10.vue'
  import hotTagsTop5 from './rightcol/HotTagsTop5.vue'
	export default{
		name:'right-col',
		components:{
      totalCount,
      blockTop10,
      hotTagsTop5
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .right-col{
    position: absolute;
    top:0;
    right: 0;
    height: calc(100% - 44px);
    width: 810px;
    padding: 22px 22px 22px 0;
  }
</style>
