<template>
    <div>
        关于2
    </div>
</template>

<script lang="ts">
console.log("===========>>11111");
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