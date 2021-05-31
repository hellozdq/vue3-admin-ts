<template>
    <div>
        <!-- <div>{{name}}</div>
        <button @click="setStoreName('name2')">按钮</button>
        <el-button>qewe</el-button> -->
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, defineComponent } from 'vue'
export default defineComponent({
    setup(props) {
        const store = useStore();
        const name = computed(() => store.state.home.name);
        function setStoreName(name){
            store.dispatch('home/setName',name)
        }
        return { name , setStoreName };
    }
})
</script>