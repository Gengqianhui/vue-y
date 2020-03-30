<template>
    <div class="singer">
        <transition name="slide">
            <router-view></router-view>
        </transition>
        <div class="wrapper" ref="wrapper">
            <ul class="container">
                <li 
                    v-for="(item,index) in singerList" 
                    :key="index"
                    :ref="item.title"
                >
                    <h2>{{item.title}}</h2>
                    <ol>
                        <li 
                            v-for="(info,infoIndex) in item.items"
                            :key="infoIndex"
                            @click="goDetail(info.Fsinger_mid)"
                        >
                            <img :src="info.avatar">
                            <span>{{info.Fsinger_name}}</span>
                        </li>
                    </ol>
                </li>
            </ul>
        </div>
        <ul class="slider" @touchstart="start" @touchmove="move">
            <li 
                v-for="(item,index) in sliderData" 
                :key="index"
                @click="jump(item)"
            >
                <span v-if="item=='热门'" :class="active===item?'active':''" ref="span">热</span>
                <span v-else :class="active===item?'active':''">{{item}}</span>
            </li>
        </ul>
    </div>
</template>
<script>
/**
 * 歌手组件
 * 
 */
import BS from "better-scroll";
export default {
    components:{},
    data() {
        return {
            singerList:[],
            active:"热门"
        }
    },
    methods: {
        initBS(){
            this.BS = new BS(this.$refs.wrapper,{
                probeType:2,// 在屏幕滑动的过程中实时的派发 scroll 事件
                click:true
            });
            this.BS.on("scroll",(obj)=>{
                let y=Math.abs(obj.y),activeIndex="";
                for(var i=0;i<this.arr.length;i++){
                    if(y>=this.arr[i] && y<this.arr[i+1]){
                        activeIndex=i;
                        break;
                    }
                    if(i==this.arr.length-1){
                        activeIndex=i;
                    }
                }
                this.active=this.sliderData[activeIndex];
            });  
        },
        initSingerData(){
            let url="https://c.y.qq.com/v8/fcg-bin/v8.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&channel=singer&page=list&key=all_all_all&pagesize=100&pagenum=1&hostUin=0&needNewCode=0&platform=yqq";
            this.$jsonp(url,{param:"jsonpCallback"},(err,data)=>{
                this.singerList=this.optimizeData(data.data.list);
            });
        },
        /**
         * 
         * 优化数据
         *  Farea: "3"
            Fattribute_3: "0"
            Fattribute_4: "0"
            Fgenre: "0"
            Findex: "A"
            Fother_name: "艾伦·沃克"
            Fsinger_id: "944940"
            Fsinger_mid: "0020PeOh4ZaCw1"
            Fsinger_name: "Alan Walker (艾伦·沃克)"
            Fsinger_tag: ""
            Fsort: "6"
            Ftrend: "1"
            Ftype: "0"
            voc: "0"
         * 
         */
        optimizeData(data){
            let singerData={
                "hot":{
                    title:"热门",
                    items:[]    // 存放歌手信息
                }
            }
            for(let i=0;i<data.length;i++){
                // 剔除无效数据一：只保留data[i]中的Findex、Fsinger_mid、Fsinger_name、avatar。定义一个对象singerInfo，替代原来的data[i]添加到items中
                let singerInfo={
                    Findex:data[i].Findex,
                    Fsinger_mid:data[i].Fsinger_mid,
                    Fsinger_name:data[i].Fsinger_name,
                    avatar:`https://y.gtimg.cn/music/photo_new/T001R300x300M000${data[i].Fsinger_mid}.jpg?max_age=2592000`
                }
                if(i<20){
                    singerData.hot.items.push(singerInfo);
                }
                // 首字母，判断singerData中有没有key值为A的一项，有就往其中的items中追加data中属于A的数据；如果没有A，就创建temp为{title:A,items:[]}，再把属于A的数据添加进去。依次类推，到Z
                let Findex=data[i].Findex;
                if(singerData[Findex]){
                    singerData[Findex].items.push(singerInfo);
                }else{
                    let temp={title:Findex,items:[]};
                    temp.items.push(singerInfo);
                    singerData[Findex]=temp;
                }
            }

            // 剔除无效数据二：声明hot和arrs数组分别存放热门和A-Z的数据，把其他的数据（title为9的数据等）剔除
            let hot=[],arrs=[];
            for (const key in singerData) {
                if(key=="hot"){
                    hot.push(singerData[key])
                }else if(key.match(/[a-zA-Z]/)){
                    arrs.push(singerData[key])
                }
            }

            // 首字母排序：根据title的Unicode编码排序
            let newArr=arrs.sort((a,b)=>{
                return a.title.charCodeAt()-b.title.charCodeAt();
            })

            // 返回出去
            return hot.concat(newArr);
        },
        jump(item){
            let targetDom=this.$refs[item][0];
            this.BS.scrollToElement(targetDom);
            this.active=item;
        },
        start(e){
            this.startY=e.touches[0].clientY;
            this.spanHeight=this.$refs.span[0].offsetHeight;
            // console.log("开始",this.startY)
            this.startIndex=parseInt((this.startY-148)/this.spanHeight);
        },
        move(e){
            let moveY=e.touches[0].clientY;
            let distance=parseInt((moveY-this.startY)/this.spanHeight);
            // 边界判断
            distance=distance+this.startIndex;
            if(distance>=this.sliderData.length){
                distance=this.sliderData.length-1;
            }else if(distance<=0){
                distance=0;
            }
            let Findex=this.sliderData[distance];
            this.jump(Findex);
            // console.log("移动",moveY,"几格子:"+distance,"下标："+Findex)
        },
        distanceArr(){
            let arr=[];
            for(let i=0;i<this.sliderData.length;i++){
                let y=this.$refs[this.sliderData[i]][0].offsetTop;
                arr.push(y);
            }
            this.arr=arr;
        },
        goDetail(id){
            // console.log(id)
            this.$router.push({path:`/singer/detail/${id}`});
        }
    },
    computed: {
        sliderData(){
            let sliderData=[];
            for(let i=0;i<this.singerList.length;i++){
                sliderData.push(this.singerList[i].title);
            }
            return sliderData;
        }
    },
    watch: {
        sliderData(newValue,oldValue){
            setTimeout(()=>{
                this.distanceArr()
            },17)// 17ms？浏览器每分钟刷新60次，每次耗时0.017ms
        }
    },
    created() {
        this.initSingerData();
    },
    mounted() {
        this.initBS();
    },
}
</script>
<style lang="less">
@import "~style/index.less";
// @import "../assets/animate.min.css";
.singer{
    position: fixed;
    .top(88);
    .bottom(0);
    .left(0);
    .right(0);
    display: flex;
    align-items: center;
    .wrapper{
        position: fixed;
        .top(88);
        bottom: 0;
        left: 0;
        right: 0;
        overflow: hidden;
        .container{
            li{
                h2{
                    .l_h(30);
                    .padding(0,0,0,20);
                    font-size:@fs-xs;
                    color: hsla(0,0%,100%,.5);
                    background: #333;
                    font-weight: normal;
                }
                ol{
                    .padding_b(20);
                    li{
                        display: flex;
                        align-items: center;
                        .padding(20,0,0,30);
                        box-sizing: border-box;
                        .w(375);
                        .h(70);
                        font-size: @fs-s;
                        >img{
                            .w(50);
                            .h(50);
                            border-radius: 50%;
                        }
                        >span{
                            color: hsla(0,0%,100%,.5);
                            .margin_l(20);
                        }
                    }
                }
            }
            li:last-child{
                ol{
                    .padding_b(30);
                }
            }
        }
    }
    .slider{
        position: absolute;
        .right(0);
        .padding_t(20);
        .padding_b(20);
        background-color: rgba(0,0,0,.3);
        border-radius: 10px;
        font-size: @fs-xs;
        span{
            display: block;
            .w(20);
            .l_h(20);
            text-align: center;
            color: hsla(0,0%,100%,.5);
        }
        .active{
            color: @fc-yellow;
        }
    }
    .slide-enter{
        transform: translate(100vw);
    }
    .slide-enter-active{
        transition: transform 0.5s;
    }
    .slide-enter-to{
        transform: translate(0);
    }
    .slide-leave{
        transform: translate(0);
    }
    .slide-leave-active{
        transition: transform 0.5s;
    }
    .slide-leave-to{
        transform: translate(100vw);
    }
}
</style>