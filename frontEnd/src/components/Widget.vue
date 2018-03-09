<template>
	<div class="widget">
		<div class="title">
			<div class="imgbar"></div>
			<div class="imgenlarge"></div>
			<slot name="title-name"></slot>
		</div>
		<slot name="chart"></slot>
		<slot name="self-lengend"></slot>
	</div>
</template>

<script>
</script>

<style>
	.content .widget{
		position: relative;
		margin-bottom: 30px;
		width:100%;
		height: 495px;
		z-index: 999;
		text-align: center;
	  	background-color: rgba(13, 27, 60,0.8);/* IE9、标准浏览器、IE6和部分IE7内核的浏览器(如QQ浏览器)会读懂 */
	}
	.content .widget .title{
		padding: 25px 0 29px 0 ;
		height: 24px;
		text-align: initial;
	}
	.content .widget .title:before {
	    content: '';
	    z-index: 998;
	    position: absolute;
	    width: 100%; height: 2px;
	    top: 78px;
	 }
	.content .widget .title:before {
	    background: -webkit-linear-gradient(right, rgba(40, 73, 108,1), rgba(68, 65, 136,0)); /* Safari 5.1 - 6.0 */
	    background: -o-linear-gradient(right, rgba(40, 73, 108,1), rgba(68, 65, 136,0)); /* Opera 11.1 - 12.0 */
	    background: -moz-linear-gradient(right, rgba(40, 73, 108,1), rgba(68, 65, 136,0)); /* Firefox 3.6 - 15 */
	    background: linear-gradient(to right, rgba(40, 73, 108,1),rgba(68, 65, 136,0.2)); /* 标准的语法（必须放在最后） */
	    }
	.content .widget .title .title_name{
		margin-left: 96px;
		font-size: 2.6em;
		color:#fff;
	}
	.content .widget .title .imgbar{
		display: inline-block;
		position: absolute;
		left: 40px;
		background: url(../assets/images/window.png) no-repeat;
		background-size: 100%;
		width: 35px;
		height: 30px;
	}
	.content .widget .title .imgenlarge{
		display: inline-block;
		position: absolute;
		right: 26px;
		background: url(../../static/images/enlarge.png) no-repeat;
		background-size: 100%;
		width: 28px;
		height: 28px;
	}
	.content .widget .chart{
		padding: 10px ;
		height: 393px;
	}
	.content .widget .self-lengend{
		position: absolute;
		bottom: 40px;
		height: 50px;
		width: calc(100% - 100px);
		padding: 0 50px;
	}
	.content .widget .self-lengend .legend{
		position: relative;
		display: inline-block;
		height: calc(100% - 5px);
		width: 220px;
		margin-right: 44px;
		color: #fff;
		font-size: 26px;
	}
	.content .widget .self-lengend .border-green{
		border-bottom: 5px #00beaa solid;
	}
	.content .widget .self-lengend .border-red{
		border-bottom: 5px #ff888d solid;
	}
	.content .widget .self-lengend .border-yellow{
		margin-right: 0;
		border-bottom: 5px #ffd885 solid;
	}
	.content .widget .self-lengend .legend-text{
		position: absolute;
		bottom: 5px;
		left:0px;
	}
	.content .widget .self-lengend .legend-value{
		position: absolute;
		bottom: 5px;
		right:0px;
	}
</style>
