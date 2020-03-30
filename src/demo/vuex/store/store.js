import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const store=new Vuex.Store({
    state:{
        name:"孙艺珍",
        age:30
    },
    // 如果要修改state中的值，必须要通过mutations中的方法
    mutations:{
        changeName(state,params){
            console.log(state,params)
            state.name=params.name;
        },
        addAge(state){
            state.age++;
        }
    },
    // 通过actions中方法触发异步方法，actions由dispatch()触发
    actions:{
        changeNameAction({commit},params){
            setTimeout(()=>{
                let name=params.name;
                // let {commit}=obj;
                commit("changeName",{name:name});
            },500);
        }
    },
    // 派生属性，vuex中的计算属性
    getters: {
        doubleAge(state){
            return state.age*2;
        }
    },
});

export default store;
