<template>
  <div id="app">
      <MHeader></MHeader>
      <MTab></MTab>
      <!-- 
        <component :is="components"></component>
        component标签开辟空间，本身不渲染，也可以写成div标签，但是最好写成component标签，好区分
      -->
      <!-- <component :is="components"></component> -->
      <!-- <Recommend></Recommend> -->
      <router-view></router-view>
      <Player></Player>
  </div>
</template>

<script>
import MHeader from "components/m-header.vue";
import MTab from "components/m-tab.vue";
import Recommend from "pages/Recommend.vue";
import Singer from "pages/Singer.vue";
import Player from "pages/Player.vue";
export default {
    data() {
        return {
            components:"Recommend"
        }
    },
    components:{MHeader,MTab,Recommend,Singer,Player}
}
</script>

<style lang="less">
@import "~style/index.less";
#app{
    // background-color: @bg;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
// 声明变量
// @color:yellow;
// .w(@px){
//     // width: (@px/37.5)rem;
//     width: unit(@px/37.5,rem);// unit(xx,rem)   给xx加上rem单位
// }
// // Mixins混入，@param是参数
// .wql(@param,@param1){
//     // width: (375/37.5)rem;
//     .w(375);
//     height: 200px;
//     background-color: @param;
//     border: 5px solid @param1;
// }
// #app {
//     .wql(blue,green);
//     // 嵌套
//     p{
//         // width: 93px;
//         .w(100);
//         color: deeppink;
//         background-color: deepskyblue;
//     }
// }
</style>
