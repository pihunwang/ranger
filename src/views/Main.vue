<template>
    <div>
        <div class="topbar">
            <img class="logo" src="../assets/images/logo.png" @click="goToEditor">
            <div class="title" @click="goToEditor">Java在线编译器</div>
            <el-button id="logoff" size="large" @click="tutorial" type="text">Java简明教程</el-button>
            <div id="empty"></div>
            <div id="username">{{welcome}}{{account.user_name}}</div>
            <el-button id="seeSource" size="large" @click="see" type="text" v-show="visibility">查看提交记录</el-button>
            <el-button id="logoff" size="small" @click="logInOff" type="primary">{{loginoff}}</el-button>
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
                msg: 'hello vue',
                loginoff: '登录系统',
                welcome: '欢迎您，',
                visibility: false
            }
        },
        computed: {
            account(){
                let acc = this.$store.state.account
                if (acc) {
                    this.loginoff = '退出登录'
                    this.welcome = '欢迎您，'
                    this.visibility = true
                    return acc
                } else {
                    this.loginoff = '登录系统'
                    this.welcome = ''
                    this.visibility = false
                    return {}
                }
            }
        },
        methods: {
            goToEditor: function () {
                this.$router.replace({name: "editor"})
            },
            logInOff: function () {
                const acc = this.$storage.load('account')
                if (acc) {
                    this.$confirm('确定要退出登录?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'info',
                    }).then(
                        () => {
                            this.$storage.clear()
                            this.$store.commit('deleteAccount')
                            this.$storage.remove('account')
                        },
                        () => {
                        }
                    )
                } else {
                    this.$router.replace({name: "login"})
                }
            },
            tutorial: function () {
                this.$router.replace({name: "tutorial"})
            },
            see: function () {
                this.$router.replace({name: "commitrecord"})
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
            cursor: pointer;
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

        #seeSource {
            margin-left: 20px;
        }
    }

    .bottomconetent {
        height: calc(100vh - 64px - 60px);
        background: lightgoldenrodyellow;
        overflow: auto;
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