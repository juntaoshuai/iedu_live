<template>
    <div class="teacher">
        <div class="teacher-wrap">
            <div :chatUserId="chatUserId" v-bind:class="[{active: chatUserId == 'publicId'}, pChatClass]" @click="switchPublicChat()">
                <h3>
                    <img src="../assets/icon_chat.png">
                </h3>
                <p>群聊</p>
            </div>
            <ul class="teacher-list clearfix" id="list">
               <!--  <li :index="index" :data-userId="kf.userId" :class="{active:hasChatKfUserId==kf.userId}" v-for="(kf,index) in kefu" @click="switchPrivateChat(kf.userId,index)"> -->
                 <!-- <li :index="index" :data-userId="kf.userId" :class="{active:index==currIndex}" v-for="(kf,index) in kefu" @click="switchPrivateChat(kf.userId,index)"> -->
                 <li :chatUserId="chatUserId" :index="index" :data-userId="kf.userId" :class="{active: chatUserId == kf.userId}" v-for="(kf,index) in kefu" @click="switchPrivateChat(kf,index)">
                    <h3>
                        <img v-if="kf.logoUrl" :src="kf.logoUrl">
                        <img src="../assets/kf.png" v-if="!kf.logoUrl &&kf.userType == 4">
                        <img src="../assets/zb.png" v-if="!kf.logoUrl && kf.userType == 3">
                    </h3>
                    <p>{{kf.name}}</p>
                </li>
                
            </ul>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

import {getHistoryChat} from '../js/common'
    export default{
        data(){
            return{
                currIndex: -1,
                pChatClass: 'public-chat fl' //样式
            }
        },
        props:{
            isLogin: {
                type: Number
            },
            kefu: {
                type: Array
            },
            allChatArr: {
                type: Array
            },
            hasChatKfUserId: {
                type: String
            },
            currUserChat: {
                type: Object
            },
            user: {
                type: Object
            }
        },
        computed:{
            ...mapGetters([
                'isPrivateChat',
                'watchMode',
                'chatUserId'
            ])
        },
        methods:{
            switchPublicChat(){
                this.currIndex = -1

                this.$store.commit("isPrivateChat", false);
                this.$store.commit("chatUserId", "publicId");
            },

            switchPrivateChat(kf, index){
              
                this.currIndex = index

                this.$store.commit("isPrivateChat", true);
                this.$store.commit("chatUserId", kf.userId);

                let currChat = getHistoryChat(this.allChatArr, kf.userId);

                console.log("currChat======================")
                console.log(currChat)

                if(!currChat.length){

                    let msgObj={};  //定义一个消息对象，包含msgs和user两个属性
                    msgObj.msgs = [];
                    msgObj.user = {}
                    let cmsg = {};
                    
                    cmsg.chatTime = new Date().getTime();
                    cmsg.type = 2
                    if(this.isLogin == 2){
                        cmsg.content = "请问有什么可以帮到您？"
                    }else{
                        cmsg.content = this.user.name+"家长，请问有什么可以帮到您？"

                    }
                    msgObj.user.userId = kf.userId
                    msgObj.user.userType = kf.userType

                    msgObj.msgs.push(cmsg)

                    this.allChatArr.push(msgObj)

                    currChat = getHistoryChat(this.allChatArr, kf.userId);


                }

                this.$parent.chatArr = currChat;
                this.$parent.kfUserId = [kf.userId];
                this.$parent.currUser = kf;

            }
        },
        mounted(){
            // alert(this.autoKefu.name)
        }
    
    }
</script>
<style>
    .teacher{width:100%;height:1.3rem;overflow: hidden;border-bottom:1px solid #e9e9e9;position: absolute;left:0;top:6.21rem;z-index: 1;}
    .teacher-wrap{width:100%;height: 1.5rem;overflow-y:auto;-webkit-overflow-scrolling:touch;}
    .teacher-list{box-shadow:0 2px 2px 0 rgba(211,211,211,0.50);white-space:nowrap;font-size: 0;}
    .teacher-list li h3,.public-chat h3{height: .64rem; padding:.12rem 0 .08rem 0;box-sizing: content-box;}
    .teacher-list li,.public-chat{display: inline-block;min-width:2.38rem;height: 1.3rem;text-align: center;border-right: 1px solid #e9e9e9;vertical-align: top;}
    .teacher-list li:nth-child(3){background-image:linear-gradient(-90deg, rgba(255,255,255,0.00) 34%, #ffffff 66%);}
    .teacher-list li.active,.public-chat.active{background: #eee;}
    .teacher-list li img{width:.64rem;height: .64rem;border-radius: 50%;}
    .public-chat img{width:.6rem;height: .54rem;}
    .teacher-list li p,.public-chat p{font-size: .24rem; line-height:.34rem;color:#666;}

</style>