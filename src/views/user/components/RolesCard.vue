<template>
    <div class="item-content">
        <el-checkbox-group v-model="roles.ids">
            <div class="checkCard" :class="item.children?'':'lastItem'" v-for="(item,index) in roles.children" :key="item.roleId">
                <el-checkbox :label="item.roleId">{{item.roleName}}</el-checkbox>
                <roles-card v-if="item.children" v-model:roles="roles.children[index]" v-model:parentIds="roles.ids" :parentId="item.roleId"></roles-card>
            </div>
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
            default:{
                ids:[]
            }
        },
        parentIds:{
            type:Array,
            required:true
        },
        parentId:{
            type:Number,
            required:true
        }
    },
    setup(props,context){
        watch(()=> props.roles.ids,()=>{
            // console.log("--------------<<<");
            // const isExist = props.parentIds.includes(props.parentId);
            
            // console.log(isExist);
            // if(!isExist){
            //     const ids = props.parentIds;
            //     ids.push(props.parentId)
            //     context.emit("update:parentIds",ids);
            // }
        })
        // const roleItem = reactive(props.roles);
        // const handleCheckedChange = (e) => {
        //     console.log("----------1")
        //     // context.emit("update:roles",roleItem);
        // }
        // watch(roleItem,()=>{
        //     console.log("-----------------")
        // });
        return {
            // roleItem,
            // handleCheckedChange
        }
    }
})
</script>

<style lang="scss" scoped>
.item-content{
    padding: 10px 0 10px 20px;
    // border-bottom: solid 1px #f2f2f2;
}
.checkboxItem{
    border-bottom: solid 1px #f2f2f2;
    margin: 10px;
}
.lastItem{
    display:inline-block;
    margin-right: 20px;
}
</style>