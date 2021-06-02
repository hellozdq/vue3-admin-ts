
<template>
    <el-tabs v-model="tagViewsValue" type="card" closable @tab-remove="removeTab">
        <el-tab-pane
            v-for="item in tagViews"
            :key="item.path"
            :label="item.meta.title"
            :name="item.path"
        >
        </el-tab-pane>
    </el-tabs>
</template>

<script lang="ts">
import { computed, defineComponent,ref, watch } from "vue";
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
    setup(){
        const store = useStore();
        const tagViews = computed(()=>{
            return store.state.layout.tagViews;   
        })
        const route = useRoute();
        let tagViewsValue = ref("/");
        watch(()=>route.path,(newVal,oldVal)=>{
            console.log("-------------->>1")
            tagViewsValue.value = newVal;
        })
        
        const removeTab = (targetPath) => {
            store.dispatch("layout/remove_tagViews",targetPath);
        }
        return { 
            tagViews,
            tagViewsValue,
            removeTab
        }
    }
})
</script>

<style>

</style>
