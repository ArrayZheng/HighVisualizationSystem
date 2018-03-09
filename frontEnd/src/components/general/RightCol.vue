<template>
	<div class="content right-col">
    <firewall-overview></firewall-overview>
    <insight-cyber-overview></insight-cyber-overview>
	</div>
</template>

<script>
  import firewallOverview from './rightcol/FirewallOverview.vue'
  import insightCyberOverview from './rightcol/InSightCyberOverview.vue'
	export default{
		name:'right-col',
		components:{
      firewallOverview:firewallOverview,
      insightCyberOverview:insightCyberOverview
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
