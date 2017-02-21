<template>
    <div>
        <div class="editorparent">
            <code_mirror v-model="code"></code_mirror>
        </div>
        <el-row type="flex" class="row-bg" justify="end">
            <el-button type="primary" :loading="submitting" @click="runCode">运行</el-button>
        </el-row>
        <div class="resultparent">
            <textarea class="resultarea" disabled>{{result}}</textarea>
        </div>
    </div>
</template>

<script>
    import CodeMirror from '../components/CodeMirror.vue'
    export default {
        components: {
            'code_mirror': CodeMirror
        },
        data(){
            return {
                code: 'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello World!");\n  }\n}',
                result: '',
                submitting: false
            }
        },
        methods: {
            runCode: function () {
                const acc = this.$storage.load('account')
                let uid = 1
                if (acc) {
                    uid = acc.uid
                }
                let request = this.$request.SourceCompiler(this.code, 2)
                console.log(request)
                this.submitting = true
                request.execute().then(
                    (succ) => {
                        this.submitting = false
                        console.log(succ)
                        this.result = succ.data
                    },
                    (error) => {
                        this.submitting = false
                        console.log(error)
                        if (error.sn === 3001) {
                            // 编译错误
                            this.result = error.data
                        } else {
                            this.$doui.showErrorToast(this, error.tip)
                            //未知错误
                            this.result = error.data
                        }
                    })
            },
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

    @import "../../assets/style/global-style";

    .editorparent {
        margin-top: 25px;
        margin-left: 20px;
        margin-right: 20px;
    }

    button {
        margin-right: 20px;
        margin-top: 10px;
    }

    body {
        background: transparent;
        color: white;
    }

    .resultparent {
        padding: 15px;
        border-radius: 5px;
        margin-top: 10px;
        overflow: hidden;
        height: 165px;
        background: black;
        margin-left: 20px;
        margin-right: 20px;
    }

    .resultarea {
        background: #000;
        color: white;
        height: 100%;
        width: 100%;
        overflow: scroll;
    }
</style>