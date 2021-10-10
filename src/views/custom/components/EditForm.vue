<template>
  <el-form :model="form" label-width="120px" size="small">
    <el-form-item label="标题">
      <el-input v-model="form.name" style="width: 205px"></el-input>
    </el-form-item>
    <el-form-item label="类型">
      <el-select v-model="form.value" placeholder="Select">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="文本类型">
      <el-select v-model="form.type" placeholder="Select">
        <el-option
          v-for="item in textTypes"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="字数限制">
      <el-input></el-input>
      <el-input></el-input>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
  import { defineComponent, reactive } from 'vue'
  export default defineComponent({
    name: 'Record',
    setup(props) {
      const options = reactive([
        { label: '单行文本', value: 1 },
        { label: '多行文本', value: 2 },
        { label: '单选框', value: 3 },
        { label: '多选框', value: 4 },
        { label: '单选下拉框', value: 5 },
        { label: '多选下拉框', value: 6 },
        { label: '富文本', value: 7 }
      ])
      const textTypes = reactive([
        { label: '文本', value: 1 },
        { label: '数字', value: 2 },
        { label: '电话', value: 3 },
        { label: '手机', value: 4 },
        { label: '邮箱', value: 5 }
      ])
      const form = reactive({ name: '', value: 1, type: 1 })
      return { form, options, textTypes }
    }
  })
</script>
