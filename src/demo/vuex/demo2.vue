<template>
    <div class="demo2">
        demo2
        {{this.$store.state.name}}
        <hr>
        {{age}}
        <button @click="addAge">add</button>
    </div>
</template>
<script>
export default {
    methods: {
        addAge(){
            this.$store.commit("addAge");
        }
    },
    computed: {
        age(){
            return this.$store.state.age;
        }
    },
}
</script>
<style lang="less">
.demo2{

}
</style>