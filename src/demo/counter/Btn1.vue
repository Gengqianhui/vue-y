<template>
    <div class="btn1">
        同步修改
        <button @click="add">同步add</button>
    </div>
</template>
<script>
export default {
    methods: {
        add(){
            this.$store.commit("add",{num:5})
        }
    },
}
</script>
<style lang="less">
.btn1{

}
</style>