<template>
    <div class="recommend">
        <div class="wrapper" ref="wrapper">
            <div class="container">
                <MBanner></MBanner>
                <h2>热门歌单推荐</h2>
                <ul class="songList">
                     <!-- -->
                    <li v-for="(item,index) in songList" :key="index" @click="goDateil(item.creator.encrypt_uin)">
                        <img :src="item.imgurl">
                        <div class="info">
                            <h2>{{item.creator.name}}</h2>
                            <p>{{item.dissname}}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
/**
 * 推荐组件
 * 
 */
import axios from "axios";
import MBanner from "components/m-banner.vue";
import BS from "better-scroll";
export default {
    components:{MBanner},
    data() {
        return {
            songList:[]
        }
    },
    methods: {
        initRecommendData(){
            // g_tk=1928093487 时间戳，保存期2天，数据加载不出来，换下这个时间戳
            let url="/hotMusicList/music/api/getDiscList?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&platform=yqq&hostUin=0&sin=0&ein=29&sortId=5&needNewCode=0&categoryId=10000000&rnd=0.03558038023620558";
            axios.get(url,(err,data)=>{
                console.log(err)
                console.log(data)
            }).then((data)=>{
                this.songList=data.data.list;
                console.log(this.songList)

            });
        },
        initBS(){
            this.BS = new BS(this.$refs.wrapper,{
                probeType:2,// 在屏幕滑动的过程中实时的派发 scroll 事件
                click:true
            });
        },
        goDateil(id){
            console.log(id)
            this.$router.push({path:`/singer/detail/${id}`});
        }
    },
    created() {
        this.initRecommendData();
    },
    mounted() {
        this.initBS();
    },
}
</script>
<style lang="less">
@import "~style/index.less";
.recommend{
    overflow: scroll;
    position: fixed;
    .top(88);
    .bottom(0);
    left: 0;right: 0;
    .wrapper{
        height: 100%;
        .container{
            >h2{
                .l_h(65);
                text-align: center;
                color: @fc-yellow;
                font-size: @fs-14;
            }
            .songList{
                li{
                    .padding(0,20,20,20);
                    display: flex;
                    align-items: center;
                    .l_h(20);
                    img{
                        .w(60);
                        .h(60);
                        .padding_r(20);
                    }
                    .info{
                        .h(50);
                        h2{
                            .margin_b(10);
                            font-size: @fs-14;
                        }
                        p{
                            color: hsla(0,0%,100%,.3);
                            font-size: @fs-14;
                        }
                    }
                }
            }
        }
    }
}
</style>