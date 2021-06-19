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
        <Pagination v-model:limit="searchForm.pageSize" v-model:page="searchForm.pageNum" :pageSizes="pageSizes" :total="total" @pagination="getPage"></Pagination>



    <!-- 权限 start -->
        <el-dialog
            title="权限"
            v-model="dialogRolesVisible"
            :close-on-click-modal="false"
            width="600px"
            >
            <roles-form v-model:dialogRolesVisible="dialogRolesVisible" :userId="1"></roles-form>
        </el-dialog>
    <!-- 权限 end -->

    <!-- 编辑 start -->
        <el-dialog
            title="编辑"
            v-model="dialogEditVisible"
            :close-on-click-modal="false"
            width="500px"
            v-if="dialogEditVisible"
            >
            <edit-form v-model:dialogEditVisible="dialogEditVisible" :userForm="userForm" @onSearch="onSearch"></edit-form>
        </el-dialog>
    <!-- 编辑 end -->
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, Ref, onMounted } from 'vue'
import RolesForm from './components/RolesForm.vue'
import EditForm from './components/EditForm.vue'
import Pagination from '@/components/Pagination/index.vue'
import { getList,ListForm } from '@/api/user'

export default defineComponent({
    components:{
        RolesForm,
        EditForm,
        Pagination
    },
    setup(){
        // 表格数据
        let tableData = ref([]);

        // 显示权限dialog
        let dialogRolesVisible:Ref<boolean> = ref<boolean>(true);

        // 显示修改dialog
        let dialogEditVisible:Ref<boolean> = ref<boolean>(false);

        // 权限页面
        const editRoles = () => {
            dialogRolesVisible.value = true;
        };
        
        // 修改页面
        let userForm = ref<object>({});
        const editUser = (row) => {
            dialogEditVisible.value = true;
            userForm.value = {...row};
        };

        // 查询
        const onSearch = () => {
            getList(searchForm)
            .then((res)=>{
                const data = res.data;
                tableData.value = data.list;
                total.value = data.total;
            })
        }
        

        // 查询表单
        const searchForm:ListForm = reactive({
            name:'',
            phone:'',
            pageNum:1,
            pageSize:10
        })

        // 总数
        let total = ref(0);

        // 
        let pageSizes = reactive([10,20]);

        // 分页
        const getPage = (data:{page:number,limit:number}) => {
            searchForm.pageNum = data.page;
            searchForm.pageSize = data.limit;
            console.log(searchForm);
        }

        onMounted(()=>{
            onSearch();
        })

        return { 
                onSearch,
                searchForm,
                total,
                pageSizes,
                getPage,
                tableData,
                editRoles,
                editUser,
                dialogRolesVisible,
                dialogEditVisible,
                userForm
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