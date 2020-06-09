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
                        width="260">
                </el-table-column>
                <el-table-column
                        prop="desc"
                        label="简介"
                        width="400"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="status"
                        label="状态"
                        show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-tooltip :content="'Switch value: ' + scope.row.status" placement="top">
                            <el-switch
                                v-model="scope.row.status"
                                :active-value="1"
                                :inactive-value="0"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                @change="changeSwitch($event, scope.row)">
                            </el-switch>
                        </el-tooltip>
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
                        :current-page="pageIndex"
                        :page-sizes="[5, 10, 15, 20]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    import {articleInfo, articleState} from "../../api/articles";

    export default {
        name: "index",
        data () {
            return {
                search: '',
                total: 0,
                tableData: [],
                pageIndex: 1,
                pageSize: 5,
                multipleSelection: []
            }
        },

        created () {
            this.getArticleList(1, 5)
        },

        methods: {
            // 获取所有文章信息
            async getArticleList (pageIndex, pageSize, search) {
                try {
                    let data = []
                    if (search) {
                        data = await articleInfo({pageIndex, pageSize, search})
                    }else{
                        data = await articleInfo({pageIndex, pageSize})
                    }
                    let {count, res} = data
                    this.total = count[0]['count(id)']
                    this.tableData = res
                } catch (e) {
                    console.log(e)
                }
            },

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

            // 修改状态
            async changeSwitch (state, data) {
                // data 开关当前值
                // b 获取的表格列数据
                let id = data.id
                let status = state
                let res = await articleState({id, status})
                if (res.code === 200) {
                    this.$notify({
                        title: '成功',
                        message: res.msg,
                        type: 'success'
                    })
                }else{
                    this.$notify.error({
                        title: '失败',
                        message: res.msg
                    })
                }
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
                this.getArticleList(this.pageIndex, val)
            },

            // 当前页码
            handleCurrentChange(val) {
                this.getArticleList(val, this.pageSize)
            }
        }
    }
</script>

<style scoped>

</style>