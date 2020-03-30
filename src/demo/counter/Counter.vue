<template>
    <div class="conuter">
        <h3>计数器</h3>
        <Btn1></Btn1>
        <Btn2></Btn2>
        <Num></Num>
    </div>
</template>
<script>
import Btn1 from "./Btn1"
import Btn2 from "./Btn2"
import Num from "./Num"
export default {
    components:{Btn1,Btn2,Num}
}
</script>
<style lang="less">
.counter{

}
</style>