<template>
    <div class="transitionBox">
        <h3>动画demo</h3>
        <button @click="toggle">toggle</button>
        <transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
            <div class="div" v-if="state">

            </div>
        </transition>
    </div>
</template>
<script>
export default {
    data() {
        return {
            state:true
        }
    },
    methods: {
        toggle(){
            this.state=!this.state;
        }
    },
}
</script>
<style lang="less">
@import "../../assets/animate.min.css";
.transitionBox{
    .div{
        width: 200px;
        height: 200px;
        background-color: red;
    }
    // .fade-enter{
    //     opacity: 0;
    // }
    // .fade-enter-active{
    //     transition: opacity 2s;
    // }
    // .fade-enter-to{
    //     opacity: 1;
    // }
    // .fade-leave{
    //     opacity: 1;
    // }
    // .fade-leave-active{
    //     transition: opacity 2s;
    // }
    // .fade-leave-to{
    //     opacity: 0;
    // }
}
</style>