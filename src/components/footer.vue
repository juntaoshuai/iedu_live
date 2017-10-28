<template>
	<div>
		<footer class="footer" v-if="navActive == 0">
			<div class="footer_center">
				<span class="web-font icon-smile" @click="showLook"></span>
				<div class="chat-form" @click="showLogin()">
					<input v-model="val" type="text" id="text_val" required placeholder="请输入您想了解的问题">
					<button id="mes_btn" @click="send">发送</button>
				</div>
				<!--点赞-->
				<div class="likes" @click="doLikes">
       		 		<i class="iconfont icon-praise" 
       		 		:class="{active: praise.status}"></i>
        			<p class="likes-num">{{praise.num}}</p>
    			</div>
			</div>
			<!--未登录-->
			<!-- <div class="login_nocontent" v-show="isLogin==1" @click="show"></div> -->
		</footer>

		<!-- 表情 -->
		<div class="dia_content" v-show="lookview" @click="closelook"></div>
		<div class="look_content" v-show="lookview" id="look">
			<ul class="clearfix">
				<li v-for="(item, index) in arr" @click="addLook(index)">
					<img v-bind:src="'http://live.ofweek.com/static/web/wap/live/assets/'+item+'.gif'" alt="">
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import {getString,look,lookStr,noLogin,biaoQing} from '../js/common'

export default {
	data () {
		return {
			val: '',
			lookview: false,
			arr: lookStr,
			loginurl: 'http://expo.ofweek.com/mobile/login.xhtml?callback='+location.href,
			num: 0,
            active: false
		}
	},
    props:{
        isLogin: {
            type: Number
        },
        navActive: {
            type: Number
        },
        praise: {
            type: Object
        },
        chatArr: {
            type: Array
        },
        kfUserId: {
            type: Array
        },
        currUser: {
            type: Object
        }
    },
    computed:{
        ...mapGetters([
            'isPrivateChat',
            'watchMode'
        ])
    },
	methods:{
        showLogin(){
            if(this.isLogin == 2 && this.watchMode == 1){
                noLogin();
                return;
            }
            /*if(!document.querySelector("#list li.active")){
                alert("请点击选择老师交流")
            }*/
        },
		send: function() {
            if(this.isLogin == 2){
                noLogin();
                return;
            }

            var sendCon=this.val.replace(/(^\s+)|(\s+$)/g,"");
            if(sendCon == ''){
                alert("聊天内容不能为空");
                return
            }

            let url = ""
          if(!this.isPrivateChat){//公聊

            url = getString('0200', {content: sendCon})
            

          }else{//私聊
             url = getString('0210', {val: sendCon, userId: [this.currUser.userId]})
              // document.querySelector(".chat-con").scrollTop = "100000"  

          }

          io.send(url)
          this.val = ''
		},


		closelook:function(){
			this.lookview = false
		},
		showLook:function(){
			/*if(this.isLogin != 2){
				this.lookview = true
			}*/
            this.lookview = true
		},
		addLook:function(index){
			this.val += index;
			this.lookview = false
		},
        doLikes(){
            if(this.isLogin == 2){
                noLogin();
                return;
            }
        	if(!this.praise.status){
	           let url = getString('0350');
	           io.send(url);
	           this.praise.status = true;
        		
        	}
        }
	},
	mounted(){
		// alert(praise.status)
	}
}
</script>

<style>
  .likes{
       float: left;
       text-align: center;
       margin-left: .18rem;
        line-height: .45rem;
   }
   .likes i{
        display:block;
        font-size: .44rem;
        color:#f8bd4f;
   }
   .likes i.active{
        color:#666;
   }
   .likes i.active{
        color:#666;
   }
   .likes .likes-num{
       font-size: .24rem;
       line-height: .32rem;
       color:#a5a5a5;
   } 
</style>
