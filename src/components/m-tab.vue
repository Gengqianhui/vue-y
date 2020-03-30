<template>
    <div class="m-tab">
        <ul>
            <router-link to="/recommend" tag="li" activeClass="active">
                <a>推荐</a>
            </router-link>
            <router-link to="/singer" tag="li" activeClass="active">
                <a>歌手</a>
            </router-link>
            <router-link to="/rank" tag="li" activeClass="active">
                <a>排行</a>
            </router-link>
            <router-link to="/search" tag="li" activeClass="active">
                <a>搜索</a>
            </router-link>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    methods: {
        
    },
};
</script>

<style scoped lang="less">
@import "~style/index.less";
.m-tab {
    .w(375);
    .h(44);
    ul{
        display: flex;
        li{
            width: 25%;
            .l_h(44);
            font-size: @fs-s;
            text-align: center;
            a{
                color: hsla(0, 0%, 100%, 0.5);
                padding-bottom: 5px;
            }
        }
        .active>a{
            color: @fc-yellow;
            border-bottom: 2px solid @fc-yellow;
        }
    }
}

</style>
