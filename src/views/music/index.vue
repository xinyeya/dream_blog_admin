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
                            prop="link"
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
                    :page-size="10"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="40">
                </el-pagination>
            </el-row>
        </el-card>
<!--        添加||修改表单-->
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="ruleForm.title"></el-input>
                </el-form-item>
                <el-form-item label="歌手" prop="singer">
                    <el-input v-model="ruleForm.singer"></el-input>
                </el-form-item>
                <el-form-item label="直链" prop="link">
                    <el-input v-model="ruleForm.link"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                tableData: [
                    {
                        id: 1,
                        title: '反语',
                        singer: 'majiko',
                        link: 'http://music.163.com/song/media/outer/url?id=31421442.mp3'
                    }
                ],
                search: '',
                multipleSelection: [],
                dialogFormVisible: false,
                currentPage: 0,
                ruleForm: {
                    title: '',
                    singer: '',
                    link: ''
                },
                formLabelWidth: '120px',
                rules: {
                    title: [
                        { required: true, message: '请输入标题', trigger: 'blur' }
                    ],
                    singer: [
                        { required: true, message: '请输入歌手', trigger: 'blur' }
                    ],
                    link: [
                        { required: true, message: '请输入链接', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
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
                console.log(`每页 ${val} 条`);
            },

            // 当前是X页
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },

            // 点击搜索
            handleSearch () {
                console.log('搜索')
            },

            // 添加音乐
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            //清空表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>
.el-row{
    margin: 10px 0;
}
</style>