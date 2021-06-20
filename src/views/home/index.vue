<template>
    <div>
        {{name2}}
        <text-com v-model:name="name2.name"></text-com>
    </div>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { computed, defineComponent, ref,reactive } from 'vue'
import TextCom from './components/TextCom.vue'

export default defineComponent({
    name: "Home",
    components:{TextCom},
    setup(props) {
        const store = useStore();
        const name = computed(() => store.state.home.name);
        const name2 = reactive({name:{name:'a222'}});
        function setStoreName(name){
            // name2.value = name;
            store.dispatch('home/setName',name)
        }
        return { name, name2, setStoreName };
    }
})
</script>