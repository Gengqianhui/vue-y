<template>
    <div class="m-header">
        <img src="../assets/musicLogo.png">
        <span>Chicken Music</span>
    </div>
</template>

<script>
export default {};
</script>

<style lang="less">
@import "~style/index.less";
.m-header {
    .w(375);
    .h(44);
    color: @fc-yellow;
    font-size: @fs-l;
    // text-align: center;
    .l_h(44);
    display: flex;
    justify-content: center;
    align-items: center;
    img{
        .w(30);
        .h(32);
        margin-right: 9px;
    }
}
</style>
