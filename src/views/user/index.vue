<template>
    <div class="user">
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
            prop="account"
            label="账号">
            </el-table-column>
            <el-table-column
            prop="name"
            label="姓名">
            </el-table-column>
            <el-table-column
            prop="phone"
            label="手机">
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template #default="scope">
                <el-button @click="editRoles(scope.row)" type="text" size="small">权限</el-button>
                <el-button @click="editUser(scope.row)" type="text" size="small">编辑</el-button>
            </template>
            </el-table-column>
        </el-table>

    <!-- 权限 start -->
        <el-dialog
            title="权限"
            v-model="dialogRolesVisible"
            :close-on-click-modal="false"
            width="600px"
            >
            <roles-form v-model:dialogRolesVisible="dialogRolesVisible" :userId="editForm.userId"></roles-form>
        </el-dialog>
    <!-- 权限 end -->

    <!-- 编辑 start -->
        <el-dialog
            title="编辑"
            v-model="dialogEditVisible"
            :close-on-click-modal="false"
            width="500px"
            >
            <edit-form v-model:dialogEditVisible="dialogEditVisible" :userId="editForm.userId"></edit-form>
        </el-dialog>
    <!-- 编辑 end -->
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref, reactive, Ref } from 'vue'

    import { getList,ListData } from '@/api/user'
    
    import RolesForm from './components/RolesForm.vue'
    import EditForm from './components/EditForm.vue'
    
    
    export default defineComponent({
        components:{
            RolesForm,
            EditForm
        },
        setup(){
            // 表格数据
            let tableData = reactive([])

            // 获取数据
            const searchList = () => {
                const form:ListData = {
                    pageSize:1,
                    pageNum:10,
                    name:'',
                    phone:1111111
                }
                getList(form).then((res) => {
                    tableData = res.data;
                })
            }

            // 显示权限dialog
            let dialogRolesVisible:Ref<boolean> = ref<boolean>(false);

            // 显示修改dialog
            let dialogEditVisible:Ref<boolean> = ref<boolean>(false);

            // 权限页面
            const editRoles = () => {
                dialogRolesVisible.value = true;
            };
            
            // 修改页面
            let editForm = reactive<object>({});
            const editUser = (row) => {
                dialogEditVisible.value = true;
                editForm = {...row};
            };
            return { 
                    tableData,
                    editRoles,
                    editUser,
                    dialogRolesVisible,
                    dialogEditVisible,
                    editForm
            }
        },
    })
</script>

<style lang="scss" scoped>
.user{
    padding: 15px;
}
</style>