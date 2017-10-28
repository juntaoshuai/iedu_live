<template>
    <section class="content1" ref="container">
        <article>
            <div class="slideMore">下拉加载更多</div>

            <div class="items">
                <ul id="mes">
                    <li v-for="i in publicMessage">
                        <!--<img src="../assets/logo.png">-->
                        <span v-if="i.author.name != ''">{{i.author.name}}:</span>
                        <a v-html="i.content"></a>
                    </li>
                </ul>
            </div>
        </article>  
    </section>
</template>

<script>
import {mapGetters} from 'vuex'
import {scrollLeft,getString} from '../js/common'

export default {
    data (){
        return {
            index:0,
            tol:0,
            startNum:10, //一次加载10条
            isPullDown:false,
            flag: 0, // 表示是否达到刷新条件
            loading: 0,  // 表示是否正在刷新中
            touchStart: 0,  // 手指触摸屏幕的起点
            distance: 0     // 手指滑动的距离
        }
    },

    computed:{
        ...mapGetters([
            'publicMessage',
            'noChatMsg'
        ])
        
    },
    mounted:function(){
        let $this = this
        
        var slidemore=document.querySelector(".slideMore");
        const container = this.$refs.container
        container.addEventListener('touchstart', (e) => {
        // 如果loading为true就代表刷新函数正在进行，此时阻止下拉操作，返回
        if (this.loading) { 
          e.preventDefault()
          return
        }
        // 取第一个手指的触摸点作为起始点
        this.touchStart = e.targetTouches[0].clientY
      })
      container.addEventListener('touchmove', (e) => {
        // 如果没有触摸起始点，返回
        if (!this.touchStart) {
          return
        }
        if (this.loading) {
          e.preventDefault()
          return
        }

        const touch = e.targetTouches[0]
        const scrollTop = container.scrollTop
        if (scrollTop === 0) {
          this.distance = touch.clientY - this.touchStart
          if (this.distance > 0) {
            e.preventDefault()
            if (this.distance < 25) { //50
              container.style.overflow = 'inherit'
              container.style.transform = 'translate3D(0px, ' + this.distance +'px, 0px)'
              if (this.distance > 17) { //25
                  slidemore.innerHTML="释放刷新↑"
                  this.flag = 1
              } else {
                  slidemore.innerHTML="下拉刷新↓"

              }
            }
          }
        }
      })
      container.addEventListener('touchend', (e) => {
        
        if($this.noChatMsg && container.scrollTop==0){
            slidemore.innerHTML="没有更多了"
            setTimeout(()=>{
                this.flag = 0
                this.loading = 0
                container.scrollTop = 0
                container.style.overflow = 'auto'
                container.style.transform = 'translate3D(0px, 0px, 0px)'
            },100)
            return;
        }
        if (this.distance === 0) {
          return
        }
        if (this.loading) {
          e.preventDefault()
          return
        }
        
        if (this.flag && this.distance > 0) {
          // container.style.transform = 'translate3D(0px, 20px, 0px)'

          this.loading = 1
          
        slidemore.style.display='block'
        slidemore.innerHTML="正在加载"
        setTimeout(()=>{

            let pHistoryurl=getString('0201',{"start":$this.startNum,"size":10})
            
            io.send(pHistoryurl)

            $this.startNum+=10

            this.flag = 0
            this.loading = 0
            container.scrollTop = 0
            container.style.overflow = 'auto'
            container.style.transform = 'translate3D(0px, 0px, 0px)'
            slidemore.innerHTML="下拉加载更多"
            this.isPullDown=true

        },100);
            return
        }
        // 重置变量
        this.flag = 0
        container.style.overflow = 'auto'
        container.style.transform = 'translate3D(0px, 0px, 0px)'
      })




        }
        
    
}
</script>

<style scoped>
    .slideMore{text-align: center;color: #666;}

</style>
