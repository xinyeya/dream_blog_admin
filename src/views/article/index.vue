<template>
    <div>
        <el-card>
<!--            搜索-->
            <el-row style="margin-bottom: 10px" type="flex" justify="space-between" align="center">
                <el-col :span="6">
                    <el-button type="danger" v-if="multipleSelection.length == 0" disabled>全部删除</el-button>
                    <el-button type="danger" v-else @click="handleSearch">全部删除</el-button>
                </el-col>
                <el-col :span="6">
                    <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
                    </el-input>
                </el-col>
            </el-row>
<!--            表格-->
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    border
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
                        sortable
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="title"
                        label="标题"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="desc"
                        label="简介"
                        width="261"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="com_num"
                        label="评论数量"
                        sortable
                        width="120"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="praise_num"
                        label="赞数量"
                        sortable
                        width="120"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="common_status"
                        label="评论权限"
                        width="100"
                        show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-switch
                            v-model="scope.row.common_status"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="130"
                        show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleEditArticle(scope.row.id)" circle></el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDelArticle(scope.row.id)" circle></el-button>
                    </template>
                </el-table-column>
            </el-table>
<!--            分页-->
            <el-row style="margin-top: 10px" type="flex" justify="end" align="center">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[5, 10, 15, 20]"
                        :page-size="5"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="40">
                </el-pagination>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "index",
        data () {
            return {
                search: '',
                tableData: [
                    {
                        id: 1,
                        title: '测试标题1',
                        desc: '测试简介1',
                        com_num: 1,
                        praise_num: 1,
                        common_status: true
                    },
                    {
                        id: 2,
                        title: '测试标题2',
                        desc: '测试简介2',
                        com_num: 2,
                        praise_num: 2,
                        common_status: false
                    }
                ],
                currentPage: 0,
                multipleSelection: []
            }
        },
        methods: {
            // 跳转修改页面
            handleEditArticle (id) {
                console.log('跳转修改页面'+id)
            },

            // 删除文章
            handleDelArticle (id) {
                console.log(id)
                this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
            },

            // 搜索文章
            handleSearch () {
                console.log(this.search)
            },

            // 选中的数据
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            // 每页多少条数据
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },

            // 当前页码
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        }
    }
</script>

<style scoped>

</style>