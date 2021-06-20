<template>
    <div class="item-content">
        <el-checkbox-group v-model="roles.ids">
            <div class="checkCard" :class="item.child?'':'lastItem'" v-for="(item,index) in roles.child" :key="item.value">
                <el-checkbox :label="item.value">{{item.value}}</el-checkbox>
                <roles-card v-if="item.child" v-model:roles="roles.child[index]"></roles-card>
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
            default:{ids:[]}
        },
    },
    setup(props,context){
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
    padding: 10px;
}
.lastItem{
    display:inline-block;
    margin-right: 20px;
}
</style>