<template>
    <div class="popularity">
        <p>人气 <span class="pop-num">{{presentCount}}</span></p>
    </div>
</template>
<script>
    export default{
        props:{
            presentCount:{
                type:Number
            }
        }
    }
</script>
<style scoped>
    .popularity{
        width: 100%;
        position: absolute;
        left: 0;
        top: 7.56rem;
        z-index: 1;
    }
    .popularity p{
        font-size: .28rem;
        line-height: .4rem;
        color:#4990e2;
        padding-left: .2rem;

    }

</style>