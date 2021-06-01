
<template>
<div>
  <div>logo</div>
  <el-menu default-active="1-4-1" class="el-menu-vertical-demo" :collapse="isCollapse">
    <sidebar-item v-for="item in menus" :key="item.path" :item="item" :base-path="item.path" />
  </el-menu>
</div>

</template>

<script lang="ts">
// const path = require("path");

// import path from 'path';
// console.log(path.resolve("/a","b"));

import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router"
import { useStore } from "vuex"
import router from '../../router/index'
// import router from '../../router/index.ts'
// import router from "@/router/index"
// import router from "@/router/index.ts"

import SidebarItem from './SidebarItem.vue'

export default defineComponent({
  components:{
    SidebarItem
  },
  setup(){
      const store = useStore();
      const route = useRoute();
      const isCollapse = computed(() => {
          return  store.state.layout.isCollapse;
      })
      
      const menus = router.options.routes;
      console.log(menus)


      const handleOpen = (key, keyPath) => {
          console.log(key, keyPath);
      }
      const handleClose = (key, keyPath) =>{
          console.log(key, keyPath);
      }

      
      return {isCollapse, handleOpen, handleClose, menus}
  }
})
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
