<template>
    <div class="login">
        <div class="login-box">
<!--            标题-->
            <h2>DreamBlog</h2>
            <div class="login-input">
                <el-row type="flex" justify="center" align="center">
                    <el-col :span="20">
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                            <el-form-item label="用户名" prop="username">
                                <el-input v-model="ruleForm.username"></el-input>
                            </el-form-item>
                            <el-form-item label="密码" prop="password">
                                <el-input type="password" v-model="ruleForm.password"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                                <el-button @click="resetForm('ruleForm')">重置</el-button>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
    import {loginCheck} from "../../api/login";
    import {saveStorage} from "../../utils/storge";
    import md5 from 'js-md5';

    export default {
        name: "login",
        data() {
            return {
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            async handlelogin () {
                let password = this.ruleForm.password
                this.ruleForm.password = md5(password)
                let data = await loginCheck(this.ruleForm)
                if (data) {
                    let token = data.token
                    saveStorage('token', token)
                    saveStorage('avatar', data.avatar)
                    this.$store.commit('setAvatar', data.avatar)
                }
                this.$router.push({path: '/'});
            },

            // 登录前的验证
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.handlelogin()
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            // 重置表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style lang="less" scoped>
.login{
    height: 100vh;
    background: url("../../assets/back_login.jpg");
    background-size: 100% 100%;
    background-position: center center;
    overflow: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-box {
        width: 500px;
        height: 300px;
        background-color: #F5F7FA;
        opacity: 0.8;
        text-align: center;
    }
}
</style>