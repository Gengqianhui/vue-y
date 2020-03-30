import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

const store=new Vuex.Store({
    state:{
        num:100
    },
    mutations:{
        add(state,params){
            state.num+=Number(params.num);
        }
    },
    actions:{
        addAction({commit},params){
            setTimeout(()=>{
                commit("add",{num:params.num});
            },500);
        }
    },
    getters:{
        num(state){
            return state.num;
        }
    }
})

export default store