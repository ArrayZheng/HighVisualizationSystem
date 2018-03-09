<template>
	<div class="content left">
		<pie-semi-ec></pie-semi-ec>
		<pie-ec></pie-ec>
		<bar4-hor-ec></bar4-hor-ec>
	</div>
</template>

<script>
	
	import PieSemiEc from './ec/PieSemiEc'
	
	import PieEc from './ec/PieEc'
	
	import Bar4HorEc from './ec/Bar4HorEc'
	export default{
		name:'left-col',
		components:{
			PieSemiEc,
			PieEc,
			Bar4HorEc
		}
	}
</script>

<style>	
	
</style>