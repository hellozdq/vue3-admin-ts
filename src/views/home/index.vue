<template>
    <div>
        主页3
    </div>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
    name: "Home",
    setup(props) {
        const store = useStore();
        const name = computed(() => store.state.home.name);
        const name2 = ref("测试----1111>");
        function setStoreName(name){
            name2.value = name;
            store.dispatch('home/setName',name)
        }
        return { name, name2, setStoreName };
    }
})
</script>