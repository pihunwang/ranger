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
                code: 'class Main{\n  int a = 10;\n}',
                result: 'Helle World!',
                submitting: false
            }
        },
        methods: {
            runCode: function () {
                let request = this.$request.SourceCompiler(this.code, 2,'2Z2yegN')
                console.log(request)
                this.submitting = true
                request.execute().then(
                    (succ)=>{
                        this.submitting = false
                        console.log(succ.data)
                    },
                    (error)=>{
                        this.submitting = false
                        console.log(error.data)
                    })
            },
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

    @import "../../assets/style/global-style";

    .editorparent {
        margin-top: 20px;
    }

    button {
        margin-right: 10px;
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
    }

    .resultarea {
        background: #000;
        color: white;
        height: 100%;
        width: 100%;
        overflow: scroll;
    }
</style>