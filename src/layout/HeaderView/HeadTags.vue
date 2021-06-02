
<template>
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
            if(path != tagViewsValue){
                router.push(path);
            }
        }

        return { 
            tagViews,
            tagViewsValue,
            handleTab,
            removeTab
        }
    }
})
</script>

<style>

</style>
