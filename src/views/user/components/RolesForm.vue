<template>
    <roles-card v-model:roles="roles"></roles-card>
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

        const rs = [1,11,12,121,111,2,21,212];
        const obj = [{
            value:1,
            child:[{value:11,
                    child:[{value:111},{value:112}]
                },
                {value:12,
                    child:[{value:121},{value:122}]
                }]
        },
        {
            value:2,
            child:[{value:21,
                    child:[{value:211},{value:212}]
                }]
        }]
        const fun = (data)=>{
            const d:object[] = [];
            for(let i = 0; i<data.length; i++){
                const item = data[i];
                item.ids = [];
                console.log(item.value+':'+rs.includes(item.value));
                if(!rs.includes(item.value)){
                    continue;
                }
                if(item.child){
                    item.child = fun(item.child);
                }
                d.push(item);
            }
            return d;
        }   

        const roles = fun(obj);

        return {
            roles,
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