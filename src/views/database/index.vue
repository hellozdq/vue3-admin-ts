<template>
  <div class="database">
    <el-form :inline="true" :model="searchForm" size="small" class="headerForm">
      <el-form-item>
        <el-select v-model="searchForm.tableName" placeholder="请选择">
          <el-option value="" label="全部表"></el-option>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
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
      <el-table-column label="表名">
        <template #default="{ row }">
          {{ row.tableName + '(' + row.tableComment + ')' }}
        </template>
      </el-table-column>
      <el-table-column label="字段名">
        <template #default="{ row }">
          {{ row.fieldName + '(' + row.fieldComment + ')' }}
        </template>
      </el-table-column>
      <el-table-column prop="fieldType" label="字段类型"></el-table-column>
      <el-table-column label="不为null">
        <template #default="{ row }">
          {{ row.notNull === 0 ? '否' : '是' }}
        </template>
      </el-table-column>
      <el-table-column prop="isKey" label="是否主键">
        <template #default="{ row }">
          {{ row.isKey === 0 ? '否' : '是' }}
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      v-model:limit="searchForm.pageSize"
      v-model:page="searchForm.pageNum"
      :total="total"
      @pagination="getPage"
    ></Pagination>
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref } from 'vue'
  import { getList, getTableNameList } from '@/api/database'
  import Pagination from '@/components/Pagination/index.vue'
  export default defineComponent({
    name: 'DATABASE',
    components: {
      Pagination
    },
    setup() {
      // 列表
      const tableData = ref([])

      // 查询表单
      const searchForm: Database.ListForm = reactive({
        tableName: '',
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

      // loading
      const loading = ref(false)

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
      // onSearch()

      /* 查询所有表名 */
      let options = ref([])
      const searchTableNameList = () => {
        getTableNameList().then((res) => {
          options.value = res.data
        })
      }
      searchTableNameList()

      return {
        options,
        tableData,
        searchForm,
        loading,
        total,
        getPage,
        onSearch
      }
    }
  })
</script>

<style lang="scss" scoped>
  .database {
    .headerForm {
      text-align: right;
    }
  }
</style>
