<template>
    <div class="nav-list">
        <ul>
            <li v-for="(item,index) in navItems" :key="index" :class="{active:navActive==index}" @click="navChange(index)">{{item.con}}</li>

        </ul>
    </div>
</template>
<script>
    export default{
        props:{
            navActive:{
                type:Number
            },
            act:{
                type:Array
            },
            loadarr:{
                type:Array
            }
        },
        data(){
            return{
               
            }
        },
        computed:{
            navItems(){
                return this.$store.getters.navItems
            }
        },
        
        methods:{
            navChange(index){
                this.$parent.navChange(index)
            }
        },
        mounted() {
            console.log("nav=========================================");
            console.log(this.$store.getters.navItems)

       }


    }
</script>