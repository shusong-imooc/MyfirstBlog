import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)
const state={
    Token:null,
    UserInfo:{}
}
const getters={
    getToken(state){
        return state.Token;
    },
    getUserInfo(state){
        return state.UserInfo;
    }
}
const mutations={
    setToken(state,data){
        state.token=data;
    },
    setUserInfo(state,data){
        state.UserInfo.userid=data.id;
        state.UserInfo.username=data.username;
    }
}
const actions={
    setTokenCommit({conmmit},data){
        conmmit('setToken',data)
    },
    setUserInfoCommit({conmmit},data){
        conmmit('setUserInfo',data)
    }
}
export default new Vues.Store({
    getters:getters,
    state:state,
    mutations:mutations,
    actions:actions
})