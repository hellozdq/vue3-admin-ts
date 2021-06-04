<template>
    <div>
        <div>{{name}}</div>
        <div>{{name2}}</div>
        <el-button @click="setStoreName('name2')">按钮</el-button>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
    name: "Home",
    setup(props) {
        const store = useStore();
        const name = computed(() => store.state.home.name);
        const name2 = ref("测试---->");
        function setStoreName(name){
            name2.value = name;
            store.dispatch('home/setName',name)
        }
        return { name, name2, setStoreName };
    }
})
</script>