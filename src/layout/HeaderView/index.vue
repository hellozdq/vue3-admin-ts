<template>
    <div class="head">
        <div class="left">
            <i class="el-icon-s-unfold" @click="handleCollapse(false)" v-show="isCollapse"></i>
            <i class="el-icon-s-fold" @click="handleCollapse(true)" v-show="!isCollapse"></i>
        </div>
        <div class="right">
            <el-dropdown class="drog">
                <span class="el-dropdown-link">
                    管理员<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>个人信息</el-dropdown-item>
                        <el-dropdown-item>修改密码</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
    <HeadTags></HeadTags>
</template>

<script>
import { defineComponent,computed } from "vue";
import HeadTags from "./HeadTags.vue"
import { useStore } from "vuex"

export default defineComponent({
    components:{
        HeadTags
    },
    setup(){
        const store = useStore();
        const isCollapse = computed(() => {
            return  store.state.layout.isCollapse;
        })
        const handleCollapse = (data) => {
            console.log(data)
            store.dispatch("layout/set_isCollapse",data);
        }
        return {
            isCollapse,
            handleCollapse
        }
    }
})
</script>

<style lang="scss" scoped>
.head{
    display: flex;
    justify-content: space-between;
    height: 50px;
    .left{
        display: flex;
        align-items: center;
        i{
            font-size: 20px;
            cursor: pointer;
        }
    }
    .right{
        display: flex;
        align-items: center;
        margin-right: 10px;
        .el-dropdown-link{
            cursor: pointer;
            margin: auto;
        }
}
}
</style>