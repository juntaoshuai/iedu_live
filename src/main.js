// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store/index'
import VueResource from 'vue-resource'
import resize from './js/resize'
import VueChatScroll from 'vue-chat-scroll'

import { MessageBox } from 'mint-ui'
Vue.component(MessageBox.name, MessageBox)


Vue.use(VueChatScroll)


require('./css/reset.css')
require('./css/swiper.min.css')
require('./css/style.css')
import {scrollLeft} from './js/common'
Vue.use(VueResource)
new Vue({
  el: '#app',
  store,
  render: h => h(App)
})

