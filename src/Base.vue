<template>
    <div>
        <router-view></router-view>
        <div style="position: fixed;width:100px;text-align:center;top: 0;margin-left: calc(50% - 50px);background-color: #5e7cff;color: white"
             v-if="isProdEnv==false">开发环境
        </div>
    </div>
</template>

<script>
    export default{
        computed: {
            isProdEnv(){
                return true
            },
        },
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

    @import "assets/style/base-value";
    @import "assets/style/global-style";

</style>