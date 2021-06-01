
<template>
<div>
  <div>logo</div>
  <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
    <el-submenu index="1">
      <template #title>
        <i class="el-icon-location"></i>
        <span>导航一</span>
      </template>
      <el-menu-item-group>
        <template #title>分组一</template>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="分组2">
        <el-menu-item index="1-3">选项3</el-menu-item>
      </el-menu-item-group>
      <el-submenu index="1-4">
        <template #title>选项4</template>
        <el-menu-item index="1-4-1">选项1</el-menu-item>
      </el-submenu>
    </el-submenu>
  </el-menu>
</div>

</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router"
import { useStore } from "vuex"
import router from '../../router/index'
// import router from '../../router/index.ts'
// import router from "@/router/index"
// import router from "@/router/index.ts"
console.log("router")
console.log(router)

  export default defineComponent({
    setup(){
        const store = useStore();
        const route = useRoute();
        const isCollapse = computed(() => {
            return  store.state.layout.isCollapse;
        })


        const handleOpen = (key, keyPath) => {
            console.log(key, keyPath);
        }
        const handleClose = (key, keyPath) =>{
            console.log(key, keyPath);
        }
        return {isCollapse,handleOpen,handleClose}
    }
  })
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
