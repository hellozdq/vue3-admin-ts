<template>
    <div class="item" v-for="item in roles" :key="item.roleId">
        <div class="item-title">{{item.label}}</div>
        <div class="item-content">
            <el-checkbox class="item-content-head" :indeterminate="isIndeterminate[item.roleId]" v-model="parentCheck[item.roleId]" @change="handleCheckAllChange($event,item.roleId)">全选</el-checkbox>
            <el-checkbox-group v-model="childCheck[item.roleId]" @change="handleCheckedCitiesChange($event,item.roleId,item.children.length)">
                <el-checkbox v-for="child in item.children" :label="child.roleId" :key="child.roleId">{{child.label}}</el-checkbox>
            </el-checkbox-group>
        </div>
    </div>
    <div class="footer">
        <span class="dialog-footer">
            <el-button type="primary" size="medium" @click="confirm">确 定</el-button>
            <el-button size="medium" @click="cancel">取 消</el-button>
        </span>
    </div>
</template>

<script lang="ts">
import { defineComponent,reactive } from "vue";

export default defineComponent({
    props:["userId","dialogRolesVisible"],
    setup(props,context){
        console.log(props)
        
        const roles = reactive([{roleId:123,label:"parent",children:[{roleId:12,label:"child"}]}]);

        const parentCheck = reactive({123:false});
        const childCheck = reactive({123:[]});
        const isIndeterminate = reactive({123:false});

        const handleCheckAllChange = (val:Array<number>,roleId:number) => {
            const childs = roles.find((item)=>{
                return item.roleId === roleId
            })
            const roleIds = childs?.children.map((item)=>{
                return item.roleId
            })
            childCheck[roleId] = val ? roleIds : [];
            isIndeterminate[roleId] = false;
        }

        const handleCheckedCitiesChange = (val:Array<number>,roleId:number,childLen:number) => {
            console.log(val)
            console.log(roleId)
            let checkedCount = val.length;
            parentCheck[roleId] = checkedCount === childLen;
            isIndeterminate[roleId] = checkedCount > 0 && checkedCount < childLen;
        }
        
        const confirm = () => {
            context.emit("update:dialogRolesVisible",false);
        }

        const cancel = () => {
            context.emit("update:dialogRolesVisible",false);
        }

        return {
            roles,
            parentCheck,
            childCheck,
            isIndeterminate,
            handleCheckAllChange,
            handleCheckedCitiesChange,
            confirm,
            cancel
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