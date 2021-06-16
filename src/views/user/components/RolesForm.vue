<template>
    <roles-card></roles-card>
    <div class="footer">
        <span class="dialog-footer">
            <el-button type="primary" size="medium" @click="confirm">确 定</el-button>
            <el-button size="medium" @click="cancel">取 消</el-button>
        </span>
    </div>
</template>

<script lang="ts">
import { defineComponent,reactive } from 'vue';
import { ElMessage } from 'element-plus';

import { updateRoles, UpdateRoleQuery } from '@/api/user'
import RolesCard from './RolesCard.vue'

export default defineComponent({
    name:"RolesForm",
    props:["userId","dialogRolesVisible"],
    components: { RolesCard },
    setup(props,context){
        const roles = reactive([{roleId:123,label:"parent",children:[{roleId:12,label:"child"}]}]);

        const parentCheck = reactive({123:false});
        const childCheck = reactive({123:[]});
        const isIndeterminate = reactive({123:false});

        const handleCheckAllChange = (val:Array<number>,roleId:number) => {
            const childs = roles.find((item)=>{
                return item.roleId === roleId
            })
            let roleIds:Array<number>|undefined;
            if(childs){
                roleIds = childs.children.map((item)=>{
                    return item.roleId
                })
            }
            childCheck[roleId] = val ? roleIds : [];
            isIndeterminate[roleId] = false;
        }

        const handleCheckedCitiesChange = (val:Array<number>,roleId:number,childLen:number) => {
            let checkedCount = val.length;
            parentCheck[roleId] = checkedCount === childLen;
            isIndeterminate[roleId] = checkedCount > 0 && checkedCount < childLen;
        }
        
        const confirm = () => {
            const from:UpdateRoleQuery = {
                userId:0,
                roles:''
            }
            updateRoles(from).then(()=> {
                ElMessage.success("修改成功！");
                context.emit("update:dialogRolesVisible",false);
            })
            
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