<template>
	<div class="widget">
		<div class="title">
			<div class="imgbar"></div>
			<div class="imgenlarge"></div>
			<span class="title_name">{{$t('index.impNotice.name')}}</span>
		</div>
		<div class="chart">
			<swiper :options="swiperOption">
				<swiper-slide>
					<div class="swipper-content">
						<td-item v-if="index<3" v-for="(item, index) in noticeData" :key="item.id" :data="item"></td-item>
					</div>
				</swiper-slide>
				<swiper-slide v-show="twoPage">
					<div class="swipper-content">
						<td-item v-if="index>=3&&index<6" v-for="(item, index) in noticeData" :key="item.id" :data="item"></td-item>
					</div>
				</swiper-slide>
				<swiper-slide v-show="thirdPage">
					<div class="swipper-content">
						<td-item v-if="index>=6&&index<9" v-for="(item, index) in noticeData" :key="item.id" :data="item"></td-item>
					</div>
				</swiper-slide>
				<div class="swiper-pagination" slot="pagination"></div>
			</swiper>
		</div>
	</div>
</template>

<script>
	import locales from "../../locales/general/"
	import config from './../../../static/config/config.js'
	import Vue from 'vue'
	import VueAwesomeSwiper from 'vue-awesome-swiper'
	Vue.use(VueAwesomeSwiper)
	var tdItem={
		name:'new',
		props: ['data'],
		template: '<div class="notice">' +
			'<div class="line time">' +
			'<span class="notice-time">{{ data.time}}</span>' +
			'</div>' +
			'<div class="line">' +
			'<span class="notice-info">({{data.type}}){{ data.content }}</span>' +
			'</div>' +
			'</div>'
	}
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	export default {
		locales,
		name: 'left-mid',
		data() {
			return {
				socket:io(config.serverAddress),
				swiperOption: {
					pagination: '.swiper-pagination',
					paginationClickable: true,
					autoplay: 20000,
				},
				twoPage: false,
				thirdPage: false,
				noticeData: [],
				noticeDataFromHttp: [{
					id: 0,
					time: '2017/08/22 13:01:16',
					content: '(alarm)JOHN SNOW knows nothing',
					type: 'alarm',
					show: 'true' === 'false' ? false : true
				}, {
					id: 1,
					time: '2017/08/21 16:03:36',
					content: "(alarm)Tyrion Lannister killed his father",
					type: 'alarm',
					show: 'true' === 'false' ? false : true
				}, {
					id: 2,
					time: '2017/08/17 13:01:16',
					content: "(event)NBA will get started on 11/10",
					type: 'event',
					show: 'true' === 'false' ? false : true
				}, {
					id: 3,
					time: '2017/07/28 13:01:16',
					content: '(alarm)Fixie tote bag ethnic keytar. Neutra vinyl American',
					type: 'alarm',
					show: 'true' === 'false' ? false : true
				}, {
					id: 4,
					time: '2017/07/11 13:01:16',
					content: "(dynamic)Keytar McSweeney's Williamsburg, readymade leggings try-hard 90's street art",
					type: 'dynamic',
					show: 'true' === 'false' ? false : true
				}, {
					id: 5,
					time: '2017/07/09 13:01:16',
					content: "(dynamic)This is a good news",
					type: 'dynamic',
					show: 'true' === 'false' ? false : true
				}, {
					id: 6,
					time: '2017/06/11 13:01:16',
					content: '(news)Presdent XIJINPING loves soccer',
					type: 'news',
					show: 'true' === 'false' ? false : true
				}, {
					id: 7,
					time: '2017/05/11 13:01:16',
					content: "(news)Kyrie Irving arrive CHINA",
					type: 'news',
					show: 'true' === 'false' ? false : true
				}, {
					id: 8,
					time: '2017/01/11 13:01:16',
					content: "(event)Melo To Houston",
					type: 'event',
					show: 'true' === 'false' ? false : true
				}],
				noticeInfo: 'This is a test news',
				setintervel: ''
			}
		},
		components: {
			swiper,
			swiperSlide,
			tdItem
		},
		methods: {
			setData: function() {
				let that = this;
				let dateTime = new Date();
				let hh = dateTime.getHours();
				let mm = dateTime.getMinutes();
				let ss = dateTime.getSeconds();
				let year = dateTime.getFullYear();
				let month = dateTime.getMonth() + 1;
				let day = dateTime.getDate();
				hh = this.extra(hh);
				mm = this.extra(mm);
				ss = this.extra(ss);
				month = this.extra(month)
				day = this.extra(day);
				let timeInfo = year + "/" + month + "/" + day + ' ' + hh + ":" + mm + ":" + ss;
				var type = that.randomType();
				var test = '(' + type + ')This is a test peace of news ' + timeInfo;

				if(that.noticeInfo.length > 50) {
					that.noticeInfo = that.noticeInfo.substr(0, 50)
				}
				let data = {
					id: that.noticeDataFromHttp.length,
					timeInfo: timeInfo,
					noticeInfo: test,
					type: type,
					show: 'true' === 'false' ? false : true
				}
				that.noticeDataFromHttp.unshift(data)
			},
			randomType() {
				var a = Math.random();
				if(0 <= a < 0.25) {
					return "alarm";
				} else if(0.25 <= a < 0.5) {
					return "dynamic"
				} else if(0.5 <= a < 0.75) {
					return "event"
				} else if(0.75 <= a < 1) {
					return "news"
				}
			},
			extra(x) {
				if(x < 10) {
					return "0" + x;
				} else {
					return x;
				}
			},
			compareDate(newsDate, days) {
				var now = new Date().getTime();
				var date = new Date(newsDate).getTime();
				var sub = now - date;
				if(days * 24 * 60 * 60 * 1000 > sub) {
					return true
				} else {
					return false;
				}
			},
			compareTwoDate(day1, day2) {
				var date1 = new Date(day1).getTime();
				var date2 = new Date(day2).getTime();
				var sub = date1 - date2;
				if(sub > 0) {
					return -1
				} else {
					return 1;
				}
			},
			socketIo() {
				let that = this;
				that.socket.on('general info client', function(msg) {
					if(msg.name == "news-refresh") {
						that.initHttpGetData();
					}
				});
			},
			setIntervalGetNewsHttpData(response) {
				var that=this;
				that.noticeData = [];
				that.noticeDataFromHttp = [];
				$.ajax({
					url: config.newsServer,
					type: 'post',
					data: {
						"days": response.body.news.statisticalTimeChosen.val * 1
					},
					typeData: 'json',
					success: function(data) {
						if(Object.prototype.toString.call(data)!='[object Array]'){
							return
						}
						that.noticeDataFromHttp = data.slice(0);
						response.body.news.typeShow.forEach(function(item, idx) {
							if(item.show == "false") {
								return;
							} else {
								that.noticeDataFromHttp.forEach(function(it, id) {
									if(it.type == item.type) {
										that.noticeData.push(it)
									}
								})
							}
						});
						that.noticeData.sort(function(a, b) {
							return that.compareTwoDate(a.time, b.time)
						})
						if(that.noticeData.length > 3) {
							that.twoPage = true;
							if(that.noticeData.length > 6) {
								that.thirdPage = true;
							} else {
								that.thirdPage = false;
							}
						} else {
							that.twoPage = false;
							that.thirdPage = false;
						}
					},
					error: function(err) {
						console.log(err)
					}
				})
			},
			initHttpGetData() {
				var that = this;
				this.$http.get(config.serverAddress + '/readGeneralConfiguration').then(function(response) {
					if(response.body) {
						that.setIntervalGetNewsHttpData(response)
						window.clearInterval(that.setintervel);
						that.setintervel = setInterval(function() {
							that.setIntervalGetNewsHttpData(response)
						}, response.body.news.loopTimeChosen.val * 1000)
					}
				}, function(err) {
					console.log(err)
				});
			},
		},
		mounted() {
			//this.setData();
			//this.noticeData=this.noticeDataFromHttp
			this.initHttpGetData();
			this.socketIo();
		},
		destroyed(){
			this.socket.close();
			window.clearInterval(this.setintervel);
		}
	}
