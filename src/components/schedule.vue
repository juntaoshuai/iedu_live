<template>
    <div class="schedule tab-content">
        <ul class="schedule-list">
            <li v-for="act in actList">
                <h3>{{act.name}}</h3>
                <p>{{act.startTime | transformTime}} - {{act.endTime | transformTime}}</p>
                <!-- <h3>xxxx大学在线课程背景下的课程与选择</h3>
                <p>2017-04-25 09:00 - 2017-04-26 23:55</p> -->
            </li>
            
        </ul>
    </div>
</template>
<script>
    export default{
        computed: {
            actList() {
                return this.$store.getters.actList;
            }
        }, 
        
        filters: {
            transformTime: function(value) {
                return value.substring(0,value.lastIndexOf(":"))
            }
        }
    }
</script>
<style scoped>
    .schedule-list li{
        border-bottom:1px solid #e9e9e9;
        padding:.32rem 0;
    }
    .schedule-list li:last-child{
        border-bottom: none;
    }
    .schedule-list li h3{
        font-size: .28rem;
        font-weight: normal;
        color:#333;
        margin-left: .32rem;
        padding-left: .2rem;
        border-left:.08rem solid #27aec2;
    }
    .schedule-list li p{
        font-size: .24rem;
        color:#a5a5a5;
        margin-left: .32rem;
        padding:.12rem 0 0 .2rem;
        border-left:.08rem solid #27aec2;
    }
</style>