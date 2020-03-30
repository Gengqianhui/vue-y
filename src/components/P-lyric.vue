<template>
    <div class="lyric">
        {{lyric}}
    </div>
</template>
<script>
/**
 * 1、ajax获取歌词
 * 2、显示歌词
 * 3、歌词随着歌曲随动（歌词和歌曲同步，同时暂停，同时开启）
 * 
 */
import {Base64} from "js-base64";
import LyricParser from "lyric-parser";
import {mapGetters} from "vuex";
export default {
    props:["playing","current"],
    data(){
        return{
            lyric:"暂无歌词",
            autoplay:true
        }
    },
    computed: {
        ...mapGetters(["currentSong"])
    },
    watch: {
        currentSong(newValue,oldValue){
            console.log(newValue,oldValue)
            this.initLyricData(newValue.musicData.songmid);
        },
        playing(newValue,oldValue){
            if(newValue){
                this.lyricObj.togglePlay();
            }else{
                this.lyricObj.togglePlay();
            }
        },
        current(newValue,oldValue){
            let seekTime=newValue*1000;
            this.lyricObj.seek(seekTime);
        }
    },
    methods: {
        initLyricData(songmid){
            let url=`/lyric/music/api/lyric?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&songmid=${songmid}&platform=yqq&hostUin=0&needNewCode=0&categoryId=10000000&pcachetime=1581573879680`;
            this.$axios.get(url,()=>{

            }).then((data)=>{
                if(data.code!=0) return;
                let lyric=Base64.decode(data.lyric);
                console.log(lyric)
                // this.lyricObj=null;
                this.lyricObj=new LyricParser(lyric,(obj)=>{
                    console.log("播放歌词",obj)
                    this.lyric=obj.txt;
                });
                if(this.autoplay){
                    // this.lyricObj.play();
                }
                // lyricObj.seek(178350);
            });
        }
    },
    created() {
        this.initLyricData();
    },
}
</script>
<style lang="less">
@import "~style/index.less";
.lyric{
    .margin_t(30);
    .margin_b(30);
    .l_h(20);
    font-size:@fs-14;
    color: hsla(0,0%,100%,.5);
    text-align: center;
}
</style>