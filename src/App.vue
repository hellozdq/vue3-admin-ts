<template>
  <Layout></Layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Layout from "@/layout/index.vue"
export default defineComponent({
  components:{
    Layout
  }
})
</script>

<style>
html,body{
  height: 100%;
  padding: 0;
  margin: 0;
}
</style>
