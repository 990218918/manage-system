<template>
    <div class="user-header">
        <el-button type="primary" @click="handleAdd">+新增</el-button>
        <el-dialog v-model="dialogVisible" :title="action=='add'?'新增用户':'编辑用户'" width="30%" :before-close="handleClose">
            <el-form :inline="true" :model="formUser" ref="userFrom">
                <el-row>
                    <el-col :span="12">
                        <el-form-item
                         label="姓名" 
                         prop="name"
                         :rules="[{required:true,message:'姓名必填'}]"
                         >
                            <el-input v-model="formUser.name" placeholder="请输入姓名" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item
                         label="年龄" 
                         prop="age"
                         :rules="[
                            {required:true,message:'年龄必填'},
                            {type:'number',message:'年龄必须是数字'}
                            ]"
                         >
                            <el-input v-model.number="formUser.age" placeholder="请输入年龄" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item
                         label="性别" 
                         prop="sex"
                         :rules="[{required:true,message:'性别必选'}]"
                         >
                            <el-select v-model="formUser.sex" placeholder="请选择">
                                <el-option label="男" value="1" />
                                <el-option label="女" value="0" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item
                         label="出生日期" 
                         prop="birth"
                         :rules="[{required:true,message:'出生日期必选'}]"
                         >
                            <el-date-picker v-model="formUser.birth" type="date" label="出生日期" placeholder="请选择"
                                style="width: 100%" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item
                 label="地址" 
                 prop="addr"
                 :rules="[{required:true,message:'地址必填'}]"
                 >
                    <el-input v-model="formUser.addr" placeholder="请输入地址" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="handleCancel">取消</el-button>
                    <el-button type="primary" @click="onSubmit">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>


        <el-form :inline="true" :model="formInline">
            <el-form-item label="请输入">
                <el-input v-model="formInline.keyword" placeholder="请输入用户名" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSearch">搜索</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="table">
        <el-table :data="list" style="width: 100%" height="450px">
            <el-table-column v-for="item in tableLabel" :key="item.prop" :label="item.label" :prop="item.prop"
                :width="item.width ? item.width : 150" />
            <el-table-column fixed="right" label="操作" min-width="180">
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
         small 
         background 
         layout="prev, pager, next" 
         :total="config.total" 
         @current-change="changePage"
         class="pager" 
         :page-size="10" 
         :current-page="config.page" 
         />
    </div>
</template>

<script>
import { roleTypes } from "element-plus";
import { getCurrentInstance, onMounted, reactive, ref } from "vue";

export default ({
    setup() {
        const { proxy } = getCurrentInstance();
        const list = ref([]);
        const tableLabel = reactive([
            {
                prop: "name",
                label: "姓名",
            },
            {
                prop: "age",
                label: "年龄",
            },
            {
                prop: "sexLabel",
                label: "性别",
            },
            {
                prop: "birth",
                label: "出生日期",
                width: 200,
            },
            {
                prop: "addr",
                label: "地址",
                width: 400,
            },
        ]);
        const config = reactive({
            total: 0,
            page: 1,
            name: '',
        });
        onMounted(() => {
            getUserData(config);
        });

        const getUserData = async (config) => {
            let res = await proxy.$api.getUserData(config);
            console.log(res);           
            config.total = res.count
            list.value = res.list.map((item) => {
                item.sexLabel = item.sex === 0 ? '女' : '男';
                return item;
            });
        };

        const changePage = (page) => {
            // console.log(page)
            config.page = page;
            getUserData(config);
        };

        const formInline = reactive({
            keyword: "",
        });

        const handleSearch = () => {
            config.name = formInline.keyword;
            console.log(config.name);
            getUserData(config)
        };

        const dialogVisible = ref(false);

        const handleClose = (done) => {
            ElMessageBox.confirm('确定关闭？')
                .then(() => {
                proxy.$refs.userFrom.resetFields();
                    done()
                })
                .catch(() => {
                    // catch error
                })
        };

        const formUser = reactive({
            name: "",
            age: "",
            sex: "",
            birth: "",
            addr: "",
        });

        const timeFormat = (time) => {
            var time = new Date(time);
            var year = time.getFullYear();
            var month = time.getMonth() + 1;
            var date = time.getDate();
            function add(m) {
                return m < 10 ? "0" + m : m;
            }
            return year + "-" + add(month) + "-" + add(date);
        };

        const onSubmit = () => {
            proxy.$refs.userFrom.validate(async (valid) => {
                if (valid) {
                    if (action.value == 'add') {
                        formUser.birth = timeFormat(formUser.birth);
                        let res = await proxy.$api.addUser(formUser);
                        console.log(res);
                        if (res) {
                            dialogVisible.value = false;
                            proxy.$refs.userFrom.resetFields();
                            getUserData(config);
                        }
                    } else {
                        formUser.sex == "男" ? (formUser.sex = 1) : (formUser.sex = 0);
                        formUser.birth = timeFormat(formUser.birth);
                        let res = await proxy.$api.editUser(formUser);
                        // console.log(res);
                        if (res) {
                            dialogVisible.value = false;
                            proxy.$refs.userFrom.resetFields();
                            getUserData(config);
                        }
                    }
                } else {
                    ElMessage({
                        showClose: true,
                        message: '请输入正确的内容',
                        type: 'error'
                    })
                }
            })
        };

        const handleCancel = () => {
            dialogVisible.value = false;
            proxy.$refs.userFrom.resetFields();
        };

        const action = ref('add');

        const handleEdit = (row) => {
            // console.log(row)
            // 浅拷贝
            action.value = "edit";
            dialogVisible.value = true;
            row.sex == 1 ? (row.sex = "男") : (row.sex = "女");
            proxy.$nextTick(() => {
                Object.assign(formUser, row);
            })
        };

        const handleAdd = () => {
            action.value = "add";
            dialogVisible.value = true;
        };

        const handleDelete = (row) => {
            ElMessageBox.confirm('确定删除？')
                .then(async() => {
                    await proxy.$api.deleteUser({
                        id: row.id
                    });
                    ElMessage({
                        showClose: true,
                        message: "删除成功",
                        type: "success"
                    });
                    getUserData(config)
                })
                .catch(() => {
                    // catch error
                })
        };

        return {
            tableLabel,
            list,
            config,
            changePage,
            formInline,
            handleSearch,
            handleClose,
            dialogVisible,
            formUser,
            onSubmit,
            handleCancel,
            handleEdit,
            action,
            handleAdd,
            handleDelete
        }
    },
})
</script>

<style lang="less" scoped>
.table{
    position: relative;
    height: 470px;
    .pager{
        position: absolute;
        right: 0;
        bottom: -20px;
    }
}
.user-header{
    display: flex;
    justify-content: space-between;
}
</style>