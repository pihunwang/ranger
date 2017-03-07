<template>
    <div>
        <el-table
                class="table"
                :data="data"
                border>
            <el-table-column type="expand">
                <template scope="props">
                    <div class="editorparent">
                        <code_mirror v-model="props.row.code"></code_mirror>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                    label="编号"
                    width="65">
                <template scope="scope">
                    <!--<el-popover trigger="hover" placement="top">-->
                    <!--<p>这是本站编译的第 {{ scope.row.id }} 段代码</p>-->
                    <!--<div slot="reference" class="name-wrapper">-->
                    <span style="margin-left: 6px">{{ scope.row.id }}</span>
                    <!--</div>-->
                    <!--</el-popover>-->
                </template>
            </el-table-column>
            <el-table-column
                    label="提交时间"
                    width="180">
                <template scope="scope">
                    <el-icon name="time"></el-icon>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="编译状态"
                    width="140">
                <template scope="scope">
                    <el-button
                            size="small"
                            v-bind:type="scope.row.status">{{scope.row.status === 'danger' ? '失败' : '成功'}}
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button
                            size="small"
                            @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button
                            size="small"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row,data)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import CodeMirror from '../components/CodeMirror.vue'
    export default {
        components: {
            'code_mirror': CodeMirror
        },
        data() {
            return {
                data: []
            }
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row.id);
                this.$router.replace({name: 'editor', params: {code: row.code}})
            },
            handleDelete(index, row, data) {
                console.log(index, row.id);
                this.$request.RemoveUserCode(row.id, row.uid).execute().then(
                    (succ) => {
                        this.$doui.showSuccToast(this, '删除成功')
                        data.splice(index, 1);
                    },
                    (error) => {
                        this.$doui.showErrorToast(this, error.tip)
                    })
            }
        },
        created: function () {
            const acc = this.$storage.load('account')
            let uid = 1
            if (acc !== undefined) {
                uid = JSON.parse(acc).uid
            }
            if (acc) {
                this.$request.GetUserCode(uid).execute().then(
                    (succ) => {
                        this.data = succ.data
                    },
                    (error) => {
                        this.$doui.showErrorToast(this, error.tip)
                    })
            } else {
                console.log('not acc')
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

    .table {
        width: 100%;
    }

</style>
