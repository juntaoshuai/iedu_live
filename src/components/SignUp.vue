<template>
    <!--报名-->
    <div class="sign-up-con">
        <a href="#" class="sign-up" v-if="signShow" :class="navActive == 0?'topfix':''" @click="signup">报名</a>
        <!--报名成功弹窗-->
        <div class="sign-up-ok" v-if="showPop">
            <p><span>{{time}}</span>秒后自动关闭</p>
        </div>
        <div class="over-lay" v-if="showPop" @click="overlayClick"></div>
    </div>
</template>
<script>
    import {getString,noLogin} from '../js/common'
    export default{
        props:{
            navActive:{
                type:Number
            },
            isLogin:{
                type:Number
            }
        },
        data(){
            return{
                showPop:false,
                signShow:true,
                time:3,
                timer:null
            }
        },

        methods:{
            signup(){
                if(this.isLogin==2){
                    noLogin();
                    return;
                }

                this.$http.get('http://m.live.ieduchina.com/api/exhibition/userSign?roomId='+userLogin.roomId+'&userId='+userLogin.userId)
                .then(function(response) {
                    if(response.data.code!=500){
                        let _this=this;
                        this.showPop=!this.showPop;
                        this.signShow=!this.signShow;

                        this.timer=setInterval(function(){
                            _this.time--;
                            if(_this.time==0){
                                _this.showPop=!_this.showPop;
                            
                                clearInterval(this.timer);
                            }

                        },1000)

                    }else{
                        this.signShow=!this.signShow;
                        alert(response.data.message)
                    }

                }, function(response) {
                    // 这里是处理错误的回调
                    console.log(response)
                });

            },
            overlayClick(){
                this.showPop=false;
                this.signShow=false;
                clearInterval(this.timer);

            }
        }

        
    }
</script>
<style>
.sign-up{
    position: absolute;
    background:rgba(248,190,79,.9);
    box-shadow:0 0 .12rem 0 rgba(0,0,0,0.12), 0 .06rem .12rem 0 rgba(0,0,0,0.24);
    width:.98rem;
    height:.98rem;
    line-height: .98rem;
    text-align: center;
    border-radius:100%;
    right: .2rem;
    bottom:.4rem;
    font-size: .32rem;
    font-weight: bold;
    color:#fff;
    z-index:3;
}
.topfix{
    top:7.6rem !important;
    bottom:auto !important;
}
.over-lay{
    width:100%;
    height: 100%;
    position: fixed;
    background:rgba(0,0,0,0.70);
    left:0;
    top:0;
    z-index: 4;
}
.sign-up-ok{
    background:url(http://live.ieduchina.com/static/web/wap/booth/img/bm_success.png) 0 0 no-repeat;
    position: fixed;
    width:5.22rem;
    height: 3.88rem;
    background-size: contain;
    left:50%;
    top:50%;
    transform: translate3d(-50%,-50%,0);
    -webkit-transform: translate3d(-50%,-50%,0);
    z-index: 5;

}
.sign-up-ok p{
    font-size:.28rem;
    line-height: .34rem;
    color:#4990e2;
    text-align: center;
    padding-top: 2.9rem;
}
</style>