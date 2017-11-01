<template>
	<div class="area_video" v-bind:style="{backgroundImage:'url('+room.backgroundUrl+')'}">
		<!-- 0：视频直播 1： ppt直播  3：视频点播 4：图集轮播 5：视频轮播 6：直播预告 7：即将开始 8：结束 9:回顾视频 10：加载-->
		
		<div class="play-view" v-if="model == 0 || model == 3 || model == 5 || model == 9" v-show="!isPlaying" v-on:click="clickPlay()" v-bind:style="{backgroundImage:'url('+room.backgroundUrl+')'}">
			<img class="play-icon" src="../assets/play.png">
		</div>

		<div v-if="!room.isEnd">
			<!-- 视频直播 -->
			<div class="video_container"  v-if="model==0 && islive">
				<video id="videolive" v-bind:src="hlsDownstream" v-show="isPlaying" v-on:playing="playing" webkit-playsinline playsinline autoplay controls></video>
			</div>

			<!-- ppt直播 -->
			<div class="swiper-containerPic"  v-if="model==1 && islive">
				<!--<p>如果您听不到直播声音，建议用电脑观看PPT直播</p>-->
				<audio v-if="hlsVoiceDownstream" id="voice" v-bind:src="hlsVoiceDownstream" controls autoplay></audio>

				<audio v-else v-bind:src="hlsDownstream" controls autoplay></audio>
				<img v-bind:src="pptImg" alt=""/>
			</div>
			
			<!-- 视频点播 -->
		    <div class="vodlook" v-if="model == 3 && islive">
		        <video v-bind:src="vodliving" v-show="isPlaying" v-on:playing="playing" webkit-playsinline playsinline autoplay controls></video>
		    </div>

		   <!-- 图集轮播-->
			<div class="swiper-containerPic" v-if="prePlayMode == 1 && !islive">
			    <swiper :options="swiperOption" ref="mySwiper">
					<swiper-slide  v-for="pic in picArr">
				    	<img :src="pic.url">
					</swiper-slide>							
					<div class="swiper-pagination" slot="pagination"></div>
			   	</swiper>
			</div>
		
			<!--视频轮播-->
			<div class="video_content" v-if="prePlayMode == 0 && !islive">
				<video  x5-video-player-type='h5' x5-video-player-fullscreen='false' v-if="vodList.length" id="lb"  v-bind:src="vodList[index].mp4Url" v-show="isPlaying" v-on:playing="playing" webkit-playsinline playsinline autoplay controls v-on:ended="lbVieoChange()"></video>			
			</div>

			<!-- 直播预告 -->
	        <div class="notice" v-if="model == 6 && room.status == 0 && showNotice">
	            <div class="m-time fl">
					<h4>距直播开始还有</h4>
					<span>{{d}}天</span>
					<span>{{h}}小时</span>
					<span>{{m}}分</span>
					<span>{{s}}秒</span>
				</div>
				<span class="close" @click="closeNotice">×</span>

	            <a v-if="registered" class="start-notice bgGray" href="javascript:;">已预约</a>
	            <span v-else class="start-notice no_btn" @click="book">预约直播</span>
	        </div>

	        <!-- 时间到了主播仍未开启直播 -->
	        <div class="notice" v-if="model == 7 && room.status == 0 && showNotice">
		        <div class="wait">
		            直播即将开始
		        </div>
				<span class="close" @click="closeNotice">×</span>
	    	</div>
    	</div>
		<div v-else>
	        <!-- 直播结束 -->
	        <div class="live-end" v-if="model == 8">
	            <p>直播已结束，敬请期待直播回顾！</p>
	        </div>
				
			<!--回顾视频-->
			<div class="video_content" v-if="model == 9">
				<video id="backvideo" :poster="reviewArr[rindex].bCoverPage"  v-bind:src="reviewArr[rindex].bPlayUrl" v-show="isPlaying" v-on:playing="playing" webkit-playsinline playsinline autoplay controls v-on:ended="backVideoChange()"></video>
			</div>
		</div>
		

	</div>
</template>

