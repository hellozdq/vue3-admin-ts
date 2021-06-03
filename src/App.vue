<template>
  <!-- <Layout></Layout> -->
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Layout from "@/layout/index.vue"
export default defineComponent({
  components: {
    Layout
  }
})
</script>

<style>

</style>
