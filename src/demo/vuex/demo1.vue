<template>
    <div class="demo1">
        demo1
        {{this.$store.state.name}}
        <button @click="changeName">改名</button>
        <hr>
        {{this.$store.state.age}}

        <hr>
        {{this.$store.getters.doubleAge}}
    </div>
</template>
<script>
export default {
    data() {
        return {
            
        }
    },
    mounted() {
        console.log(this,"demo1")
    },
    methods: {
        changeName(){
            this.$store.commit("changeName");
        }
    },
}
</script>
<style lang="less">
.demo1{

}
</style>