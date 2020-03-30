<template>
    <div class="demo3">
        demo3
        <button @click="changeName">改名</button>
    </div>
</template>
<script>
export default {
    methods: {
        changeName(){
            // setTimeout(() => {
            //     let name="二狗子";
            //     this.$store.commit("changeName",{name:name})
            // }, 500);

            this.$store.dispatch("changeNameAction",{name:"二狗子"});
        }
    },
}
</script>
<style lang="less">
.demo3{

}
</style>