<script>
import {getString} from '../js/common'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
	data (){
		return {
			index: 0,
			rindex: 0,
			isPlaying: false,
			d: 0,
			h: 0,
			m: 0,
			s: 0,
			showNotice: true,
			swiperOption: {
	          	autoplay: 4000,
	          	initialSlide: 1,
	          	loop: true,
	          	pagination: '.swiper-pagination',
		        onSlideChangeEnd: swiper => {
		            console.log('onSlideChangeEnd', swiper.realIndex)
		        }
        	}
		}
	},
	computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
	components: {
	    swiper,
	    swiperSlide
  	},
	props: {
		vodList: {
			type: Array
		},
		model: {
			type: Number
		},
		picArr: {
			type: Array
		},
		reviewArr: {
			type: Array
		},
		hlsDownstream: {
			type: String
		},
		hlsVoiceDownstream: {
			type: String
		},
		pptImg: {
			type: String
		},
		vodliving: {
			type: String
		},
		room: {
			type: Object 
		},
		registered: {
			type: Boolean
		},
		islive: {
			type: Boolean
		},
		prePlayMode: {
			type: Number
		}

	},
	watch: {
		room: function(oldVal,newVal) {
			
			if(this.room.status == 0 ){	//房间状态为待举办
				var timeOver = setInterval(() => {
					var now = new Date().getTime();

                    var startDate = this.room.startTime  //1506680760000  1498870800000

					var tol = (startDate - now)/1000;
					tol = parseInt(tol);
					if(tol <= 0){
						this.$parent.model = 7
						clearInterval(timeOver)
						return
					}
					this.d=Math.floor(tol/(60*60*24)); 
					this.h=Math.floor((tol-this.d*24*60*60)/3600); 
					this.m=Math.floor((tol-this.d*24*60*60-this.h*3600)/60);
					this.s=Math.floor(tol-this.d*24*60*60-this.h*3600-this.m*60); 
					
					
					if(this.m < 1){

						this.$parent.model = 7
						clearInterval(timeOver)
						return
					}
				},1000)
			}
		}
	},
	methods: {
		lbVieoChange() {
			this.index++;
        	this.index = this.index == this.vodList.length ? 0 : this.index
        	document.querySelectorAll('.area_video video')[0].play()
		}, 
		backVideoChange() {
			this.rindex++;
        	this.rindex = this.rindex == this.reviewArr.length ? 0 : this.rindex
        	document.querySelectorAll('.area_video video')[0].play()
		},
		book: function() {
            if(userLogin.loginType == 2){
				this.$parent.loginShow = true
                return
            }
            let url = getString('0105')
            io.send(url)
        },
        clickPlay: function() {
			document.querySelectorAll('.area_video video')[0].play()
		},
		playing: function() {
			this.isPlaying = true
		},
		closeNotice() {
			this.showNotice = !this.showNotice
		}
	},
	mounted: function() {

	}
}
</script>

<style>
audio{position: absolute;z-index: 5;left: 0;bottom: 0;width: 100%;background: #000;}
.video_content,.video_container{background: #000;}
video{width: 100%;height: 4.05rem;}
.swiper-containerPic{position: relative}
.swiper-containerPic p{position: absolute;top: 0;left: 0;width: 100%;height: .6rem;line-height: .6rem;background: rgba(0,0,0,.3);padding-left: .3rem;color: #FFFF00;text-align: left}
.notice{width: 100%; position: absolute;left:0;bottom: 0;height:.88rem;line-height: .88rem;background: rgba(0,0,0,0.60); font-size: .26rem;color: #fff;padding:0 .24rem;letter-spacing: .02rem;z-index: 2;}
.m-time{letter-spacing: .04rem;}
.m-time h4,.m-time span{float: left;}
.start-notice{width: 1.4rem;height: .56rem;line-height: .6rem;text-align: center;font-size: .26rem;color: #fff;background: #E65E50;border-radius: .04rem;letter-spacing: .01rem; position: absolute;right:.6rem;top:.16rem;}
.start-notice.bgGray{background: #eef4f6;color:#666;}
.notice .close{position: absolute;width:.4rem; font-size: .4rem;line-height: .4rem; text-align: center;color:#fff;right:0;top:0;z-index:3;}
.play-view{ position: relative; width: 100%; height: 100%; }
.play-icon{ position: absolute; left: 50%; top: 50%; width: 50px; height: 50px; margin: -25px 0 0 -25px;}

.live-end{font-size: .32rem;color:#fff;line-height: 4.05rem;text-align: center;}

</style>
