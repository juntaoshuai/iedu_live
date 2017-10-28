<template>
    <section class="tab-content">
        <ul class="download-list" v-if="">
            <li v-for="i in loadarr">
                <a v-bind:href="i.url" @click="load">
                    <p>{{i.name}}</p>
                    <span class="web-font icon-download fr"></span>
                </a>
            </li>
        </ul>
        <!-- <p class="no_load" v-if="loadarr.length==0">暂无下载资料</p> -->
    </section>
</template>

<script>
import {getString,noLogin} from '../js/common'
export default {
    computed:{
        loadarr(){
            return this.$store.getters.loadarr
        }
    },
    methods:{
        load:function(){
            if(userLogin.loginType == 2){
                noLogin()
                event.preventDefault()      
                return
            }
            let url = getString('0068')
            webSocket.send(url)
        }
    }
}
</script>

<style scoped>
.no_load{text-align: center;line-height: 1.2rem;color:#999999;}
.download-list li{position: relative;height: .86rem;overflow: hidden;line-height: .86rem;padding: 0 .24rem;color: #000;font-size: .3rem;border-bottom: 1px solid #e4e4e4;}
.download-list li p{float: left;width: 6rem;overflow: hidden;color: #000;}
.icon-download{font-family: "iconfont";font-size: .5rem;color: #929295;}
</style>
