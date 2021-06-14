<template>
    <div class="user">
        <el-form :inline="true" :model="searchForm" size="small" class="headerForm">
            <el-form-item>
                <el-input style="width:120px;" v-model="searchForm.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input style="width:150px;" v-model="searchForm.phone" placeholder="请输入手机"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSearch">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table
            :data="tableData"
            border
            style="width: 100%">
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
        <Pagination :limit="10" :page="1" :pageSizes="[10,50]" :total="1"></Pagination>



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
import RolesForm from './components/RolesForm.vue'
import EditForm from './components/EditForm.vue'
import Pagination from '@/components/Pagination/index.vue'

export default defineComponent({
    components:{
        RolesForm,
        EditForm,
        Pagination
    },
    setup(){
        // 表格数据
        const tableData = reactive([{
            account: '15889786029',
            name: '王小虎',
            phone: '15889786029'
        }])

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

        // 查询
        const onSearch = () => {

        }

        // 查询表单
        const searchForm = reactive({
            name:'',
            phone:''
        })

        return { 
                onSearch,
                searchForm,
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
    .headerForm{
        text-align: right;
    }
}
</style>