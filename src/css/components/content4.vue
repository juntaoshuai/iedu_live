<template>
	<section class="content4"  v-show="navActive == 3">
		<div class="message_icon clearfix">
			<img class="fl" v-bind:src="company.logoUrl">
			<h3 class="fl">{{company.company}}</h3>
		</div>
		<h2>主营：</h2>
		<p>{{company.product}}</p>
		<h2>公司介绍：</h2>
		<p>{{company.profile}}</p>

		<div v-show="company.hide==0">
			<h2 class="contain_tlt">联系方式：</h2>
			<div class="clearfix contain_style">
				<aside class="fl">
					<p></p>
					<p>电话：{{company.telephone}}</p>
					<p>邮箱：{{company.email}}</p>
					<p>地址：{{company.address}}</p>
				</aside>
				<img class="fr" v-bind:src="company.codeurl">				
			</div>
		</div>
	</section>
</template>

<script>
export default {
  	props:{
  		company:{
  			type:Object
  		},
		navActive:{
			type:Number
		}
  	}
}
</script>

<style scoped>

</style>
