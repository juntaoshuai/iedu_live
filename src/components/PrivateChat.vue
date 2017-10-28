<template>
    <div class="chat-con" v-chat-scroll>
        <div class="chat-list clearfix">
            <!-- <p class="chat-time">2017-10-10 9:00</p> -->
            <div class="clearfix"  v-for="chat in chatArr">
                <!-- type: 1.当前用户发送消息 2.当前用户接收消息-->
                <div :class="chat.type== 1 ?'myself-say':'other-say'"  v-html="getChatContent(chat.content)"></div>    
            </div>
        </div>
    </div>
</template>

<script>
//https://github.com/PeachScript/vue-infinite-loading
//https://peachscript.github.io/vue-infinite-loading/#!/installation
import {biaoQing} from '../js/common'
export default{
        props:{
            chatArr:{
                type:Array
            }
        },
        data(){
            return{
                
            }
        },
        methods:{
            getChatContent(con){
               return biaoQing(con);
            }
        },
        mounted(){
            
        }
        
       
    }
    
</script>
<style>
    .chat-con{
        padding: 0 .3rem .3rem;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        height: 100%; 
    }
    .chat-time{
        font-size:.24rem;
        line-height: .4rem;
        color:#a5a5a5;
    }
    .chat-list img{
        width:.56rem;
        height:.56rem;
    }
    .other-say,.myself-say{
        /*width:5.24rem;*/
        min-height: .66rem;
        font-size: .28rem;
        line-height: .32rem;
        color:#333; 
        word-break: break-all;
        padding:.16rem .2rem .1rem .24rem;
        margin-bottom: .2rem;
        border-radius: .08rem;
        position: relative;
    }
    .other-say{
        background:#f6f6f6;
        float: left;
        
    }
    .other-say:before,.myself-say:after{
        content: "";
        position: absolute;
        width:0;
        height: 0;
        font-size: 0;
        border-width:.1rem;
        transform:translateY(-50%);
        -webkit-transform:translateY(-50%);
                
    }
    .other-say:before{
        border-style:dashed solid dashed dashed;
        border-color:transparent #f6f6f6 transparent transparent;
        left:-.18rem;
        top:50%;

    }
    .myself-say:after{
        border-style:dashed dashed dashed solid;
        border-color:transparent transparent transparent #27AEC2; 
        right:-.18rem;
        top:50%;
    }
    .myself-say{
        background: #27AEC2;
        color:#fff;
        float: right;
    }
</style>