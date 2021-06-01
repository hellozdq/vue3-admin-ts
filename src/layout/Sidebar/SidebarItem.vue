<template>
    <router-link v-if="!item.children" :to="{ path: item.path }">
        <el-menu-item>
            <i :class="item.meta.icon"></i>
            <span>{{item.meta.title}}</span>
        </el-menu-item>
    </router-link>
    <el-submenu v-else :index="item.path">
        <template #title>
            <i :class="item.meta.icon"></i>
            <span>{{item.meta.title}}</span>
        </template>
        <sidebar-item
            v-for="child in item.children"
            :key="child.path"
            :is-nest="true"
            :item="child"
            :base-path="child.path"
            class="nest-menu"
        />
        
    </el-submenu>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name:"SidebarItem",
    props:{
        item: {
            type: Object,
            default: {}
        },
        basePath: {
            type: String,
            default: ""
        }
    }
})
</script>