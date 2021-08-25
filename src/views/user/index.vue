<template>
  <div class="user">
    <el-form :inline="true" :model="searchForm" size="small" class="headerForm">
      <el-form-item>
        <el-input style="width: 120px" v-model="searchForm.name" placeholder="姓名查询"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input style="width: 150px" v-model="searchForm.phone" placeholder="手机查询"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="loading"
      :data="tableData"
      border
      max-height="380px"
      style="width: 100%; height: 110%"
    >
      <el-table-column prop="account" label="账号"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="phone" label="手机"> </el-table-column>
      <el-table-column label="操作" width="120">
        <template #default="{ row }">
          <el-button
            @click="editRoles(row)"
            :disabled="row.roles === 'admin'"
            type="text"
            size="small"
            >权限</el-button
          >
          <el-button @click="editUser(row)" type="text" size="small">编辑</el-button>
          <el-popconfirm title="确定删除吗？" @confirm="delUser(row.id, row.accountId)">
            <template #reference>
              <el-button type="text" :disabled="row.roles === 'admin'" size="small">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      v-model:limit="searchForm.pageSize"
      v-model:page="searchForm.pageNum"
      :total="total"
      @pagination="getPage"
    ></Pagination>

    <!-- 权限 start -->
    <div v-dialogdrag v-if="dialogRolesVisible">
      <el-dialog
        title="权限"
        v-model="dialogRolesVisible"
        :close-on-click-modal="false"
        width="600px"
      >
        <roles-form
          v-model:dialogRolesVisible="dialogRolesVisible"
          :userForm="userForm"
          @onSearch="onSearch"
        ></roles-form>
      </el-dialog>
    </div>
    <!-- 权限 end -->

    <!-- 编辑 start -->
    <div v-dialogdrag v-if="dialogEditVisible">
      <el-dialog
        title="编辑"
        v-model="dialogEditVisible"
        :close-on-click-modal="false"
        width="500px"
      >
        <edit-form
          v-model:dialogEditVisible="dialogEditVisible"
          :userForm="userForm"
          @onSearch="onSearch"
        ></edit-form>
      </el-dialog>
    </div>
    <!-- 编辑 end -->
  </div>
</template>

<script lang="ts">
  import { defineComponent, defineAsyncComponent, ref, reactive, Ref } from 'vue'
  import { ElMessage } from 'element-plus'
  const RolesForm = () => import('./components/RolesForm.vue')
  const EditForm = () => import('./components/EditForm.vue')
  import Pagination from '@/components/Pagination/index.vue'
  import { getList, deleteUser } from '@/api/user'

  export default defineComponent({
    components: {
      RolesForm: defineAsyncComponent(RolesForm),
      EditForm: defineAsyncComponent(EditForm),
      Pagination
    },
    setup() {
      // 表格数据
      let tableData = ref([])

      // loading
      const loading = ref(false)

      // 显示权限dialog
      let dialogRolesVisible: Ref<boolean> = ref<boolean>(false)

      // 显示修改dialog
      let dialogEditVisible: Ref<boolean> = ref<boolean>(false)

      // 权限页面
      const editRoles = (row) => {
        dialogRolesVisible.value = true
        userForm.value = { ...row }
      }

      // 修改页面
      let userForm = ref<object>({})
      const editUser = (row) => {
        dialogEditVisible.value = true
        userForm.value = { ...row }
      }

      // 查询
      const onSearch = () => {
        loading.value = true
        getList(searchForm)
          .then((res) => {
            loading.value = false
            const data = res.data
            tableData.value = data.list
            total.value = data.total
          })
          .catch((err) => {
            loading.value = false
          })
      }

      // 查询表单
      const searchForm: User.ListForm = reactive({
        name: '',
        phone: '',
        pageNum: 1,
        pageSize: 10
      })

      // 总数
      let total = ref(0)

      // 分页
      const getPage = (data: { page: number; limit: number }) => {
        searchForm.pageNum = data.page
        searchForm.pageSize = data.limit
        onSearch()
      }

      onSearch()

      // 删除
      let isReq = false //防止重复请求
      const delUser = (id: number, accountId: number) => {
        if (isReq) {
          return
        }
        isReq = true
        deleteUser({ id: id, accountId: accountId })
          .then((res) => {
            ElMessage.success('删除成功！')
            onSearch()
            isReq = false
          })
          .catch(() => {
            isReq = false
          })
      }

      return {
        onSearch,
        searchForm,
        total,
        getPage,
        tableData,
        editRoles,
        editUser,
        delUser,
        dialogRolesVisible,
        dialogEditVisible,
        userForm,
        loading
      }
    }
  })
</script>

<style lang="scss" scoped>
  .user {
    .headerForm {
      text-align: right;
    }
  }
</style>
