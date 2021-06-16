<template>
    <div class="item" v-for="item in roles" :key="item.roleId">
        <div class="item-content">
            <el-checkbox-group v-model="childCheck[item.roleId]" @change="handleCheckedChange($event,item.roleId,item.children.length)">
                <el-checkbox v-for="child in item.children" :label="child.roleId" :key="child.roleId">{{child.label}}</el-checkbox>
                <!-- <roles-card v-if="item.children"></roles-card> -->
            </el-checkbox-group>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent,reactive } from 'vue';

export default defineComponent({
    name:"RolesCard",
    props:["roles","childCheck"],
    setup(props,context){
        const checks = [];
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