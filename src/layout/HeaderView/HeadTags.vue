
<template>
    <div class="tab">
        <el-tabs v-model="tagViewsValue" type="card" :closable="false"  @tab-click="handleTab" @tab-remove="removeTab">
            <el-tab-pane
                v-for="(item,index) in tagViews"
                :closable="index!=0"
                :key="item.path"
                :label="item.meta.title"
                :name="item.path"
            >
            </el-tab-pane>
        </el-tabs>
        <div class="right">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <i class="el-icon-arrow-down"></i>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="closeCurrent">关闭当前页</el-dropdown-item>
                        <el-dropdown-item @click="closeOther">关闭其他页</el-dropdown-item>
                        <el-dropdown-item @click="closeAll">关闭所有页</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent,ref, watch, toRaw } from "vue";
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
    setup(){
        // 获取tagViews数据
        const store = useStore();
        const tagViews = computed(()=>{
            return store.state.layout.tagViews;   
        })

        // 监听路由路径route,选中tab
        const route = useRoute();
        // 当前路由
        let tagViewsValue = ref(route.path);
        watch(()=>route.path,(newVal,oldVal)=>{
            tagViewsValue.value = newVal;
        })
        
        const router = useRouter();

        // 移除标签tab
        const removeTab = (targetPath) => {
            let index = tagViews.value.findIndex((item)=> {
                return item.path === targetPath;
            })
            index = index - 1 < 0 ? 1 : index - 1;
            router.push(tagViews.value[index].path);
            store.dispatch("layout/remove_tagViews",targetPath);
        }
        
        // 点击tab
        const handleTab = (tag)=> {
            const path = tag.props.name;
            router.push(path);
        }

        // 关闭当前页
        const closeCurrent = () => {
            if(tagViews.value.length>1){
                removeTab(route.path);
            }
            
        }

        // 关闭其他页
        const closeOther = () => {
            console.log(tagViewsValue)
            const tags = tagViews.value.filter((item)=>{
                return item.path !== tagViewsValue.value;
            })
            for(let i = 1; i < tags.length; i++){
                store.dispatch("layout/remove_tagViews",tags[i]);
            }
        }

        // 关闭所有页
        const closeAll = () => {
            const tags = tagViews.value
            router.push(tags[0].path);
            for(let i = 1; i < tags.length; i++){
                store.dispatch("layout/remove_tagViews",tags[i]);
            }
        }

        return { 
            tagViews,
            tagViewsValue,
            handleTab,
            removeTab,
            closeCurrent,
            closeOther,
            closeAll
        }
    }
})
</script>

<style lang="scss" scoped>
.tab{
    display:flex;
    justify-content: space-between;
    .right{
        padding: 0 15px;
        display: flex;
        align-items: center;
        border-left: solid 1px #E4E7ED;
        border-top: solid 1px #E4E7ED;
        border-right: solid 1px #E4E7ED;
        border-top-right-radius: 4px;
        border-top-left-radius: 4px;
        i{
            font-size: 20px;
        }
    }
}
</style>

<style>
.tab .el-tabs__header{
    margin:0;
}
.tab .el-tabs{
    flex: 1;
}
</style>

