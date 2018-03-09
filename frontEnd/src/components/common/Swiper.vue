<template>
	<div class="widget">
		<div class="title">
			<div class="imgbar"></div>
			<div class="imgenlarge"></div>
			<span class="title_name"> fuck</span>
		</div>
		<div class="chart">
			<swiper>
		        <swiper-slide>Slide 1</swiper-slide>
		        <swiper-slide>Slide 2</swiper-slide>
		        <swiper-slide>Slide 3</swiper-slide>
		        <swiper-slide>Slide 4</swiper-slide>
		        <swiper-slide>Slide 5</swiper-slide>
		        <swiper-slide>Slide 6</swiper-slide>
		        <swiper-slide>Slide 7</swiper-slide>
		        <swiper-slide>Slide 8</swiper-slide>
		        <swiper-slide>Slide 9</swiper-slide>
		        <swiper-slide>Slide 10</swiper-slide>
		      </swiper>
		</div>
	</div>
</template>

<script>
	// import 
	import Vue from 'vue'
	import VueAwesomeSwiper from 'vue-awesome-swiper'
	Vue.use(VueAwesomeSwiper)
	
	if (process.BROWSER_BUILD) {
	  const VueAwesomeSwiper = require('vue-awesome-swiper/ssr')
	  Vue.use(VueAwesomeSwiper)
	}
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	export default {
		name:'left-mid',
		data(){
			return{
				data : '' 
			}
		},
		components:{
			swiper,
    		swiperSlide
		}
		/*methods:{
			init : leftMid.init,
			setDom:leftMid.setDom,
			injectData:function(){
				let that=this;
				this.data=[{name:'Policía',value:Math.ceil(100*Math.random())},{name:'Bamberos',value:Math.ceil(100*Math.random())},{name:'Tráfico',value:Math.ceil(100*Math.random())},{name:'Médicos',value:Math.ceil(100*Math.random())}];
				this.init(this.data);
		        setTimeout(function(){
		        	that.injectData();
		        },5000)
			}
		},
		mounted(){
			this.setDom();
			this.injectData()
		}*/
	}
</script>

<style scoped>
	@font-face {
		font-family:'YaHei Consolas Hybrid';
		src: url('../../assets/font/Yahei Consolas Hybrid.ttf');
	}
	.widget{
		position: relative;
		margin-bottom: 45px;
		width:1320px;
		height: 743px;     
		z-index: 999;
		text-align: center;
	  	background-color: rgba(13, 27, 60,0.8);/* IE9、标准浏览器、IE6和部分IE7内核的浏览器(如QQ浏览器)会读懂 */
	}
	.widget .title{
		padding: 41px 0 41px 0 ;
		height: 38px;     
		text-align: initial;
	}
	.widget .title:before {     
	    content: '';     
	    z-index: 998;     
	    position: absolute;     
	    width: 100%; height: 3px;      
	    top: 120px;   
	 } 
	.widget .title:before {     
	    background: -webkit-linear-gradient(right, rgba(40, 73, 108,1), rgba(68, 65, 136,0)); /* Safari 5.1 - 6.0 */
	    background: -o-linear-gradient(right, rgba(40, 73, 108,1), rgba(68, 65, 136,0)); /* Opera 11.1 - 12.0 */
	    background: -moz-linear-gradient(right, rgba(40, 73, 108,1), rgba(68, 65, 136,0)); /* Firefox 3.6 - 15 */
	    background: linear-gradient(to right, rgba(40, 73, 108,1),rgba(68, 65, 136,0.2)); /* 标准的语法（必须放在最后） */    
	    } 
	.widget .title .title_name{
		margin-left: 146px;
		font-size: 38px;
		color:#fff;
	}
	.widget .title .imgbar{
		display: inline-block;
		position: absolute;
		left: 50px;
		background: url(../../assets/images/window.png) no-repeat;
		background-size: 100%;
		width: 55px;
		height: 48px;
	}
	.widget .title .imgenlarge{
		display: inline-block;
		position: absolute;
		right: 40px;
		background: url(../../assets/images/enlarge.png) no-repeat;
		background-size: 100%;
		width: 42px;
		height: 42px;
	}
	.widget .chart{
		padding: 10px ;
		height: 590px; 
	}
</style>