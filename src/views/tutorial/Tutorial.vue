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
                article: '# hello\n # heihei \n## gao\n``` public class gao {\n print("ff"\n)\n}\nji```\n ## gao',
                chapters: [
                    {
                        "chapter_name": "一、Java概述",
                        "index": "1",
                        "titles": [
                            {
                                "article_title": "Java语言概述",
                                "parent_index": "1",
                                "title_id": "1-1"
                            },
                            {
                                "article_title": "Java虚拟机以及跨平台原理",
                                "parent_index": "1",
                                "title_id": "1-2"
                            },
                            {
                                "article_title": "第一个Java程序示例",
                                "parent_index": "1",
                                "title_id": "1-3"
                            }
                        ]
                    },
                    {
                        "chapter_name": "二、Java语法基础",
                        "index": "2",
                        "titles": [
                            {
                                "article_title": "Java数据类型以及变量的定义",
                                "parent_index": "2",
                                "title_id": "2-1"
                            }
                        ]
                    },
                    {
                        "chapter_name": "三、Java类与对象",
                        "index": "3",
                        "titles": []
                    }
                ]
            }
        },
        computed: {
            compiledMarkdown: function () {
                return marked(this.article)
            }
        },
        methods: {
            handleSelect(index) {
                console.log(index)
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

    #menu {
        overflow: hidden;
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

</style>