<template>
    <div>
        <el-card>
<!--            标题-->
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
<!--            简介-->
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
<!--            标签-->
            <el-row type="flex">
                <el-col>
                    <el-button style="background-color: #F5F7FA;border-right: none;color: #909399;cursor: text;">标签</el-button>
                    <el-select style="width: 93.4%;border-left: none;" v-model="value" multiple placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
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
                },
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                value: [],
            }
        },

        mounted() {
            addQuillTitle();
        },

        methods: {
        }
    }
</script>

<style scoped>
    .el-card{
        height: 100vh;
        padding-bottom: 20px;
    }
    .editor{
        height: calc(80vh - 100px);
    }
    .el-row{
        margin: 5px 0px;
    }
</style>