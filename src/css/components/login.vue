<template>
	<div>
		<!--未登录弹窗-->
		<div class="pop" id="pop" @click="hide"></div>
		<div class="login_warm diaglog" id="diaglog">
			<span class="closeBtn" v-show="closeShow" @click="hide" id="close"></span>
			<div class="login_icon"></div>
			<p>请先登录!</p>
			<a v-bind:href="loginurl">马上登录</a>
			<a class="resgLink" href="http://m.ofweek.com/users/register.xhtml">立即注册</a>
		</div>
	</div>
</template>

<script>
	import {getString,closeLogin,noLogin} from '../js/common'
	export default {
		data (){
			return {
				loginurl:'http://live.ieduchina.com/audience-login-page?callback='+location.href,
				closeShow:true
			}
		},
		methods:{
			hide:function(){
				if(this.closeShow){
					let pop = document.getElementById("pop")
					let diaglog = document.getElementById("diaglog")
					pop.style.display = "none"
					diaglog.style.display = "none"
				}
			}
		},
		mounted:function(){
			var $this = this
//			if(userLogin.loginType == 2){
//				setTimeout(function(){noLogin();$this.closeShow = false},10000)
//			}
		}
	}
</script>

<style>
	#diaglog,#pop{display: none}
</style>