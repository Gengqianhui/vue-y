<template>
    <div class="vuexdemo">
        vuex
        <Demo1></Demo1>
        <Demo2></Demo2>
        <Demo3></Demo3>
        <hr>
        {{this.$store.getters.doubleAge}}

    </div>
</template>
<script>
import Demo1 from "./demo1.vue";
import Demo2 from "./demo2.vue";
import Demo3 from "./demo3.vue";
export default {
    components:{Demo1,Demo2,Demo3}
}
</script>
<style lang="less">
.vuexdemo{

}
</style>