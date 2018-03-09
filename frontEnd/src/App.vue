<template>
	<div id="app">
			<router-view class="routerContent"></router-view>
	</div>
</template>
<script>
	import 'vue-resource'
	export default {
		name: 'app',
		data() {
			return {
				selfAdaption: true,
        socket:io(this.$localServerUrl)
			}
		},
		methods: {
			init() {
				var that = this;
				this.$axios.baseConfig({}).then(function(response) {
					var result = response.data;
					if(result.self_adaption) { //自适应，以屏幕宽度为app的宽度，自动调整app 高度
						var windowHeight = $(window).height();
						var width = $(window).width();
						var height = width * (1080 / 3840);
						var marginTop = 0;
						var scale = "scale(" + (width / 3840) + ")";
						if(windowHeight > height) {
							marginTop = (windowHeight - height) / 2;
						}

						$("#app").css({
							"width": width,
							"height": height,
							"margin-top": marginTop
						});
						$("#app .all").css({
							"-webkit-transform": scale,
							" -webkit-transform-origin": "0 0",
							"-moz-transform": scale,
							" -moz-transform-origin": "0 0"
						});
						window.onresize = function() {
							var windowHeight = $(window).height();
							var width = $(window).width();
							var height = width * (1080 / 3840);
							var marginTop = 0;
							var scale = "scale(" + (width / 3840) + ")";
							if(windowHeight > height) {
								marginTop = (windowHeight - height) / 2;
							}
							$("#app").css({
								"width": width,
								"height": height,
								"margin-top": marginTop
							});
							$("#app .all").css({
								"-webkit-transform": scale,
								" -webkit-transform-origin": "0 0",
								"-moz-transform": scale,
								" -moz-transform-origin": "0 0"
							});
//							console.log(width + " " + height + " " + marginTop);
              console.log("koa:"+$(window).width())
						}
					} else { //app的宽度和高度指定为固定值
						var width = result.width;
						var height = result.height;
						$("#app").css({
							"width": width,
							"height": height
						});
					}
				}, function() {});

			},
		},
		mounted(){
			var that=this;
			that.socket.on('route change',function(msg){
				that.$goRoute(msg.urlStr);
			})
		},
		updated() {
			this.init();
		},
	}
</script>

<style>
	body {
		margin: 0px;
		-webkit-transform-origin-x: 0;
		-webkit-text-size-adjust: none;
		background-color: black;
	}
	#app {
		font-family: 'HelveticaNeue', 'HelveticaNeue-Medium', 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #fff;
		background-color: black;
		min-width: 1400px;
    overflow: hidden;
	}
	::-webkit-scrollbar {
		width: 8px;
		height: 8px;
		background-color: rgba(255, 255, 255, 0.2);
	}

	::-webkit-scrollbar-track {
		border-radius: 10px;
		background-color: rgba(255, 255, 255, .2);
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
	}

	::-webkit-scrollbar-track:hover {
		background-color: rgba(255, 255, 255, .3);
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .4);
	}

	::-webkit-scrollbar-track:active {
		background-color: rgba(255, 255, 255, .5);
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .1);
	}

	::-webkit-scrollbar-thumb {
		border-radius: 10px;
		background-color: rgba(255, 255, 255, .3);
		-webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, .1);
	}

	::-webkit-scrollbar-thumb:hover {
		background-color: rgba(0, 0, 0, .6);
		-webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, .1);
	}

	::-webkit-scrollbar-thumb:active {
		background: rgba(0, 0, 0, .8);
	}

	#app span {
		display: inline-block;
	}

	#app .all {
		-webkit-transform-origin: 0 0;
		-moz--transform-origin: 0 0;
	}
	/* scrollbar for chrome end */
	/*
	 * 分页轮播样式
	 */

</style>
