<template>
	<div class="widget">
		<div class="title">
			<div class="imgbar"></div>
			<div class="imgenlarge"></div>
			<span class="title_name">{{$t('index.notification.name')}}</span>
		</div>
		<div class="chart">
			<div>
			
			</div>
		</div>
	</div>
</template>

<script>
import locales from "../../locales/general/"
	export default {
		locales,
		name:'left-mid',
		data(){
			return{
				data : '' 
			}
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
	@font-face {
		font-family:'HelveticaNeue-Bold';
		src: url('../../assets/font/HelveticaNeue-Bold.otf');
	}
	.widget{
		position: relative;
		margin-bottom: 45px;
		width:1320px;
		height: 1137px;     
		z-index: 999;
		text-align: center;
	  	background-color: rgba(13, 27, 60,0.8);/* IE9、标准浏览器、IE6和部分IE7内核的浏览器(如QQ浏览器)会读懂 */
	}
	.widget .title{
		padding: 44px 0 44px 0 ;
		height: 32px;     
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
		font-size: 32px;
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
		height: 1015px; 
	}
</style>