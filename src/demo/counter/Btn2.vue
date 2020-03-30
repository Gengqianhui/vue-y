<template>
    <div class="btn2">
        异步修改
        <button @click="add">异步add</button>
    </div>
</template>
<script>
export default {
    methods: {
        add(){
            this.$store.dispatch("addAction",{num:10});
        }
    },
}
</script>
<style lang="less">
.btn2{

}
</style>