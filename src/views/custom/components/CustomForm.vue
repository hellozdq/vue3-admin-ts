<template>
  <el-form :model="form" label-width="120px" size="small" :inline="true">
    <el-form-item label="Activity name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label=" " style="width: 100%">
      <el-button type="primary" @click="onSubmit">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>

  <!-- <el-input-number v-model="num" :min="1" :max="10" @change="handleChange" />
  <el-radio-group v-model="radio">
    <el-radio :label="3">Option A</el-radio>
    <el-radio :label="6">Option B</el-radio>
    <el-radio :label="9">Option C</el-radio>
  </el-radio-group>
  <el-select v-model="value" placeholder="Select">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :disabled="item.disabled"
    >
    </el-option>
  </el-select>
  <el-time-picker
    v-model="value1"
    :disabled-hours="disabledHours"
    :disabled-minutes="disabledMinutes"
    :disabled-seconds="disabledSeconds"
    placeholder="Arbitrary time"
  >
  </el-time-picker>
  <el-time-select v-model="value" start="08:30" step="00:15" end="18:30" placeholder="Select time">
  </el-time-select>
  <el-date-picker
    v-model="value2"
    type="date"
    placeholder="Pick a day"
    :disabled-date="disabledDate"
    :shortcuts="shortcuts"
  >
  </el-date-picker>
  <el-date-picker v-model="value1" type="datetime" placeholder="Select date and time">
  </el-date-picker> -->
</template>

<script lang="ts">
  import { defineComponent, reactive, ref } from 'vue'
  export default defineComponent({
    name: 'CustomForm',
    setup(props) {
      const form = reactive({ name: '' })
      const name = ref('111111111')
      const onSubmit = () => {}
      const cancel = () => {}
      return { form, onSubmit, cancel, name }
    }
  })
</script>
