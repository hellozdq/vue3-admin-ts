<template>
    <div v-if="item.meta&&!item.meta.hidden">
        <!-- 没有子节点 -->
        <el-menu-item v-if="!item.children" :index="basePath">
            <i :class="item.meta&&item.meta.icon"></i>
            <span>{{item.meta&&item.meta.title}}</span>
        </el-menu-item>
        <!-- 只有一个子节点且 meta.hiddenParent为true 为只有一个节点不显示父节点设置比如首页 -->
        <el-menu-item v-else-if="item.children.length == 1&&item.meta.hiddenParent" :index="pathResolve(item.children[0].path)">
            <i :class="item.children[0].meta&&item.children[0].meta.icon"></i>
            <span>{{item.children[0].meta&&item.children[0].meta.title}}</span>
        </el-menu-item>
        <!-- 有子节点就调用自身组件递归嵌套 -->
        <el-submenu v-else :index="basePath">
            <template #title>
                <i :class="item.meta&&item.meta.icon"></i>
                <span>{{item.meta&&item.meta.title}}</span>
            </template>
            <sidebar-item
                v-for="child in item.children"
                :key="pathResolve(child.path)"
                :is-nest="true"
                :item="child"
                :base-path="pathResolve(child.path)"
                class="nest-menu"
            />
        </el-submenu>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { connectPath } from "@/common/index"

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
    },
    setup(props){
        const pathResolve = (path:string) => {
            return connectPath(props.basePath, path);
        }
        return {
            pathResolve
        }
    }
})
</script>