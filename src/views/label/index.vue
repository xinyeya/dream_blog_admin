<template>
    <div>
        <el-card>
            <el-tag
                    :key="tag.id"
                    v-for="tag in dynamicTags"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag.id)">
                {{tag.title}}
            </el-tag>
            <el-input
                    class="input-new-tag"
                    v-if="inputVisible"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
        </el-card>
    </div>
</template>

<script>
    import { labelsList, labelDel, labelsAdd } from '../../api/labels'
    export default {
        name: "Label",
        data() {
            return {
                dynamicTags: [],
                inputVisible: false,
                inputValue: ''
            };
        },

        created () {
            this.getLabelLsit()
        },

        methods: {
            // 获取所有标签
            async getLabelLsit () {
                try {
                    let data = await labelsList()
                    this.dynamicTags = data
                }catch (e) {
                    console.log(e)
                }
            },

            // 删除标签
            async labelDel (id) {
                try {
                    let res = await labelDel(id)
                    if (res.code == 200) {
                        this.$notify({
                            title: '成功',
                            message: res.msg,
                            type: 'success'
                        });
                        this.getLabelLsit()
                    }
                }catch (e) {
                    console.log(e)
                    this.$notify.error({
                        title: '失败',
                        message: '服务器错误'
                    });
                }
            },

            // 添加标签
            async labelInsert () {
                try{
                    console.log(this.inputValue)
                    let inputValue = this.inputValue.replace(/\s/g,"")
                    if (inputValue == '') {
                        this.$notify({
                            title: '警告',
                            message: '请输入标签名',
                            type: 'warning'
                        });
                        return
                    }
                    console.log(inputValue)
                    let res = await labelsAdd(inputValue)
                    if (res.code == 200) {
                        this.$notify({
                            title: '成功',
                            message: res.msg,
                            type: 'success'
                        });
                        this.getLabelLsit()
                    }
                    console.log(res)
                    this.inputVisible = false;
                    this.inputValue = '';
                }catch (e) {
                    console.log(e)
                }
            },

            // 关闭删除标签
            handleClose(tag) {
                this.labelDel(tag)
            },

            // 显示输入框
            showInput() {
                // 添加标签的输入框
                console.log('输入框')
                this.inputVisible = true;
                this.$nextTick(() => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            // 添加内容
            handleInputConfirm() {
                this.labelInsert()
            }
        }
    }
</script>

<style scoped>
    .el-tag + .el-tag {
        margin-left: 10px;
    }
    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }
</style>