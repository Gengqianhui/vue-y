<template>
    <div class="scrollBar">
        <span>{{startTime}}</span>
        <div class="wrapper" @click="clickDarg" ref="wrapper">
            <div class="container" ref="container">

            </div>
        </div>
        <span>{{endTime}}</span>
    </div>
</template>
<script>
export default {
    data() {
        return {
            
        }
    },
    props:{
        "current":{type:Number,default:0},
        "duration":{type:Number,default:0},
    },
    computed: {
        startTime(){
            let m=parseInt(this.current/60);
            let s=parseInt(this.current)%60;
            if(s<10){
                s="0"+s;
            }
            return `${m}:${s}`;
        },
        endTime(){
            let m=parseInt(this.duration/60);
            let s=parseInt(this.duration)%60;
            if(s<10){
                s="0"+s;
            }
            return `${m}:${s}`;
        }
    },
    watch: {
        current(newValue,oldValue){
            let percentage=(newValue/this.duration)*100;
            this.$refs.container.style.width=`${percentage}%`;
        }
    },
    methods: {
        clickDarg(e){
            let percentage=(e.offsetX/this.$refs.wrapper.clientWidth)*100;
            this.$refs.container.style.width=`${percentage}%`;
            // 派发jump事件给Player.vue
            this.$emit("jump",percentage);
        }
    },
}
</script>
<style lang="less">
@import "~style/index.less";
.scrollBar{
    width: 80%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    span{
        font-size: @fs-12;
        .l_h(30);
        .w(30);
        text-align: left;
    }
    span:last-child{
        text-align: right;
    }
    .wrapper{
        .h(4);
        flex: 1;
        background-color:rgba(0,0,0,.3);
        .container{
            width: 0;
            .h(4);
            background-color: @fc-yellow;
        }
    }
}
</style>