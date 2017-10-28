<template>
    <section class="sys-message" v-show="navActive==0">
        <div class="sysMsg-wrap" id="swrap">
            <ul id="sul" class='clearfix'>
                <li v-for="mess in sysMessage">{{mess}}</li>
            </ul>
        </div>
    </section>
</template>
<script>
export default {
    data (){
        return {
            
        }
    },
    props:{
        message:{
            type:Array
        },
        bulletin:{
            type:String
        },
        navActive:{
            type:Number
        },
        sysMessage:{
            type:Array
        }
    },
    watch:{
        sysMessage(newVal,oldVal){
            if(this.sysMessage.length>2){
                var _this=this;
                var sul=document.getElementById("sul");
                var lifirst=sul.getElementsByTagName("li")[0];
                var w=lifirst.offsetWidth;
                sul.style.transform='translate3d('+-w+'px,0,0)';
                sul.style.transition='all .8s';
                setTimeout(function(){
                    sul.style.transform='translate3d(0,0,0)';
                    sul.style.transition='none';
                    sul.removeChild(lifirst);
                },800)

            }

        } 
    }

}
</script>
<style type="text/css">
    .sys-message{
        height:.5rem;
        line-height: .5rem;
        background:#ededed;
        padding:0 .12rem;
        font-size:.26rem;
        color:#b5b5b5;
        position: absolute;
        width:100%;
        left:0;
        top:4.83rem;
    }
    .sysMsg-wrap{height: .5rem;overflow: hidden;}
    .sys-message ul{width:1000%;} 
    .sys-message li{float: left;padding-right: .92rem;}

</style>