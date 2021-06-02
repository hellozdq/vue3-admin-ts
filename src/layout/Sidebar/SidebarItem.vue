<template>
    <div v-if="!item.meta.hidden">
        <el-menu-item v-if="!item.children" :index="item.path">
            <i :class="item.meta.icon"></i>
            <span>{{item.meta.title}}</span>
        </el-menu-item>
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
    </div>
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