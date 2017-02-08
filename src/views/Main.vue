<template>
    <div>
        <div class="topbar">
            <img class="logo" src="../assets/images/logo.png" @click="goToEditor">
            <div class="title" @click="goToEditor">Java在线编译器</div>
            <div id="empty"></div>
            <div id="username">欢迎您，{{account.user.name}}</div>
            <el-button id="logoff" size="small" @click="logOff" type="primary">退出登陆</el-button>
        </div>
        <div class="bottomconetent">
            <router-view></router-view>
        </div>
        <div class="footer-new">
            <div>
                Powered by: <a rel="nofollow" href="http://www.ytying.com" target="_blank">kefan.wkf</a>&nbsp;&nbsp;|&nbsp;&nbsp;wkf95@qq.com
            </div>
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
            goToEditor:function(){
                this.$router.push({ name: "editor" })
            },
            logOff: function () {

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
            cursor:pointer;
        }

        .title {
            margin-left: 12px;
            display: inline-block;
            font-size: $textsize-title-big;
            color: rgba(255, 255, 255, .7);
            line-height: 64px;
            font-weight: 900;
            cursor: pointer;
        }

        #empty {
            flex-grow: 1;
        }

        #username {
            color: rgba(255, 255, 255, .8);
        }

        #logoff {
            margin: 20px;
        }
    }

    .bottomconetent {
        padding-left: 200px;
        padding-right: 200px;
        height: calc(100vh - 64px - 60px);
        background: lightgoldenrodyellow;
        overflow: scroll;
    }

    .footer-new {
        height: 60px;
        line-height: 66px;
        text-align: center;
        font-size: 13px;
        color: #929293;
        background-color: lightgoldenrodyellow;
    }

    a {
        color: #3f88bf;
        text-decoration: none;
    }

</style>