<template>
    <div class="layout">
        <Sidebar/>
        <div class="content">
            <header-view/>
            <div class="content_main" >
                <app-main/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import { useRoute,useRouter } from "vue-router";
import { useStore } from "vuex";
import AppMain from './AppMain.vue'
import Sidebar from './Sidebar/index.vue'
import HeaderView from './HeaderView/index.vue'
// import path from 'path'
// console.log(path.resolve("/"));

export default defineComponent ({
    components:{
        AppMain,
        Sidebar,
        HeaderView
    },
    setup(){
        const route = useRoute();
        const router = useRouter();
        const store = useStore();
        const homePath = localStorage.getItem('homePath') || '';
        store.dispatch("layout/add_tagViews",router.resolve(homePath));
        store.dispatch("layout/add_tagViews",router.resolve(route.path == '/' ? homePath : route.path));
        // 监听路由变化 每次变化添加一次tag;
        watch(() => route.path,()=>{
            if(route.meta && route.meta.noShowTag){
                return;
            }
            store.dispatch("layout/add_tagViews",route);
        })  
    }
})
</script>

<style lang="scss" scoped>
.layout{
    display: flex;
    justify-content: left;
    width: 100%;
    height: 100%;
    .content{
        display: flex;
        flex-direction: column;
        flex: 1;
        padding: 0 10px;
        &_main{
            background: #f5f5f5;
            padding: 10px;
            flex: 1;
        }
    }
}
</style>