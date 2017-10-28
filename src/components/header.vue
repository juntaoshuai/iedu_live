<template>
	<header class="header">
		<a class="fl web-font icon-fanhui" href="http://m.live.ieduchina.com/"></a>
		<h3 class="fl" v-html="room.name"></h3>
		<!-- <a href="#" class="fr web-font icon-share"></a> -->
		<!-- <a v-bind:href="loginurl" class="fr web-font icon-user" v-show="isLogin==2"></a> -->
		<!-- <a href="javascript:;" class="user_icon fr"><img src="images/user_icon.jpg" alt=""></a> -->
	</header>
</template>

<script>
export default {
	data () {
		return {
			loginurl:'http://expo.ofweek.com/mobile/login.xhtml?callback='+location.href,
		}
	},
	props:{
		room:{
			type:Object
		},
		isLogin:{
			type:Number
		}
	},
	mounted(){
		
	}
}
</script>

<style scoped>

</style>
