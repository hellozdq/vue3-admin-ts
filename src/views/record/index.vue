<template>
    <div class="container">
        <div class="title">记录列表</div>
        <el-button type="primary" v-if="roles[0]==='admin'||roles.includes(11101)">新增</el-button>
        <el-button type="primary" v-if="roles[0]==='admin'||roles.includes(11102)">修改</el-button>
        <el-button type="primary" v-if="roles[0]==='admin'||roles.includes(11103)">删除</el-button>
    </div>
</template>

<script lang="ts">
import {  defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
    name: "Record",
    setup(props) {
        const store = useStore();
        const roles = ref(store.state.user.roles);
        return { roles };
    }
})
</script>

<style lang="scss" scoped>
.container{
    .title{
        font-size: 24px;
        margin-bottom: 20px;
    }
}
</style>