<template>
    <div class="login">

        <el-row type="flex">
            <div class="login_pictures_picture"></div>

            <div class="body">
                <div class="login-box">
                    <div class="title">
                        帐号登录
                    </div>
                    <el-input v-model="username" style="margin-top: 20px">
                        <template slot="prepend">账 号</template>
                    </el-input>

                    <el-input v-model="password" type="password" style="margin-top: 16px">
                        <template slot="prepend">密 码</template>
                    </el-input>

                    <div>
                        <el-button type="primary" :disabled="!username || !password"
                                   style="width: 300px;margin-top: 35px"
                                   @click="runLogin">登录
                        </el-button>
                    </div>
                    <div>
                        <el-button type="text" style="float:right;margin-top: 10px;">忘记密码
                        </el-button>
                    </div>
                </div>
            </div>

            <div class="footer">

            </div>

        </el-row>

    </div>
</template>

<script type="text/ecmascript-6">

    import AccountDo from '../../model/AccountDo'

    export default {
        name: 'main',
        components: {},
        data() {
            return {
                username: undefined,
                password: undefined,
            }
        },

        methods: {
            runLogin() {
                this.$request.UserLogin(this.username, this.password).execute().then(
                    (succ) => {
                        this.$storage.save('account', succ.data)
                        const account = new AccountDo(succ.data)
                        this.$store.commit('setAccount', account)
                        this.$router.replace({
                            name: 'editor',
                        })
                    },
                    (error) => {
                        this.$doui.showErrorToast(this, error.tip)
                    })
            },
        },
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

    @import "../../assets/style/base-value";

    .login {
        height: 100%;
        overflow: hidden;
    }

    .login_pictures_picture {
        background-image: url('../../assets/images/funny.jpg');
        height: 300px;
        width: 450px;
        background-repeat: no-repeat;
        margin-left: 100px;
        margin-top: 150px;
    }

    .login-box {
        right: 100px;
        position: absolute;
        border-color: black;
        margin-top: 165px;
        margin-right: 50px;
        width: 300px;

        .title {
            color: $blue-primary;
            font-size: $textsize-title;
        }

    }

</style>
