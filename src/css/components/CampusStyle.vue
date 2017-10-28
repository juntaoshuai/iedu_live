<template>
    <div class="campus-style tab-content">
        <ul>
            <li v-for="img in schoolInfo.imgs"><img :src="img.img"></li>
        </ul>
        <div class="recomm-video" v-if="recommVideoList.length">
            <div class="play-view" v-bind:style="styleObject" v-show="!isPlaying" v-on:click="clickPlay()">
                <img class="play-icon" src="../assets/play.png">
            </div>
            <video :poster="recommVideoList[0].bCoverPage" :src="recommVideoList[index].mp4Url" webkit-playsinline playsinline controls v-show="isPlaying" v-on:playing="playing" v-on:ended="changes()"></video>     
        </div>

    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    data () {
      return {
        index: 0,
        isPlaying: false
      }
    },
    computed: {
        styleObject(){
            if(this.recommVideoList.length){
                return{
                    background: 'url('+this.recommVideoList[0].bCoverPage+') center center no-repeat',
                    backgroundSize:'cover'  
                }   
            }
            return "";
            
        
        },
        ...mapGetters([
            'schoolInfo',
            'recommVideoList'
        ])
    },
    methods: {
        changes() {
            this.index++;
            if(this.index == this.recommVideoList.length)
            this.index = 0
        },
        clickPlay: function() {
            document.querySelector('.recomm-video video').play()
        },
        playing: function() {
            this.isPlaying = true
        }
    },
    mounted() {
    }
  }
</script>
<style>
  .campus-style li{
    margin: .32rem 0;
    text-align: center;
  }
  .campus-style li img{
    width:6.38rem;
    height:auto;
  }
  .recomm-video {background: #000;width:6.38rem;height: 4.05rem; margin:.3rem auto;position: relative;}
  .recomm-video video{width:100%; height: 100%;}
</style>