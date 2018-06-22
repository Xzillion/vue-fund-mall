/**
 * 组件状态管理 by zouxiang 官网地址https://vuex.vuejs.org/zh-cn/
 */
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {        
        jumpDirection: '-1',      //路由方向  0:后退，1：前进, -1回到首页
        buttomBarActiveKey: 'home',   //首页底部栏的焦点key
        
    },
    getters: {
        
    },
    //简单的状态修改使用mutations
    mutations: {        
        setJumpDirection(state, type){
            state.jumpDirection = type;
        },
        buttomBarActiveKey(state, key) {
            state.buttomBarActiveKey = key;
        }
    },
    //带业务逻辑的或者异步调用的使用actions
    actions: {        
        
    },
    plugins: [createPersistedState({ storage: window.sessionStorage })]
});
