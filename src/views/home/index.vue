<template>
    <div>
        <el-card>
            <el-row type="flex" justify="space-aroun" align="center">
                <el-col :span="3">
                    <el-button type="primary">保存草稿</el-button>
                </el-col>
                <el-col :span="3">
                    <el-button type="success">发表文章</el-button>
                </el-col>
            </el-row>
            <el-row>
                <quillEditor v-model="content" ref="myQuillEditor" :options="editorOption" class="editor">
                </quillEditor>
            </el-row>
        </el-card>
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
        height: calc(80vh - 100px);
    }
</style>