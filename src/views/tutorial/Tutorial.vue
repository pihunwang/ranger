<template>
    <div id="container">
        <div id="left">
            <el-col :span="8" id="menu">
                <el-menu default-active="1" class="el-menu-vertical-demo" @select="handleSelect">
                    <el-submenu v-for="chapter in chapters" v-bind:index="chapter.index">
                        <template slot="title">{{chapter.chapter_name}}</template>
                        <el-menu-item v-for="title in chapter.titles" v-bind:index="title.title_id">
                            {{title.article_title}}
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-col>
        </div>
        <table id="line">
            <tr>
                <td valign="top"></td>
            </tr>
        </table>
        <div id="right">
            <div v-html="compiledMarkdown"></div>
            <el-button id="tryIt" size="small" @click="toEditor" type="primary">去试试</el-button>
        </div>
    </div>
</template>

<script>
    import marked from 'marked'
    import highlight from 'highlight.js'
    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        highlight: function (code) {
            return highlight.highlightAuto(code).value;
        }
    });
    export default{
        components: {
            'marked': marked
        },
        data(){
            return {
                article: 'Hello world!',
                chapters: []
            }
        },
        computed: {
            compiledMarkdown: function () {
                return marked(this.article, {sanitize: true})
            }
        },
        methods: {
            handleSelect(index) {
                this.$request.GetArticle(index).execute().then(
                    (succ) => {
                        this.article = succ.data.content
                    },
                    (error) => {
                        this.$doui.showErrorToast(this, error.tip)
                    })
            },
            toEditor(){
                this.$router.replace({name: "editor"})
            }
        }, created: function () {
            // `this` 指向 vm 实例
            this.$request.GetCatalog().execute().then(
                (succ) => {
                    this.chapters = succ.data
                },
                (error) => {
                    this.$doui.showErrorToast(this, error.tip)
                })
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

    #container{
        overflow: hidden;
    }

    #menu {
        width: 300px;
    }

    .el-menu-vertical-demo {
        height: calc(100vh - 64px - 60px);
        overflow: scroll;
        background: transparent;
    }

    #right {
        height: calc(100vh - 64px - 60px);
        padding-left: 20px;
        padding-right: 20px;
        overflow: scroll;
    }

    #line {
        position: absolute;
        margin-left: 300px;
        height: calc(100vh - 64px - 60px);
        border-color: #000000;
        border-left-style: solid;
        border-width: 1px
    }

    #tryIt {
        margin-top: 20px;
    }

</style>