<template>
    <div class="player" v-show="songList.length">
        <div class="fullPlayer" v-show="fullScreen">
            <div class="background">
                <img v-if="currentSong" :src="albumUrl">
            </div>
            <div class="header" v-if="currentSong">
                <span class="iconfont icon-xiangxiajiantouxiao" @click="toggle(false)"></span>
                <h2>{{currentSong.musicData.songname}}</h2>
                <p>{{currentSong.musicData.singer[0]['name']}}</p>

            </div>
            <div class="CD">
                <img :class="playClass" v-if="currentSong" :src="albumUrl">
            </div>
            <PLyric :playing="playing" :current="current"></PLyric>
            <audio
                ref="audio" 
                v-if="currentSong" 
                :src="songUrl" 
                controls 
                @timeupdate="timeUpdate"
                @ended="ended"
            ></audio>
            <div class="control">
                <button @click="prev">prev</button>
                <button @click="play">play</button>
                <button @click="next">next</button>
            </div>
            <PScrollBar :current="current" :duration="duration" @jump="jump"></PScrollBar>
        </div>
        
        <div class="miniPlayer" v-show="!fullScreen" @click="toggle(true)">

        </div>
    </div>
</template>
<script>
import {mapState,mapMutations,mapActions,mapGetters} from "vuex";
import {albumUrl,songUrl} from "utils/formatUrl.js";
import PScrollBar from "components/P-scrollBar.vue";
import PLyric from "components/P-lyric.vue";
// console.log(songUrl)
// console.log(albumUrl)
export default {
    data() {
        return {
            playing:false,
            current:0,
            duration:0
        }
    },
    components:{PScrollBar,PLyric},
    computed: {
        // songList(){
        //     return this.$store.state.songList.length;
        // }
        ...mapState(["songList","fullScreen","currentIndex"]),
        // currentSong(){
        //     return this.$store.getters.currentSong
        // }
        ...mapGetters(["currentSong"]),
        albumUrl(){
            return albumUrl(this.currentSong.musicData.albummid);
        },
        songUrl(){
            return songUrl(this.currentSong.musicData.strMediaMid);
        },
        playClass(){
            return this.playing?"play":"play paused";
        }
    },
    methods: {
        toggle(fullState){
            this.$store.commit("SET_FULL_SCREEN",fullState);
        },
        play(){
            let audio=this.$refs.audio;
            this.duration=audio.duration;
            if(audio.paused){
                audio.play();
                this.playing=true;
            }else{
                audio.pause();
                this.playing=false;
            }
            // console.log(audio.__proto__)
        },
        timeUpdate(e){
            // console.log("时间变化",e.target.currentTime)
            this.current=e.target.currentTime;
        },
        next(){
            let index=this.currentIndex+1;
            this.$store.commit("SET_CURRENT_INDEX",index);
            this.$nextTick(()=>{
                this.play();
            });
        },
        prev(){
            let index=this.currentIndex-1;
            this.$store.commit("SET_CURRENT_INDEX",index);
            this.$nextTick(()=>{
                this.play();
            });
        },
        ended(e){
            // this.playing=false;
            // console.log("ended",e,this)
            this.next();
        },
        jump(percentage){
            let audio=this.$refs.audio;
            this.duration=audio.duration;
            audio.play();
            this.playing=true;
            this.$refs.audio.currentTime=this.duration*percentage/100;
        }
    },
    mounted() {
        // console.log(this)
    },
}
</script>
<style lang="less">
@import "~style/index.less";
.player{
    .fullPlayer{
        position: fixed;
        top:0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        background: @bg;
        z-index: 10;
        .background{
            position: absolute;
            top: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            img{
                width: 100%;
                height: 100%;
                filter:blur(20px);
                opacity: 0.6;
            }
        }
        .header{
            position: relative;
            color: #fff;
            .margin_b(25);
            span{
                position: absolute;
                top: 0;
                .left(5);
                .w(40);
                .l_h(40);
                text-align: center;
                color: @fc-yellow;
                font-size: 28px;
            }
            h2{
                .l_h(40);
                text-align: center;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                font-size: @fs-18;
                font-weight: normal;
            }
            p{
                .l_h(20);
                text-align: center;
                font-size: @fs-14;
            }
        }
        .CD{
            display: flex;
            justify-content: center;
            img{
                .w(300);
                .h(300);
                border-radius: 50%;
                border: 10px solid hsla(0,0%,100%,.1);
                box-sizing: border-box;
                &.play{
                    animation: rotate 20s linear infinite;
                }
                &.paused{
                    animation-play-state: paused;
                }
            }
        }
        audio{
            
        }
        .control{
            
        }
    }
    .miniPlayer{
        position: absolute;
        z-index: 10;
        bottom: 0;
        left: 0;
        right: 0;
        .w(375);
        .h(60);
        background-color: #333;
    }
}

@keyframes rotate{
    0%{
        transform: rotate(0deg);
    }
    100%{
        transform: rotate(360deg);
    }
}
</style>