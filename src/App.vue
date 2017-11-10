<template>
    <div id="app">
        <!-- 头部 -->
        <my-header :room="room" :isLogin="isLogin"></my-header>
        <!-- 视频区域 -->
            <my-video :vodList="vodList" :model="model" :picArr="picArr" :pptImg="pptImg" :hlsDownstream="hlsDownstream" :vodliving="vodliving" :islive="islive" :reviewArr="reviewArr" :room="room" :registered="registered" :prePlayMode="prePlayMode" :hlsVoiceDownstream = "hlsVoiceDownstream"></my-video>
            <!--系统消息-->
            <sys-message :nav-active="navActive" :sysMessage="sysMessage"></sys-message>
            <!-- 导航条 -->
            <my-nav :navItems="navItems" :nav-active="navActive" :class="navActive==0 ? 'navfirtst':''"></my-nav>

            <chat-nav v-if="navActive==0" :kefu="kefu" :allChatArr="allChatArr"  :hasChatKfUserId="hasChatKfUserId" :currUserChat="currUserChat" :isLogin="isLogin" :user="user"></chat-nav>
            <!--人气-->
            <popularity :presentCount="presentCount" v-show="navActive==0 && !isPrivateChat"></popularity>
            <!-- 内容区域 -->
            <div class="container" :class="navActive == 0 ? 'confirst' : ''">
                <swiper :options="swiperOption" ref="mySwiper">
                    <!--老师-->
                    <swiper-slide>
                        <div class="consult" :nav-active = "navActive">
                            <!--群聊-->
                            <public-chat v-show="!isPrivateChat"></public-chat>
                            <!--私聊-->
                            <private-chat :chatArr="chatArr" v-show="isPrivateChat"></private-chat>      
                        </div>
                    </swiper-slide>
                    <!-- 学校简介 -->
                    <swiper-slide>
                        <introduce :nav-active="navActive" :schoolInfo="schoolInfo" :room="room"></introduce>
                    </swiper-slide>
                    <!-- 活动日程 -->
                    <swiper-slide v-if="actList.length">
                        <schedule :nav-active="navActive">
                        </schedule>
                    </swiper-slide>
                    <!--校园风采 -->
                    <swiper-slide>
                        <campus-style :nav-active="navActive" :schoolInfo="schoolInfo">
                        </campus-style>
                    </swiper-slide>
                    <!--资料下载-->
                    <swiper-slide v-if="loadarr.length">
                        <download :nav-active="navActive">
                        </download>
                    </swiper-slide>
                </swiper>

            </div>
        <!--报名-->
        <sign-up :nav-active="navActive" :isLogin="isLogin"></sign-up>
        <!-- 聊天区域 -->
        <my-footer :isLogin="isLogin" :nav-active="navActive" :praise="praise" :chatArr="chatArr" :kfUserId="kfUserId" :currUser="currUser"></my-footer>
        <!--初始化加载-->
        <loading v-show="model==10" :error="error"></loading>
		<!--未登录弹窗-->
		<login></login>
    </div>
</template>

<script>

import { mapGetters } from 'vuex'
import myHeader from './components/header'
import myVideo from './components/video'
import myNav from './components/Nav'
import SysMessage from './components/SysMessage'
import myFooter from './components/footer'
import introduce from './components/introduce'
import schedule from './components/schedule'
import campusStyle from './components/CampusStyle'
import Download from './components/Download'
import chatNav from './components/chatNav'
import Popularity from './components/Popularity'
import publicChat from './components/publicChat'
import privateChat from './components/privateChat'
import SignUp from './components/SignUp'
import loading from './components/load'
import login from './components/login'

import {socket,port,socketUrl} from './js/socket'
import {getString,getUserName,getHistoryChat, nologin} from './js/common'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

import send from './js/send'

