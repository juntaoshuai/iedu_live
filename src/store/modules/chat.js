import {biaoQing} from '../../js/common'

const state = {
    publicMessage: [], //包含name和content
    isPrivateChat: false,
    watchMode: 0, // 0:游客模式，1:会员模式 
    noChatMsg: false,//下一页是否有群聊历史消息
    chatUserId: "publicId" //客服userId,如果是群聊值为“publicId”,根据此切换导航选中效果
   
  }

const getters = {
      publicMessage: state => {
        state.publicMessage.forEach(item => {
            item.content = biaoQing(item.content)
        })
        return state.publicMessage
      },
      
      isPrivateChat: state => state.isPrivateChat,
      watchMode: state => state.watchMode,
      noChatMsg: state => state.noChatMsg,
      chatUserId: state => state.chatUserId  

}

const mutations = {

    isPrivateChat(state, mes){
        state.isPrivateChat=mes;
    },

    addPublicChat(state, mess){
      state.publicMessage.push(mess);

    },

    addPublicHistoryChat(state, mesarr){
      if(mesarr.length < 10){
          state.noChatMsg = true
      }
      mesarr.forEach(item => state.publicMessage.unshift(item))
    },

    watchMode(state, mode){
      state.watchMode = mode;
      if(mode == 1){
        state.isPrivateChat = false
      }
    },

    chatUserId(state, id){
      state.chatUserId = id;

    }

    
}

const actions = {

}

export default {
  state,
  getters,
  mutations,
  actions
}




