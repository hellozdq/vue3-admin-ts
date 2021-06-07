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

    <!-- 编辑 -->
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref, reactive, Ref } from 'vue'
    import RolesForm from './components/RolesForm.vue'
    export default defineComponent({
        components:{
            RolesForm
        },
        setup(){
            const tableData = reactive([{
                account: '15889786029',
                name: '王小虎',
                phone: '15889786029'
            }])

            let dialogRolesVisible:Ref<boolean> = ref<boolean>(false);
            // 打开权限页面
            const editRoles = () => {
                dialogRolesVisible.value = true;
            };

            let editForm = reactive<object>({});
            const editUser = (row) => {
                editForm = {...row};
            };
            return { 
                    tableData,
                    editRoles,
                    editUser,
                    dialogRolesVisible,
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