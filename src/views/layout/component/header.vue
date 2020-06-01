<template>
    <div>
        <el-row type="flex" justify="space-between" align="center">
            <el-col :span="3">
                <img style="height: 60px;" src="@/assets/logo.png" alt="">
            </el-col>
            <el-col :span="3">
                <el-dropdown>
                    <span class="el-dropdown-link">
                        <div class="block">
                            <el-avatar :size="60" :src="circleUrl" @error="errorHandler">
                                <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                            </el-avatar>
                        </div>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                            <span @click="userinfo">个人信息</span>
                        </el-dropdown-item>
                        <el-dropdown-item>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "Header",
        data () {
            return {
                circleUrl: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            }
        },
        created () {
            this.circleUrl = this.$store.state.avatar
        },
        methods: {
            errorHandler() {
                return true
            },
            userinfo () {
                this.$router.push({path:'/user_info'})
            }
        }
    }
</script>

<style scoped>

</style>