export default {
    components: {
        myHeader,
        myVideo,
        myNav,
        SysMessage,
        myFooter,
        introduce,
        schedule,
        campusStyle,
        Download,
        chatNav,
        Popularity,
        publicChat,
        privateChat,
        Popularity,
        SignUp,
        loading,
        login,
        swiper,
        swiperSlide
    },
    data (){
        return {
            swiperOption: {
                notNextTick: true,
                autoHeight: true,
                pagination : '.swiper-pagination',
                paginationClickable :true,
                debugger: true,
                onSlideChangeEnd: swiper => {
                    console.log('onSlideChangeEnd', swiper.realIndex)
                    this.navActive=swiper.realIndex;
                }
            },
            //tab切换
            navActive: 0,
            //直播回顾内容
            historyArr: new Array(),
            // 0：视频直播
            // 1： ppt直播
            // 3：视频点播
            // 4：图集轮播
            // 5：视频轮播
            // 6：直播预告
            // 7：即将开始
            // 8：结束
            // 9:回顾视频
            // 10: 加载中
            model: 10,
            //错误信息
            error: '',
            //系统信息
            sysMessage: [],
            //点赞
            praise: {},
            //人气
            presentCount: 0,
            //轮播图集集锦
            picArr: [],
            vodList: [],
            prePlayMode: 0,
            //全部聊天内容
            allChatArr: new Array(),
            //当前聊天内容
            chatArr: new Array(),
            //kf Id
            kfUserId: [],
            currUser: {},
            currUserId: "",
            currUserChat: {},
            //主播
            zb: {},
            //有聊天记录的客服userId
            hasChatKfUserId: "",
            //聊天记录状态
            moreText: '加载更多',
            //历史图文列表状态
            morehis: '加载更多',
            //房间信息
            room: {},
            //展台客服列表
            kefu: new Array(),
            //status房间状态
            status: 0,
            //直播流
            hlsDownstream: '',
            //直播流音频
            hlsVoiceDownstream: '',
            //录播视频
            vod: '',
            //录播视频列表
            vodArr: new Array(),
            //回顾视频列表
            reviewArr: [],
            //用户是否登录
            isLogin: userLogin.loginType,
            //@功能
            defVal: '',
            //房间用户信息
            user: {},
            //用户是否预约
            registered: false,
            //拉黑原因
            reason: '',
            //黑名单
            isblack: false,                      
            //ppt直播显示图片
            pptImg: '',
            //联系方式
            contact: {},
            //是否显示联系方式
            contactShow: 0,
            //登录
            loginData: '',
            vodliving: '',
            //是否正在直播
            islive: false
           
        }
    },
    computed:{
        swiper() {
            return this.$refs.mySwiper.swiper
        },
       
        ...mapGetters ([
            'actList',
            'loadarr',
            'isPrivateChat',
            'watchMode',
            'schoolInfo',
            'schoolImgs',
            'recommVideoList'
        ])
        
    },

    mounted:function(){

        var $this = this
        var page = 0
        var prefix = ''
        var pages
		let num = -1

        //连接socket
        let link = function(){
            if(window.WebSocket){
                window.io = socket()

                io.onopen = function(){
                    $this.error = '连接成功'
                    send()
                }

                io.onerror = function(e){
                    $this.error = '连接失败，正在重连...'
                    link()
                    return
                }

                io.onmessage = function(d){                     
                    let str = d.data;
                    let num = str.slice(1,5);
                    let data = str.substr(5);
                    data = eval('(' + data + ')')
                    console.log(num)
                    console.log(data)
                    switch(num){
                        case '0100':
                            $this.user=data.body.user
                            $this.presentCount=data.body.presentCount;

                            $this.registered=data.body.user.registered;

                            if(data.status != 200){
                                $this.error = data.message
                            }
                            
                        break

                        case '0105':
                            $this.registered = true

                        break
                        //房间基本信息
                        case '0300':
                            $this.room=data.body;
                            let watchMode = data.body.watchMode
                            $this.$store.commit("watchMode",data.body.watchMode);

                            $this.prePlayMode = data.body.prePlayMode
                            if(!$this.hlsDownstream){ // 不是在直播
                                $this.model = $this.prePlayMode

                            }
                            if($this.vodliving){
                                $this.model=3
                            }

                            

                            // 会员模式下，允许游客进入直播间，5秒后自动弹出登录弹窗
                            if(watchMode == 1 && $this.isLogin == 2){
                                setTimeout(()=>{
                                    showLogin({'title':'请登录后继续观看'});
                                },5000);
                            }

                            $this.room.start = data.body.startTime
                            $this.room.end = data.body.endTime
                            let status = data.body.status
                                                        
                            if(!data.body.backgroundUrl){
                                $this.room.backgroundUrl = 'http://m.live.smartlifein.com/static/web/wap/live/assets/default_preview.png'                       
                            }
                            $this.status = status
                                if(status == 0){    //待举办
                                    var now = new Date().getTime()
                                    var start = data.body.startTime  //1506680760000  1498870800000

                                    var tol = (start - now)/1000
                                    if(tol > 0){
                                        $this.model = 6 //预告
                                    }
                                    else
                                        $this.model = 7  //即将开始
                                }else if(status == 2){  //进行中
                                    /*if(!$this.hlsDownstream){
                                        $this.model == 7
                                    }
                                   $this.model = 7 */
                                }else if(status == 4){ //结束
                                    //房间状态结束，不播放轮播视频和图集，所以islive设为true
                                    $this.islive = true
                                    //获取视频信息
                                    let videourl = getString('0331')
                                    io.send(videourl)
                                }
                            
                        break;

                        case '0351':
                            $this.praise=data.body;
                        break;

                        //获取轮播视频信息
                        case '0332':
                            if(!data.body.length){
                                return;
                            }
                            $this.vodList = data.body
                            
                            break
                        //获取房间轮播图集
                        case '0360':
                            $this.picArr = data.body
                            break

                        //获取下载资料
                        case '0310':
                            // $this.loadarr = data.body;
                            $this.$store.commit("loadarr",data.body);

                            break
                        //获取ppt详情
                        case '0321':
                            prefix = data.body.prefix
                            pages = data.body.pages
                            
                            $this.pptImg = prefix + pages[page - 1].url
                            break
                        //ppt翻页
                        case '1810':
                            page = data.body.page
                            $this.pptImg = prefix + pages[page - 1].url
                            break
                        //推送直播流
                        case '1800':
                            let type = data.body.type
                            //ppt直播
                            if(type == 'ppt_live'){
                                let pptId = data.body.pptId
                                page = data.body.page
                                $this.hlsDownstream = data.body.hlsDownstream
                                $this.hlsVoiceDownstream = data.body.hlsVoiceDownstream
                                let url = getString('0321',{"id":pptId})
                                io.send(url)
                                $this.model = 1
                            }else{
                                $this.model = 0
                                $this.hlsDownstream = data.body.hlsDownstream
                            }
                            $this.islive = true
                        break
                        //直播结束通知
                        case '1801':
                            $this.model = $this.prePlayMode
                            console.log("结束直播。。。。。");
                            $this.islive = false
                        break
                        //vod 直播点播开始通知
                        case '1820':
                            $this.model = 3
                            $this.vodliving = data.body.vodName
                            $this.islive = true
                            break
                        //vod 直播结束通知
                        case '1821':
                            $this.model = $this.prePlayMode
                            $this.islive = false
                            break 
       
                        //ppt直播切换列表
                        case '20804':
                                page = data.body.page
                                $this.pptImg = prefix + pages[page-1].url
                            break
                        //在线展视频直播接口结束

                        case '1001':
                            $this.presentCount=data.body.count;
                            break                      
                        //历史聊天记录
                         /**
                        进入展台默认选中客服的聊天记录,如果首次进来会收到1210
                        分配客服通知接口,此时显示此接口消息，否则显示默认聊天记录
                        */
                        //如果有聊天记录，则选中有聊天记录的第一个客服
                        case '0211':
                        if(data.status==500){ //游客模式
                            return;
                        }
                        if(data.body.msgList == undefined){
                            $this.chatArr = []
                            return
                        }
                        
                        $this.allChatArr=data.body.msgList;
                        if($this.allChatArr && $this.allChatArr.length){
                            for(var m=0;m<$this.allChatArr.length;m++){
                                if($this.allChatArr[m].user.userType==4){
                                    $this.hasChatKfUserId=$this.allChatArr[m].user.userId;
                                    console.log("选中客服的userid====="+$this.hasChatKfUserId)
                                    $this.chatArr=getHistoryChat($this.allChatArr,$this.hasChatKfUserId)
                                    $this.currUser=$this.allChatArr[m].user;
                                    break;
                                }
                            }

                        }
                        
                        break;
                        
                        //发送消息后的响应
                        case '0210':
                        var chatbody=data.body;

                        var chatUserId1=$this.currUser.userId;
                        console.log("0210================="+$this.currUser.userId)
                        var sendChat={};
                            sendChat.chatTime=Date.parse(new Date(chatbody.createDate))
                            sendChat.chatType=1;
                            sendChat.content=chatbody.content;
                            sendChat.id=chatbody.id;
                            sendChat.roomId=chatbody.roomId;
                            sendChat.type=chatbody.type; 
                            console.log($this.chatArr)

                            //加到全部聊天记录
                            for(var i=0;i<$this.allChatArr.length;i++){
                                if($this.allChatArr[i].user.userId==chatUserId1){
                                    $this.allChatArr[i].msgs.push(sendChat);
                                    return;
                                }
                            }

                            var chatJosn1={
                                "msgs":[sendChat],
                                "user":$this.currUser
                            }

                            $this.allChatArr.push(chatJosn1);

                          //这句不加聊天内容就不显示
                            $this.chatArr=getHistoryChat($this.allChatArr,chatUserId1)

                            console.log("0210=================")
                            console.log($this.allChatArr);

                            break;

                        //获取展台客服列表
                        case '0301':
                        //如果客服列表里也有主播，主播要放在最后
                        var kfArr=data.body;
                        var zb=[];
                        var onlinekf=[];
                        var offkf=[];
                        for(var i=0;i<kfArr.length;i++){
                            if(kfArr[i].userType==3){
                                zb.push(kfArr[i]);
                            }else{
                                if(kfArr[i].isOnline==1){
                                   onlinekf.push(kfArr[i]) 
                                }else{
                                    offkf.push(kfArr[i])
                                    
                                }
                            }
                        }
                        $this.kefu=onlinekf.concat(offkf).concat(zb);

                        //页面加载，保存第一个客服的userId,使对应导航选中
                        /*if($this.watchMode==0){
                            $this.$store.commit("chatUserId",$this.kefu[0].userId);

                        }
*/

                        break
                        //房间状态改变通知
                        case '1300':
                            $this.room.status = data.body.status
                            //结束房间直播
                            if(data.body.status == 4){ //结束
                                $this.model = 8
                                $this.room.isEnd = true  //增加 是否结束 属性
                                //获取视频信息
                                let videourl = getString('0331')
                                io.send(videourl)
                            }
                            break
                        //获取回顾视频
                        case '0331':
                            if(data.body.length) {
                                $this.reviewArr = data.body
                                $this.model = 9
                            }else{
                                $this.model = 8
                            }
                            $this.room.isEnd = true
                            break
                       
                        case '0200':
                            $this.$store.commit("addPublicChat",data.body);

                            break

                        //用户进入房间
                        case '1100':
                        $this.sysMessage.push(getUserName(data.body.name)+"进入")
                        //如果客服进入房间，此客服状态改为在线
                        if(data.body.userType==4){
                            for(var i=0;i<$this.kefu.length;i++){
                                if($this.kefu[i].userId==data.body.userId){
                                    $this.kefu[i].isOnline=1;
                                }
                            }
                        }
                        break;
                        case '1101':
                        //如果客服退出房间，此客服状态改为离线
                        if(data.body.userType==4){
                            for(var i=0;i<$this.kefu.length;i++){
                                if($this.kefu[i].userId==data.body.userId){
                                    $this.kefu[i].isOnline=0;
                                    break;
                                }
                            }
                        }
                        break;
                        //点赞
                        case '1350':
                            $this.sysMessage.push(getUserName(data.body.name)+"点了赞");
                            $this.praise.num++;
                            break;
                        //分配观众到客服通知(当客服给当前观众发消息时，当前观众会收到这个通知)
                        //分两种情况1.没有聊天记录时自动分配 2.别的客服发的消息
                        //如果进来时，没有聊天记录，会响应1210接口，同时会收到0211聊天记录接口，只不过msgList为空
                       // 现在有个问题，刚进入时，自动分配了客服，此时如果观众收到客服的消息，自动切换到发送消息的客服了
                        case '1210':

                            var chatbody1=data.body;
                            var chatUserId=data.body.author.userId;
                            //这里是为了区分进入时自动分配客服的选中和收到消息时的选中
                            if(!document.querySelector("#list li.active")){
                                $this.hasChatKfUserId=chatUserId;
                            }
                            var sendChat1={};
                            sendChat1.chatTime=Date.parse(new Date(chatbody1.chatTime))
                            sendChat1.chatType=1;
                            sendChat1.content=chatbody1.content;
                            sendChat1.id=chatbody1.id;
                            sendChat1.roomId=chatbody1.roomId;
                            sendChat1.type=2;

                            $this.kfUserId=[chatUserId]; 
                            $this.currUserChat=data.body;

                            var chatJosn={
                                "msgs":[sendChat1],
                                "user":chatbody1.author
                            }

                            console.log("1210==============")
                            console.log($this.allChatArr);

                            for(var i=0;i<$this.allChatArr.length;i++){
                                if($this.allChatArr[i].user.userId==chatUserId){

                                    $this.allChatArr[i].msgs.push(sendChat1);

                                    if(!document.querySelector("#list li.active")){
                                        alert("请点击选择老师交流")
                                    }else if(document.querySelector("#list li.active").getAttribute("data-userid")==chatUserId){

                                        $this.chatArr=getHistoryChat($this.allChatArr,chatUserId)
                                    }
                                    document.querySelector(".consult ").scrollTop="100000"

                                    return;
                                }
                            }


                            console.log("出到循环外面了。。。。。。")

                            $this.allChatArr.push(chatJosn);
                            if(document.querySelector("#list li.active").getAttribute("data-userid")==chatUserId){
                                $this.chatArr=getHistoryChat($this.allChatArr,chatUserId)
                            }

                            document.querySelector(".consult ").scrollTop="100000"
                            break;

                        //群聊历史聊天消息
                        case '0201':
                            $this.$store.commit("addPublicHistoryChat",data.body);
                           
                        break

                        //群聊推送
                        case '1200':
                        $this.$store.commit("addPublicChat",data.body);
                           
                        break

                    }
                }
            }
        }

        link();

        $this.$store.dispatch("getSchoolInfo")
        $this.$store.dispatch("getActList")
        $this.$store.dispatch("getRecommendVedio")
        
    },
    
    methods:{
        navChange:function(num){
            this.navActive = num
            this.swiper.slideTo(num)

        }
    }
}
</script>

<style>
#app{height: 100%;}

</style>