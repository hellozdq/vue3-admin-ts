<template>
    <div v-loading="roleLoading">
        <div class="roleForm">
            <roles-card v-model:roles="roles"  v-model:parentIds="ids" :parentId="roleId"></roles-card>
        </div>
        <div class="footer">
            <span class="dialog-footer">
                <el-button type="primary" size="medium" @click="confirm" :loading="loading">确 定</el-button>
                <el-button size="medium" @click="cancel">取 消</el-button>
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRaw } from 'vue';
import { ElMessage } from 'element-plus';

import { updateRole, UpdateRoleQuery, getRoles } from '@/api/user'
import RolesCard from './RolesCard.vue'

export default defineComponent({
    name:"RolesForm",
    props:{
        userForm:{
            type:Object,
            required:true
        },
        dialogRolesVisible:{
            type:Boolean,
            required:true
        }
    },
    components: { RolesCard },
    setup(props,context){
        // loading
        const loading = ref(false);
        const roleLoading = ref(false);
        const getIds = (data) => {
            let ids = data.ids;
            if(data.children){
                for(let i in data.children){
                    const item = data.children[i];
                    if(item.children){
                        const childIds = getIds(item);
                        ids = [...ids,...childIds];
                    }
                }
            }
            return ids;
        }

        // 保存
        const confirm = () => {
            const arr = getIds(toRaw(roles.value));
            const from:UpdateRoleQuery = {
                userId:props.userForm.id,
                roles:arr.join(',')
            }
            loading.value = true;
            updateRole(from).then(() => {
                loading.value = false;
                ElMessage.success("修改成功！");
                context.emit("update:dialogRolesVisible",false);
                context.emit("onSearch");
            }).catch(()=>{
                loading.value = false;
            })
            
        }

        const cancel = () => {
            context.emit("update:dialogRolesVisible",false);
        }

        const oldRoles = props.userForm.roles.split(",").map((item)=>{
            return Number(item);
        });
        console.log(oldRoles)
        let roles:any = ref([]);
        const searchRoles = () => {
            roleLoading.value = true;
            getRoles().then((res)=> {
                roleLoading.value = false;
                const data = res.data;
                roles.value = handleData({roleId:0,ids:[],children:data});
            }).catch(()=>{
                roleLoading.value = false;
            })
        } 
        searchRoles();

        const handleData = (data) => {
            if(data.children){
                data.ids = [];
                if(data.children){
                    for(let i in data.children){
                        const item= {...data.children[i]};
                        if(oldRoles.includes(item.roleId)){
                            data.ids.push(item.roleId);
                        }
                        data.children[i] = handleData(item);
                    }

                }
            }
            return data;
        }   

        
        
        const ids = ref([])
        const roleId = ref(0)
        return {
            roles,
            confirm,
            cancel,
            roleId,
            ids,
            loading,
            roleLoading
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