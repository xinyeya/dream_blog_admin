<template>
    <div class="back">
<!--        修改个人信息-->
        <el-card v-if="showEdit">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="头像">
                    <el-upload
                            class="avatar-uploader"
                            action="http://127.0.0.1:3000/admin/users/update"
                            :headers="headers"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="imgurl" :src="imgurl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="昵称" prop="username">
                    <el-input v-model="ruleForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="QQ">
                    <el-input v-model="ruleForm.qq"></el-input>
                </el-form-item>
                <el-form-item label="简介">
                    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">保存信息</el-button>
                    <el-button @click="resetForm('ruleForm')">取消保存</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <div v-if="!showEdit" class="userinfo">
            <el-row>
                账号：{{ruleForm.username}}
            </el-row>
            <el-row>
                QQ：{{ruleForm.qq}}
            </el-row>
            <el-row>
                文章数量：{{ruleForm.a_num}}
            </el-row>
            <el-row>
                获赞：{{ruleForm.p_num}}
            </el-row>
            <el-row>
                阅读量：{{ruleForm.h_num}}
            </el-row>
            <el-row>
                个性签名：{{ruleForm.desc}}
            </el-row>
            <el-row type="flex" justify="center" align="center">
                <el-col :span="3">
                    <el-button type="primary" @click="handleShowEdit">修改信息</el-button>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import {userdetail, useredit} from "../../api/users";
    import {getStorage, saveStorage} from "../../utils/storge";

    export default {
        name: "userInfo",
        data () {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                showEdit: false,
                imgurl: '',
                ruleForm: {
                    avatar: '',
                    username: '',
                    password: '',
                    checkPass: '',
                    qq: '',
                    desc: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入昵称', trigger: 'blur' }
                    ],
                    password: [
                        // { required: true, message: '请输入密码', trigger: 'blur' },
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        // { required: true, message: '请输入密码', trigger: 'blur' },
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    sex: [
                        { required: true, message: '请选择性别', trigger: 'change' }
                    ]
                },
                href: ''
            }
        },

        created(){
            this.getUserInfo()
        },

        computed: {
            headers() {
                return{
                    "authorization": "Bearer " + getStorage('token') // 直接从本地获取token就行
                }
            }
        },

        methods: {
            // 获取用户信息
            async getUserInfo () {
                try{
                    let data = await userdetail()
                    this.ruleForm = data[0]
                    this.imgurl = data[0].avatar
                    this.$store.commit('setAvatar', data[0].avatar)
                    saveStorage('avatar', data[0].avatar)
                }catch (e) {
                    console.log(e)
                }
            },

            // 修改用户信息
            async userEdit () {
                try {
                    let data = await useredit(this.ruleForm)
                    if (data.code == 200) {
                        this.$notify({
                            title: '成功',
                            message: data.msg,
                            type: 'success'
                        });
                    }
                    this.$router.go(0)
                    this.resetForm()
                }catch (e) {
                    console.log(e)
                }
            },

            // 显示修改的页面
            handleShowEdit () {
                this.showEdit = true
            },

            // 提交编辑后的数据
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.userEdit()
                        // this.showEdit = false
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            // 重置表单
            resetForm() {
                this.showEdit = false
            },

            // 图片上传后的预览
            handleAvatarSuccess(res, file) {
                this.imgurl = URL.createObjectURL(file.raw);
            },

            // 图片上传前的检测
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
    .el-select .el-input {
        width: 130px;
    }
    .input-with-select .el-input-group__prepend {
        background-color: #fff;
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
    .back{
        height: 100%;
        background: url("../../assets/back_login.jpg");
        background-size: 100% 100%;
        background-position: center center;
        overflow: auto;
    }
    .userinfo{
        margin: 100px auto;
        width: 500px;
        height: 300px;
        background-color: #ffffff;
        opacity: 0.8;
        line-height: 28px;
        text-align: center;
        padding: 10px 0px;
    }
</style>