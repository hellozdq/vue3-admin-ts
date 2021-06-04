
<template>
<div class="sidebar">
  <div class="logo">logo</div>
  <el-menu 
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      :default-active="route.path"
      class="el-menu-vertical-demo menu" 
      :collapse="isCollapse"
      :unique-opened="true"
      :router="true">
    <sidebar-item v-for="item in menus" :key="item.path" :item="item" :base-path="item.path" />
  </el-menu>
</div>

</template>

<script lang="ts">

// import path from 'path'
// path.resolve("/a")


// const path = require('path');

import { defineComponent, computed, reactive } from "vue";
import { useRoute } from "vue-router"
import { useStore } from "vuex"
import router from "@/router/index"

import SidebarItem from './SidebarItem.vue'

import color from '@/common/color'
export default defineComponent({
  components:{
    SidebarItem
  },
  setup(){
      const store = useStore();
      const route = useRoute();
      // 动态获取是否折叠
      const isCollapse = computed(() => {
          return  store.state.layout.isCollapse;
      })
      // 获取菜单路由
      const menus = router.options.routes;
      const variables = reactive(color);

      return {isCollapse, menus, route, variables}
  }
})
</script>

<style lang="scss" scoded>
.sidebar{
  display: flex;
  flex-direction: column;
  .logo{
    height: 50px;
    border-right: solid 1px #e6e6e6;
    padding: 10px;
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
