<template>
	<header class="header_load" v-show="show">
		<img class="fl" src="../assets/load_logo.png" alt="">
		<div class="fl">
			<h2>下载OFweek客户端</h2>
			<p>更好的直播体验</p>
		</div>
		<span class="fr" @click="close">&times;</span>
		<a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.mobile.ofweek" class="fr">下载APP</a>
	</header>
</template>

<script>
    export default {
        data () {
            return {
				show:true
            }
        },
        methods: {
			close:function(){
				this.show = false
			}
        }
    }
</script>

<style>
.header_load{height: .96rem;background: rgba(0,0,0,.8);padding:0 .25rem;position: absolute;z-index: 888888;left: 0;top: 0;width: 100%;color: #fff;}
.header_load img{width: .69rem;margin-top: .12rem;}
.header_load a{display: block;text-align: center;height: .5rem;line-height: .5rem;width: 1.3rem;background: #ce0808;color: #fff;font-size: .26rem;font-weight: bold;border-radius: .07rem;margin-top: .22rem;}
.header_load h2{font-size: .28rem;}
.header_load div.fl{margin-left: .12rem;margin-top: .16rem;}
.header_load p{font-size: .24rem;}	
.header_load span{font-size: .36rem;border:1px solid #fff;display: block;width: .56rem;height: .56rem;border-radius: 50%;line-height: .56rem;text-align: center;margin: .2rem 0 0 .1rem;}
</style>