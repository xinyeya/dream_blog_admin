<template>
    <div>
<!--        页面-->
        <el-card>
<!--            添加&&搜索-->
            <el-row type="flex" justify="space-between" align="center">
                <el-col :span="3">
                    <el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
                </el-col>
                <el-col :span="5">
                    <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
                    </el-input>
                </el-col>
            </el-row>
            <el-row>
                <el-table
                        border
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%;"
                        @selection-change="handleSelectionChange">
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column
                            prop="id"
                            label="ID"
                            width="80">
                    </el-table-column>
                    <el-table-column
                            prop="title"
                            label="标题"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="singer"
                            label="歌手"
                            width="150"
                            show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                            prop="music"
                            label="直链"
                            show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="90"
                            show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    icon="el-icon-edit"
                                    circle
                                    @click="handleEdit(scope.$index, scope.row)"></el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    icon="el-icon-delete"
                                    circle
                                    @click="handleDelete(scope.$index, scope.row)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
            <el-row type="flex" justify="end" align="center">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="count">
                </el-pagination>
            </el-row>
        </el-card>
<!--        添加||修改表单-->
        <el-dialog title="添加音乐" :visible.sync="dialogFormVisible">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="封面" prop="imageUrl">
<!--                    添加上传封面接口-->
                    <el-upload
                            v-if="add"
                            class="avatar-uploader"
                            action="http://127.0.0.1:3000/admin/musics/insert"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
<!--                    更新上传封面接口-->
                    <el-upload
                            v-else
                            class="avatar-uploader"
                            action="http://127.0.0.1:3000/admin/musics/update"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="标题" prop="title">
                    <el-input v-model="ruleForm.title" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <el-form-item label="歌手" prop="singer">
                    <el-input v-model="ruleForm.singer" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <el-form-item label="直链" prop="music">
                    <el-input v-model="ruleForm.music" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @keyup.enter.native="submitForm('ruleForm')" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import {musicList, musicAdd} from "../../api/music";

    export default {
        name: "index",
        data() {
            return {
                add: true,
                tableData: [],
                imageUrl: '',
                search: '',
                multipleSelection: [],
                dialogFormVisible: false,
                currentPage: 1,
                pageSize: 10,
                count: 0,
                ruleForm: {
                    title: '',
                    singer: '',
                    music: '',
                    images: ''
                },
                formLabelWidth: '120px',
                rules: {
                    title: [
                        { required: true, message: '请输入标题', trigger: 'blur' }
                    ],
                    singer: [
                        { required: true, message: '请输入歌手', trigger: 'blur' }
                    ],
                    music: [
                        { required: true, message: '请输入链接', trigger: 'blur' }
                    ]
                }
            }
        },
        created () {
            this.getMusicList(this.currentPage, this.pageSize)
        },
        methods: {

            test(){
                alert(1)
            },

            // 获取所有音乐
            async getMusicList (pageIndex, pageSize) {
                try {
                    let data = await musicList(pageIndex, pageSize)
                    if (data) {
                        this.count = data.count[0]['count(id)']
                        this.tableData = data.res
                    }else{
                        this.$notify.error({
                            title: '失败',
                            message: data.msg
                        });
                    }
                }catch (e) {
                    console.log(e)
                }
            },

            // 提交表单数据
            async setMusicAdd () {
                try {
                    let data = await musicAdd(this.ruleForm)
                    if (data.code === 200) {
                        this.$notify({
                            title: '成功',
                            message: data.msg,
                            type: 'success'
                        });
                        this.getMusicList(this.currentPage, this.pageSize)
                    }else{
                        this.$notify.error({
                            title: '失败',
                            message: data.msg
                        });
                    }
                    this.dialogFormVisible = false
                    this.resetForm('ruleForm')
                }catch (e) {
                    console.log(e)
                }
            },

            // 点击修改
            handleEdit(index, row) {
                console.log(index, row);
            },

            // 点击删除
            handleDelete(index, row) {
                console.log(index, row);
            },

            // 多选
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            // 每页X条
            handleSizeChange(val) {
                this.getMusicList(this.currentPage,val)
            },

            // 当前是X页
            handleCurrentChange(val) {
                this.getMusicList(val,this.pageSize)
            },

            // 点击搜索
            handleSearch () {
                console.log('搜索')
            },

            // 添加音乐
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.imageUrl == '') {
                            alert('请上传封面')
                        }else{
                            this.setMusicAdd()
                        }
                    } else {
                        console.log(this.imageUrl)
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            //清空表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.imageUrl = ''
            },

            // 预览图片
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw)
            },

            // 上传图片前的检测
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }
        }
    }
</script>

<style scoped>
.el-row{
    margin: 10px 0;
}
.avatar-uploader .el-upload {
    border: 1px dashed #000000;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #000000;
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