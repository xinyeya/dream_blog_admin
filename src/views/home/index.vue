<template>
    <div>
        <el-card>
<!--            封面-->
            <el-row>
                <el-col :span="2">
                    封面图
                </el-col>
                <el-col :span="22">
                    <el-upload
                            class="avatar-uploader"
                            action="http://127.0.0.1:3000/admin/articles/insert"
                            :headers="headers"
                            :show-file-list="false"
                            list-type="picture"
                            :on-success="handleAvatarSuccess">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-col>
            </el-row>
<!--            标题-->
            <el-row>
                <el-col :span="24">
                    <el-input placeholder="请输入内容"
                              maxlength="20"
                              show-word-limit
                              v-model="form.title">
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
                              v-model="form.desc">
                        <template slot="prepend">简介</template>
                    </el-input>
                </el-col>
            </el-row>
<!--            标签-->
            <el-row type="flex">
                <el-col>
                    <el-button style="background-color: #F5F7FA;border-right: none;color: #909399;cursor: text;">标签</el-button>
                    <el-select style="width: 93.4%;border-left: none;" v-model="form.label_id" multiple placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.title"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
<!--            内容-->
            <el-row>
                <quillEditor v-model="form.content" ref="myQuillEditor" :options="editorOption" class="editor">
                </quillEditor>
            </el-row>
        </el-card>
        <el-row class="button" type="flex" style="margin-top: 10px" justify="center" align="center">
            <el-col :span="3">
                <el-button @click="handleTestText" type="primary">保存草稿</el-button>
            </el-col>
            <el-col :span="3">
                <el-button @click="handleArticleText" type="success">发表文章</el-button>
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

    import {articleEditShow, aricleEdit, articleText, labelsList} from "../../api/articles";
    import {getStorage} from "../../utils/storge";

    export default {
        name: "Home",
        components: {
            quillEditor
        },

        data() {
            return {
                href: '',
                imageUrl: '',
                editState: false,
                form: {
                    id: '',
                    title: '',
                    desc: '',
                    images: '',
                    content: '',
                    label_id: [],
                },
                editorOption: {
                    placeholder: "请输入文章内容..."
                },
                options: []
            }
        },

        // 获取标签内容
        created () {
            this.getLabel()
            this.editShow()
        },

        // 渲染富文本
        mounted() {
            addQuillTitle();
        },

        computed: {
            headers() {
                return{
                    "authorization": "Bearer " + getStorage('token') // 直接从本地获取token就行
                }
            }
        },

        methods: {
            // 获取分类
            async getLabel () {
                try{
                    let res = await labelsList()
                    if (res) {
                        this.options = res
                    }else{
                        this.$message({
                            showClose: true,
                            message: '数据未找到',
                            type: 'error'
                        });
                    }
                }catch (e) {
                    this.$message({
                        showClose: true,
                        message: '服务器错误',
                        type: 'error'
                    });
                }
            },

            // 保存文章
            async setArticleText (status) {
                try{
                    // 检测
                    if (!this.form.title || this.form.title == '') {
                        this.$message({
                            showClose: true,
                            message: '请输入标题',
                            type: 'warning'
                        })
                        return
                    }

                    if (!this.form.desc || this.form.desc == '') {
                        this.$message({
                            showClose: true,
                            message: '请输入简介',
                            type: 'warning'
                        })
                        return
                    }

                    if (!this.form.content || this.form.content == '') {
                        this.$message({
                            showClose: true,
                            message: '请输入文章内容',
                            type: 'warning'
                        })
                        return
                    }

                    if (!this.form.label_id || this.form.label_id == []) {
                        this.$message({
                            showClose: true,
                            message: '请选择分类标签',
                            type: 'warning'
                        })
                        return
                    }

                    if (!this.imageUrl || this.imageUrl == '') {
                        this.$message({
                            showClose: true,
                            message: '请上传封面图',
                            type: 'warning'
                        })
                        return
                    }

                    this.form.status = status

                    if (this.editState) {
                        // 修改文章内容
                        let data = await aricleEdit(this.form)
                        if (data.code === 200) {
                            this.$notify({
                                title: '成功',
                                message: data.msg,
                                type: 'success'
                            })
                            this.reset()
                        }else{
                            this.$notify.error({
                                title: '失败',
                                message: data.msg
                            })
                        }
                        this.$router.push({path: '/'});
                        this.editState = false
                    }else{
                        // 保存文章内容
                        let data = await articleText(this.form)
                        if (data.code === 200) {
                            this.$notify({
                                title: '成功',
                                message: data.msg,
                                type: 'success'
                            })
                            this.reset()
                        }else{
                            this.$notify.error({
                                title: '失败',
                                message: data.msg
                            })
                        }
                    }
                }catch(e) {
                    console.log(e)
                }
            },

            // 点击保存草稿
            handleTestText () {
                this.setArticleText(0)
            },

            // 点击发表图片
            handleArticleText () {
                this.setArticleText(1)
            },

            // 获取修改的文章的id
            async editShow () {
                if (typeof(this.$route.query.article_id) == 'number'){
                    console.log(2222)
                    this.editState = true

                    let {article_id} = this.$route.query

                    let res = await articleEditShow(article_id)

                    let data = res[0]

                    // 处理labels
                    data.label_id = data.label_id.split(',')
                    let labelArr = []
                    data.label_id.forEach(item=>{
                        labelArr.push(parseInt(item))
                    })

                    data.label_id = labelArr
                    this.imageUrl = data.images

                    // 修改数据
                    this.form = data
                }
            },

            // 清空文章内容
            reset () {
                this.form.title = ''
                this.form.desc = ''
                this.form.content = ''
                this.form.label_id = []
                this.imageUrl = ''
            },

            // 给图片转码
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            }
        }
    }
</script>

<style scoped>
    .el-card{
        padding-bottom: 60px;
    }
    .editor{
        height: 300px !important;
        margin-bottom: 10px !important;
    }
    .el-row{
        margin: 5px 0px;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>