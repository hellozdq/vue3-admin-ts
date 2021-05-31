<template>
    <div class="layout">
        <Sidebar/>
        <div class="content">
            <header-view/>
            <div  class="content_main" >
                <app-main/>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from "vue";
import AppMain from './AppMain.vue'
import Sidebar from './Sidebar/index.vue'
import HeaderView from './HeaderView/index.vue'

export default defineComponent ({
    components:{
        AppMain,
        Sidebar,
        HeaderView
    },
    setup(){
        
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