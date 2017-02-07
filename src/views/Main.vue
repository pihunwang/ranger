<template>
    <div>
        <div class="topbar">
            <img class="logo" src="../assets/images/logo.png">
            <div class="title">Java在线编译器</div>
            <div id="empty"></div>
            <div id="username">欢迎您，{{account.user.name}}</div>
            <el-button id="logoff" size="small" @click="logoff" type="primary">退出登陆</el-button>
        </div>
        <div class="bottomconetent">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                msg: 'hello vue'
            }
        },
        computed: {
            account(){
                return {
                    user: {
                        name: '西瓜'
                    }
                }
            }
        },
        methods: {
            logoff: function () {

            }
        }
    }

</script>

<style lang="scss" rel="stylesheet/scss" scoped>

    @import "../assets/style/base-value";

    .topbar {
        height: 64px;
        width: 100%;
        background: rgb(31, 47, 61);
        line-height: 64px;
        display: flex;
        align-items: center;

        .logo {
            margin: 0 0px 5px 20px;
            height: 44px;
            width: 44px;
        }

        .title {
            margin-left: 12px;
            display: inline-block;
            font-size: $textsize-title-big;
            color: rgba(255, 255, 255, .7);
            line-height: 64px;
            font-weight: 900;
        }

        #empty {
            flex-grow: 1;
        }

        #username {
            color: rgba(255, 255, 255, .8);
        }

        #logoff {
            margin: 0 20px;
        }
    }

    .bottomconetent {
        height: calc(100vh - 64px);
        background: white;
        overflow: scroll;
    }

</style>