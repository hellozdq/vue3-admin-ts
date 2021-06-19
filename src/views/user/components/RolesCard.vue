<template>
    <div class="item-content">
        <el-checkbox-group v-model="roleItem[item.roleId]" @change="handleCheckedChange($event,item.roleId,item.children.length)">
            <el-checkbox v-for="child in item.children" :label="child.roleId" :key="child.roleId">{{child.label}}</el-checkbox>
            <!-- <roles-card v-if="item.children"></roles-card> -->
        </el-checkbox-group>
    </div>
</template>

<script lang="ts">
import { defineComponent,reactive,watch } from 'vue';

export default defineComponent({
    name:"RolesCard",
    props:{
        roles:{
            type:Object,
            default:{ids:[]}
        },
    },
    setup(props,context){
        const roleItem = reactive(props.roles.child);
        watch(roleItem,()=>{
            context.emit("update:roles",roleItem);
        })
        return {
            roleItem
        }
    }
})
</script>

<style lang="scss" scoped>
.item{
    border-bottom: solid 1px #f5f5f5;
    margin-bottom: 10px;
    padding: 10px;
    &-title{
        padding: 10px 0;
        border-bottom: dashed 1px #f5f5f5;
    }
    &-content{
        margin: 0 30px;
        &-head{
            margin: 10px 0;
        }
    }
        
}
.footer{
    margin-top: 30px;
    margin-left: 30px;
}
</style>