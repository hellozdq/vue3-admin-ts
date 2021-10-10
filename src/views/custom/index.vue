<template>
  <div class="container">
    <div class="title">自定义表单</div>
    <edit-form></edit-form>
  </div>
</template>

<script lang="ts">
  import { defineComponent, defineAsyncComponent } from 'vue'
  export default defineComponent({
    name: 'Record',
    components: {
      EditForm: defineAsyncComponent(() => import('./components/EditForm.vue'))
    },
    setup(props) {}
  })
</script>
