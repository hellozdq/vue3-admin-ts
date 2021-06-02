
<template>
<div class="sidebar">
  <div class="logo">logo</div>
  <el-menu background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :default-active="defalutActive"
      :active="activeId"
      class="el-menu-vertical-demo menu" 
      :collapse="isCollapse"
      :unique-opened="true"
      :router="true">
    <sidebar-item v-for="item in menus" :key="item.path" :item="item" :base-path="item.path" />
  </el-menu>
</div>

</template>

<script lang="ts">
// const path = require("path");

// import path from 'path';
// console.log(path.resolve("/a","b"));

import { defineComponent, computed, ref } from "vue";
import { useRoute } from "vue-router"
import { useStore } from "vuex"
// import router from '../../router/index'
// import router from '../../router/index.ts'
import router from "@/router/index"
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
      
      // setTimeout(function(){

      // })
      const defalutActive = ref("/about");
      const activeId = ref("/about")
      
      const menus = router.options.routes;
      console.log(menus)


      const handleOpen = (key, keyPath) => {
          console.log(key, keyPath);
      }
      const handleClose = (key, keyPath) =>{
          console.log(key, keyPath);
      }

      
      return {isCollapse, handleOpen, handleClose, menus, defalutActive, activeId}
  }
})
</script>

<style lang="scss" scoded>
.sidebar{
  display: flex;
  flex-direction: column;
  .logo{
    height: 50px;
    border: solid 1px #f5f5f5;
    margin: 10px;
  }
  .menu{
    flex: 1;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
