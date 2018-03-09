<template>
	<div class="content right">
		<bar-ver-ec></bar-ver-ec>
		<pie3-ec></pie3-ec>
		<video-anchor></video-anchor>
		<!--<widget>
			<span class="title_name" slot="title-name"> Seguimiento en tiempo real</span>
		</widget>-->
	</div>
</template>

<script>
	import BarVerEc from './ec/BarVerEc'
	import Pie3Ec from './ec/Pie3Ec'
	import VideoAnchor from './ec/VideoAnchor'
	export default{
		name:'col',
		components:{
			BarVerEc,
			Pie3Ec,
			VideoAnchor
		}
	}
</script>

<style>	
</style>