</script>

<style scoped>
	@font-face {
		font-family: 'YaHei Consolas Hybrid';
		src: url('../../assets/font/Yahei Consolas Hybrid.ttf');
	}

	@font-face {
		font-family: 'HelveticaNeue-Bold';
		src: url('../../assets/font/HelveticaNeue-Bold.otf');
	}

	.widget {
		position: relative;
		margin-bottom: 45px;
		width: 1320px;
		height: 1137px;
		z-index: 999;
		text-align: center;
		background-color: rgba(13, 27, 60, 0.8);
		/* IE9、标准浏览器、IE6和部分IE7内核的浏览器(如QQ浏览器)会读懂 */
	}

	.widget .title {
		padding: 44px 0 44px 0;
		height: 32px;
		text-align: initial;
	}

	.widget .title:before {
		content: '';
		z-index: 998;
		position: absolute;
		width: 100%;
		height: 3px;
		top: 120px;
	}

	.widget .title:before {
		background: -webkit-linear-gradient(right, rgba(40, 73, 108, 1), rgba(68, 65, 136, 0));
		/* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(right, rgba(40, 73, 108, 1), rgba(68, 65, 136, 0));
		/* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(right, rgba(40, 73, 108, 1), rgba(68, 65, 136, 0));
		/* Firefox 3.6 - 15 */
		background: linear-gradient(to right, rgba(40, 73, 108, 1), rgba(68, 65, 136, 0.2));
		/* 标准的语法（必须放在最后） */
	}

	.widget .title .title_name {
		margin-left: 146px;
		font-size: 32px;
		color: #fff;
	}

	.widget .title .imgbar {
		display: inline-block;
		position: absolute;
		left: 50px;
		background: url(../../assets/images/window.png) no-repeat;
		background-size: 100%;
		width: 55px;
		height: 48px;
	}

	.widget .title .imgenlarge {
		display: inline-block;
		position: absolute;
		right: 40px;
		background: url(../../assets/images/enlarge.png) no-repeat;
		background-size: 100%;
		width: 42px;
		height: 42px;
	}

	.widget .chart {
		height: 1015px;
	}

	.swipper-content {
		padding: 46px 60px;
		height: 923px;
		overflow: auto;
	}
</style>

<style>
	.swipper-content .notice {
		min-height: 222px;
		background: rgba(47, 77, 116, 0.2);
		padding: 17px 30px;
		margin-bottom: 44px;
	}

	.swipper-content .notice .line {
		line-height: 74px;
		font-family: "HelveticaNeue-Medium";
		font-size: 46px;
		color: #fff;
		text-align: left;
	}

	.swipper-content .notice .time {
		color: #7EC1F6;
	}
</style>
