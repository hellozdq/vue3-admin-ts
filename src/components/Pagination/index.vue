<template>
  <div :class="{ hidden: hidden }" class="pagination-container">
    <el-pagination
      style="float: right; margin-bottom: 10px"
      :background="background"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { scrollTo } from '@/common/scroll-to'

  type Props = {
    total: number
    page: number
    limit: number
    pageSizes: object
    layout: string
    background: boolean
    autoScroll: boolean
    hidden: boolean
  }

  export default defineComponent({
    name: 'Pagination',
    props: {
      total: {
        required: true,
        type: Number
      },
      page: {
        type: Number,
        default: 1
      },
      limit: {
        type: Number,
        default: 20
      },
      pageSizes: {
        type: Array,
        default() {
          return [10, 20, 30, 50]
        }
      },
      layout: {
        type: String,
        default: 'total, sizes, prev, pager, next, jumper'
      },
      background: {
        type: Boolean,
        default: true
      },
      autoScroll: {
        type: Boolean,
        default: true
      },
      hidden: {
        type: Boolean,
        default: false
      }
    },
    setup(props: Props, context) {
      console.log(props)
      console.log(props.page)
      const currentPage = computed({
        get() {
          return props.page
        },
        set(val) {
          context.emit('update:page', val)
        }
      })

      const pageSize = computed({
        get() {
          return props.limit
        },
        set(val) {
          context.emit('update:limit', val)
        }
      })

      const handleSizeChange = (val) => {
        context.emit('pagination', { page: currentPage, limit: val })
        if (props.autoScroll) {
          scrollTo(0, 800, () => {})
        }
      }
      const handleCurrentChange = (val) => {
        context.emit('pagination', { page: val, limit: pageSize })
        if (props.autoScroll) {
          scrollTo(0, 800, () => {})
        }
      }

      return {
        currentPage,
        pageSize,
        handleSizeChange,
        handleCurrentChange
      }
    }
  })
</script>

<style scoped>
  .pagination-container {
    background: #fff;
    padding: 0px 16px;
    margin-top: 15px !important;
    height: 32px;
  }
  .pagination-container.hidden {
    display: none;
  }
</style>
