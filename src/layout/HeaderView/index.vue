<template>
    <div class="head">
        <div class="left">
            <div class="fold">
                <i class="el-icon-s-unfold" @click="handleCollapse(false)" v-show="isCollapse"></i>
                <i class="el-icon-s-fold" @click="handleCollapse(true)" v-show="!isCollapse"></i>
            </div>
            <div class="refresh">
                <i class="el-icon-refresh-right" @click="handleRefresh"></i>
            </div>
        </div>
        <div class="right">
            <el-dropdown class="drog">
                <span class="el-dropdown-link">
                    管理员<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="edit">修改密码</el-dropdown-item>
                        <el-dropdown-item @click="logOut">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
    <head-tags></head-tags>

    <!-- 修改密码 start -->
    <el-dialog
        title="修改密码"
        v-model="dialogVisible"
        :close-on-click-modal="false"
        width="500px"
        >
        <edit-pass v-model:dialogVisible="dialogVisible" :userId="1"></edit-pass>  
    </el-dialog>
    <!-- 修改密码 end -->
</template>

<script>
import { defineComponent, computed, ref } from "vue";
import { useRouter,useRoute } from "vue-router"
import { useStore } from "vuex"

import HeadTags from "./HeadTags.vue"
import { ElMessageBox, ElMessage } from 'element-plus';
import EditPass from "@/views/user/components/EditPass.vue";

export default defineComponent({
    components:{
        HeadTags,
        EditPass
    },
    setup(){
        const store = useStore();
        const router = useRouter();
        const route = useRoute();

        // 动态监听收缩侧边栏
        const isCollapse = computed(() => {
            return  store.state.layout.isCollapse;
        })

        // 收缩侧边栏
        const handleCollapse = (data) => {
            store.dispatch("layout/set_isCollapse",data);
        }

        // 刷新
        const handleRefresh = () => {
            store.dispatch("layout/remove_caches", route.name);
            router.replace("/redirect" + route.path);
        }

        // 修改密码
        let dialogVisible = ref(false);
        const edit = () => {
            dialogVisible.value = true;
        }

        // 退出登录
        const logOut = () => {
            ElMessageBox.confirm('您确定要退出登录？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
            }).then(() => {
                localStorage.removeItem('token');
                localStorage.removeItem('accountId');
                router.replace('/login');
            }).catch(() => {
                
            })
        }

        return {
            isCollapse,
            handleCollapse,
            handleRefresh,
            dialogVisible,
            edit,
            logOut
        }
    }
})
</script>

<style lang="scss" scoped>
.head{
    display: flex;
    justify-content: space-between;
    height: 50px;
    flex-shrink: 0;
    .left{
        display: flex;
        align-items: center;
        .fold{
            margin-right: 15px;
        }
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