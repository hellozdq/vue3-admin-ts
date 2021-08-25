<template>
  <div class="container"> 主页 </div>
</template>

<script lang="ts">
  import { useStore } from 'vuex'
  import { computed, defineComponent, ref, reactive } from 'vue'

  export default defineComponent({
    name: 'Home',
    setup(props) {}
  })
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 36px;
  }
</style>
