<template>
    <div>
        <el-card>
            <el-row>
                <el-col :span="24">
                    <el-input placeholder="请输入内容"
                              maxlength="20"
                              show-word-limit
                              v-model="title">
                        <template slot="prepend">标题</template>
                    </el-input>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-input type="text"
                              placeholder="请输入内容"
                              maxlength="50"
                              show-word-limit
                              v-model="desc">
                        <template slot="prepend">简介</template>
                    </el-input>
                </el-col>
            </el-row>
            <el-row>
                <quillEditor v-model="content" ref="myQuillEditor" :options="editorOption" class="editor">
                </quillEditor>
            </el-row>
        </el-card>
        <el-row type="flex" style="margin-top: 10px" justify="center" align="center">
            <el-col :span="3">
                <el-button type="primary">保存草稿</el-button>
            </el-col>
            <el-col :span="3">
                <el-button type="success">发表文章</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    // require styles
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'

    import { quillEditor } from 'vue-quill-editor'
    import { addQuillTitle } from '@/utils/quill-title.js'

    export default {
        name: "Home",
        components: {
            quillEditor
        },

        data() {
            return {
                title: '',
                desc: '',
                content: '',
                editorOption: {
                    placeholder: "请输入"
                }
            }
        },

        mounted() {
            addQuillTitle();
        },

        methods () {
        }
    }
</script>

<style scoped>
    .el-card{
        height: 90vh;
    }
    .editor{
        height: calc(90vh - 100px);
    }
</style>