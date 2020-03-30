import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
import type from "./mutations-type.js"
// console.log(type)
const store=new Vuex.Store({
    state:{
        playing:false,
        fullScreen:true,
        songList:[],     // 歌单列表
        currentIndex:-1,     // 当前正在播放的歌曲
    },
    mutations:{
        [type.SET_SONG_LIST](state,list){
            state.songList=list;
        },
        [type.SET_CURRENT_INDEX](state,index){
            if(index>state.songList.length-1){
                index=0;
            }else if(index<0){
                index=state.songList.length-1;
            }
            state.currentIndex=index;
        },
        [type.SET_FULL_SCREEN](state,fullState){
            state.fullScreen=fullState;
        }
    },
    actions:{
        addSongList({commit},{index,list}){
            commit(type.SET_SONG_LIST,list);
            commit(type.SET_CURRENT_INDEX,index);
            commit(type.SET_FULL_SCREEN,true);
        }
    },
    getters:{
        currentSong(state){
            // 根据下标获取当前播放歌曲的信息
            return state.songList[state.currentIndex];
        }
    }
})

export default store