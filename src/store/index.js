import Vue from 'vue'
import Vuex from 'vuex'
import other from './modules/other'
import chat from './modules/chat'


Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        other,
        chat
    }
})
