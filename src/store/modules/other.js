import Vue from 'vue'

const state = {
    actList:[], //活动列表
     //导航列表，如果此栏目没有内容，则隐藏此栏目，故配置成动态的
    navItems:[
        {"con": "咨询交流", "isShowNav": true},
        {"con": "简介", "isShowNav": true},
        {"con": "活动日程", "isShowNav": true},
        {"con": "校园风采", "isShowNav": true},
        {"con": "资料下载", "isShowNav": true}
    ],
    loadarr: [],
    schoolInfo: {},
    recommVideoList: []
   
  }

const getters={
      navItems: state => state.navItems.filter(item => item.isShowNav == true),
      loadarr: state => state.loadarr,
      actList: state => state.actList,
      schoolInfo: state => state.schoolInfo,
      schoolImgs: state => state.schoolInfo.imgs,
      recommVideoList: state => state.recommVideoList
}

const mutations = {
    getActList(state, payload){
        state.actList = payload;

        if(!state.actList.length){
            state.navItems[2].isShowNav = false
        }

    },

    loadarr(state, payload){
        state.loadarr = payload;
        if(!state.loadarr.length){
            state.navItems[4].isShowNav = false
        }
    },
    
    getSchoolInfo(state, payload){
        state.schoolInfo = payload;
        /*if(!state.schoolInfo.imgs.length && !state.recommVideoList.length){
            state.navItems[3].isShowNav=false
        }*/

    },

    getRecommendVedio(state, payload) {
        state.recommVideoList = payload
        /*if(!state.schoolInfo.imgs.length && !state.recommVideoList.length){
            state.navItems[3].isShowNav=false
        }*/

    }

}


const actions={

    //　action在App.vue里调用
    //　学校简介和校园风采
    getSchoolInfo({commit, state}){
        Vue.http.get('http://m.live.ieduchina.com/api/exhibition/getSchoolInfoByRoomId?roomId='+userLogin.roomId)
        .then(function(response) {

            commit("getSchoolInfo",response.data.data);

        }, function(response) {
            // 这里是处理错误的回调
            console.log(response)
        });


    },

    //活动日程
    getActList({commit, state}) {
        Vue.http.get('http://m.live.ieduchina.com/api/exhibition/getRoomActivityByRoomId?roomId='+userLogin.roomId)
        .then(function(response) {

            commit("getActList",response.data.data);

        }, function(response) {
            // 这里是处理错误的回调
            console.log(response)
        });

    },

    getRecommendVedio({commit, state}) {
        Vue.http.get('http://m.live.ieduchina.com/api/exhibition/getRecommendVedioByRoomId?roomId='+userLogin.roomId)
        .then(function(response) {
            commit("getRecommendVedio",response.data.data);            

        }, function(response) {
            // 这里是处理错误的回调
            console.log(response)
        });   
    }

}

export default {
  state,
  getters,
  mutations,
  actions
}
