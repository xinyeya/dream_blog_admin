<template>
    <div>
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#D3DCE6"
            router>
        <el-menu-item index="/">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">发表文章</span>
        </el-menu-item>
        <el-menu-item index="/article">
            <i class="el-icon-document"></i>
            <span slot="title">文章管理</span>
        </el-menu-item>
        <el-menu-item index="/class">
            <i class="el-icon-menu"></i>
            <span slot="title">分类管理</span>
        </el-menu-item>
        <el-menu-item index="/music">
            <i class="el-icon-service"></i>
            <span slot="title">音乐管理</span>
        </el-menu-item>
    </el-menu>
    </div>
</template>

<script>
    export default {
        name: "aside"
    }
</script>

<style scoped>

</style>