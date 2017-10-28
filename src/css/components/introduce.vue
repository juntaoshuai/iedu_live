<template>
    <div class="introduce tab-content">
        <dl>
            <dt class="fl"><img :src="schoolInfo.thumb" alt=""></dt>
            <dd>{{schoolInfo.title}}</dd>
        </dl>
        <div class="intro-con" v-if="room.detail">
            <h3>直播简介</h3>
            <p v-html="room.detail"></p>
        </div>
        <div class="intro-con">
            <h3>学校简介</h3>
            <h4 v-html="schoolInfo.title"></h4>
            <p v-html="schoolInfo.description"></p>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
    export default{
        props:{
            room:{
                type:Object
            }
        },
        data(){
            return{
            }
        },
        computed: {
            ...mapGetters([
                'schoolInfo'
            ])
        }
    }
</script>
<style scoped>
    .introduce dl{
        padding:0 .32rem .5rem;
        overflow: hidden;
        margin-top: .34rem;
        display: table;
    }
    .introduce dt{
        margin-right: .32rem;
    }
    .introduce dt img{
        width:2.5rem;
        /*height: 1.2rem;*/
    }
    .introduce dd{
        font-size:.32rem;
        line-height:.38rem;
        color:#333;
        display: table-cell;
        vertical-align: middle;
    }
    .intro-con{
        padding:0 .32rem .38rem;
        font-size:.28rem;
        color:#333;
        border-top: 1px solid #e9e9e9;
    }
    .intro-con h3{
        line-height: .34rem;
        padding:.3rem 0;
    }
    .intro-con h4{margin-bottom: .1rem;}
   .intro-con p{
        line-height: .44rem;
        text-align: justify;
   }
</style>