<template>
    <div class="num">
        数字
        <hr>
        {{this.$store.state.num}}

        {{this.$store.getters.num}}

    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less">
.num{

}
</style>