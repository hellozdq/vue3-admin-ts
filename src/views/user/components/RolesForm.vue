<template>
    <div class="roleForm">
        <roles-card v-model:roles="roles"></roles-card>
    </div>
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
            console.log(roles)
            return
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
        const obj = {
            value:0,
            child:[{
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
            }]}
        const fun = (data)=>{
            if(data.child){
                data.ids = [];
                if(data.child){
                    for(let i in data.child){
                        const item= {...data.child[i]};
                        if(rs.includes(item.value)){
                            data.ids.push(item.value);
                        }
                        data.child[i] = fun(item);
                    }

                }
            }
            return data;
        }   
        console.log(fun(obj))
        const roles = reactive(fun(obj));
        // const arr = fun([...obj]);
        // const roles = {child:arr,ids:[]}
        // console.log(obj);
        // console.log(roles);

        return {
            roles,
            confirm,
            cancel
        }
    }
})
</script>

<style lang="scss" scoped>
.roleForm{
    max-height: 300px;
    overflow: auto;
}
.footer{
    margin-top: 30px;
    margin-left: 30px;
}
</style>