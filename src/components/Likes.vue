<template>
    <div id="likes" v-if="navActive==0">
        <i></i>
        <p class="likes-num">1000</p>
    </div>
</template>
<script>
    export default{
        props:{
            navActive:{
                type:Number
            }
        }
    }
</script>
<style>
    #likes{
        background:#f8be4f;
        box-shadow:0 0 .12rem 0 rgba(0,0,0,0.12), 0 .12rem .12rem 0 rgba(0,0,0,0.24);
        width:1.1rem;
        height:1.1rem;
        border-radius:100%;
        position:absolute;
        right:.32rem;
        bottom:1.28rem;
        text-align: center;
    }
    #likes i{
        display: inline-block;
        background: url(../assets/likes.png) center 0 no-repeat;
        width:.4rem;
        height: .4rem;
        background-size: contain;
        margin-top: .2rem;
    }
    #likes .likes-num{
        font-size: .24rem;
        color:#fff;
    }
</style>