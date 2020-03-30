<template>
    <div class="detail">
        <div class="header">
            <span @click="back" class="iconfont icon-back">
                <!-- <img :src="img"> -->
            </span>
            <p>{{singerName}}</p>
        </div>
        <div class="img" :style="bgImage" ref="img">
            <div>
                <div class="play" ref="play">
                    <span class="iconfont icon-bofang"></span>
                    <span>随机播放全部</span>
                </div>
            </div>
        </div>
        <div class="songList" ref="songWrapper">
            <ul>
                <li 
                    v-for="(item,index) in list" 
                    :key="index"
                    @click="goPlayer(index)"
                >
                    <h2>{{item.musicData.songname}}</h2>
                    <p>{{singerName}}·{{item.musicData.albumname}}</p>
                </li>
            </ul>
        </div>
        
    </div>
</template>
<script>
import img from "../assets/arrow.png";
import BS from "better-scroll";
export default {
    data() {
        return {
            singerName:"",
            img:img,
            list:[],
            vkey:""
        }
    },
    methods: {
        back(){
            this.$router.back();
        },
        initBS(){
            this.BS = new BS(this.$refs.songWrapper,{
                probeType:3,// 在屏幕滑动的过程中实时的派发 scroll 事件
                click:true
            });
            let img=this.$refs.img;
            let imgHeight=img.clientHeight;
            this.BS.on("scroll",(obj)=>{
                img.style.height=(imgHeight+obj.y)+"px";
                // 判断到达距离顶部40px
                if(img.clientHeight<=40){
                    img.style.height=40+"px";
                    img.style.zIndex=3;
                    this.$refs.songWrapper.style.zIndex=2;
                    this.$refs.play.style.opacity=0;
                }else{
                    img.style.zIndex=2;
                    this.$refs.songWrapper.style.zIndex=3;
                    this.$refs.play.style.opacity=1;
                }
                if(img.clientHeight>=262){
                    this.$refs.songWrapper.style.zIndex=10;
                }
                // 向下滚动
                if(obj.y>0){
                    let percentage=1+(obj.y/imgHeight);
                    img.style.transform=`scale(${percentage})`;
                    img.style.transformOrigin="top";
                }
            });
        },
        initData(){
            let id=this.$route.params.id;
            console.log(id)
            let url=`https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&hostUin=0&needNewCode=0&platform=yqq&order=listen&begin=0&num=80&songstatus=1&singermid=${id}`;
            this.$jsonp(url,{param:"jsonpCallback"},(err,data)=>{
                console.log(data)
                this.singerName=data.data.singer_name;
                this.list=data.data.list;
            });
        },
        initSongVkey(){
            // 通过服务器代理的方式拿到数据
            let url=`/vkey/music/api/getPurlUrl`;
            this.$axios.post(url,(err,data)=>{
                console.log(err,data)
            }).then((data)=>{
                console.log(data)
            });
        },
        goPlayer(index){
            // this.$store.commit("setSongList",this.list);
            // this.$store.commit("setCurrentIndex",index);
            this.$store.dispatch("addSongList",{list:this.list,index:index});
        }
    },
    computed: {
        bgImage(){
            let id=this.$route.params.id;
            return `background-image: url("https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000");`;
        }
    },
    created() {
        this.initData();
        // this.initSongVkey();
    },
    mounted() {
        this.initBS();
    },
}
</script>
<style lang="less">
@import "~style/index.less";
@import "~font/iconfont.css";
.detail{
    position: fixed;
    top: 0;bottom: 0;
    left: 0;right: 0;
    margin: auto;
    z-index: 3;
    background-color: @bg;
    .header{
        .w(375);
        .h(40);
        text-align: center;
        position: absolute;
        z-index: 9;
        >span{
            position: absolute;
            top: 0;
            .left(5);
            .w(40);
            .l_h(40);
            text-align: center;
            font-size: 28px;
            color: @fc-yellow;
        }
        >p{
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            text-align: center;
            .l_h(40);
            font-size: @fs-l;
            color: #fff;
        }
    }
    .img{
        .w(375);
        .h(262);
        background-size: cover;
        position: relative;
        z-index: 2;
        div{
            width: 100%;
            height: 100%;
            background-color: rgba(7,17,27,.4);
            .play{
                .w(135);
                .h(32);
                border: 1px solid @fc-yellow;
                margin: auto;
                border-radius: 100px;
                position: absolute;
                .top(210);
                left: 0;right: 0;
                background-color: transparent;
                color: @fc-yellow;
                display: flex;
                justify-content: center;
                align-items: center;
                span{
                    font-size: @fs-xs;
                }
                .icon-bofang{
                    font-size: @fs-xl;
                    .margin_r(5);
                }
            }
        }
    }
    .songList{
        .w(375);
        // overflow: hidden;
        position: fixed;
        z-index: 3;
        .top(262);
        bottom: 0;
        ul{
            background-color: @bg;
            .padding(20,30,20,30);
            li{
                overflow: hidden;
                .h(64);
                h2{
                    font-weight: normal;
                    font-size: @fs-s;
                    color: #fff;
                    .margin_t(15);
                    // 一行显示，超出部分显示省略号
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }
                p{
                    font-size: @fs-s;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    margin-top: 4px;
                    color: hsla(0,0%,100%,.3);
                    .l_h(20);
                }
            }
        }
    }
}
</style>