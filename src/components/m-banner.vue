<template>
    <div class="m-banner">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div 
                class="swiper-slide"
                v-for="(item,index) in lists"
                :key="index"
                >
                    <a :href="item.linkUrl">
                        <img :src="item.picUrl">
                    </a>
                </div>
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>
        </div>
    </div>
</template>

<script>
/*
使用swiper制作轮播图：
    1、下载插件：npm install swiper
    2、引入swiper：import Swiper from "swiper";
*/
import Swiper from "swiper";
import jsonp from "jsonp";
import axios from "axios";
export default {
    data() {
        return {
            lists:[],
        }
    },
    methods: {
        initBanner(){
            var mySwiper = new Swiper('.swiper-container', {
                        // direction: 'vertical', // 垂直切换选项
                        loop: true, // 循环模式选项
                        // 如果需要分页器
                        pagination: {
                            el: '.swiper-pagination',
                        },
                        autoplay: {
                            disableOnInteraction: false, //手动滑动之后不打断播放
                            delay: 2000
                        },
                    })
        }
    },
    created() {
        /*
            jsonp方式
        */
        // let url="https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&platform=h5&uin=0&needNewCode=1";
        // jsonp(url,{param:"jsonpCallback"},(err,data)=>{
        //     this.lists=data.data.slider;
        //     this.$nextTick(()=>{
        //         this.initBanner();
        //     });
        // });

        /*
            axios方式
        */
        let url=`/banner/music/api/getTopBanner?g_tk=1928093487&inCharset=utf8&outCharset=utf-8&notice=0&format=json&platform=yqq.json&hostUin=0&needNewCode=0&-=recom8686009718658545&data=%7B%22comm%22:%7B%22ct%22:24%7D,%22category%22:%7B%22method%22:%22get_hot_category%22,%22param%22:%7B%22qq%22:%22%22%7D,%22module%22:%22music.web_category_svr%22%7D,%22recomPlaylist%22:%7B%22method%22:%22get_hot_recommend%22,%22param%22:%7B%22async%22:1,%22cmd%22:2%7D,%22module%22:%22playlist.HotRecommendServer%22%7D,%22playlist%22:%7B%22method%22:%22get_playlist_by_category%22,%22param%22:%7B%22id%22:8,%22curPage%22:1,%22size%22:40,%22order%22:5,%22titleid%22:8%7D,%22module%22:%22playlist.PlayListPlazaServer%22%7D,%22new_song%22:%7B%22module%22:%22newsong.NewSongServer%22,%22method%22:%22get_new_song_info%22,%22param%22:%7B%22type%22:5%7D%7D,%22new_album%22:%7B%22module%22:%22newalbum.NewAlbumServer%22,%22method%22:%22get_new_album_info%22,%22param%22:%7B%22area%22:1,%22sin%22:0,%22num%22:10%7D%7D,%22new_album_tag%22:%7B%22module%22:%22newalbum.NewAlbumServer%22,%22method%22:%22get_new_album_area%22,%22param%22:%7B%7D%7D,%22toplist%22:%7B%22module%22:%22musicToplist.ToplistInfoServer%22,%22method%22:%22GetAll%22,%22param%22:%7B%7D%7D,%22focus%22:%7B%22module%22:%22QQMusic.MusichallServer%22,%22method%22:%22GetFocus%22,%22param%22:%7B%7D%7D%7D`;
        axios.get(url,(err,data)=>{
            
        }).then((res)=>{
            this.lists=res.data.slider;
            this.$nextTick(()=>{
                this.initBanner();
            });
        })
    },
    mounted() {
        
    },
};
</script>

<style lang="less">
@import "../../node_modules/swiper/css/swiper.min.css";
@import "~style/index.less";
.m-banner {
    .swiper-container{
        .w(375);
        .h(150);
        img{
            width: 100%;
            height: 100%;
        }
        .swiper-pagination{
            .swiper-pagination-bullet{
                opacity: 0.5;
            }
            .swiper-pagination-bullet-active{
                width: 16px;
                border-radius: 8px;
                background-color: #fff;
                opacity: 0.8;
            }
        }
    }
}
</style>
