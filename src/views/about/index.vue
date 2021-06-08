<template>
    <div>
        关于
    </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import { computed, defineComponent, ref } from 'vue'
export default defineComponent({
    name: "About",
    setup(props) {
        const name = ref("123");
        const router = useRouter();
        const toHome = ()=> {
            router.push("/home")
        }
        const edit = ()=> {
            name.value = "跳转"
        }
        return { name, toHome, edit };
    }
})
</script>