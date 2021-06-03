<template>
    <div>
        <el-button @click="toHome">{{name}}</el-button>
        <el-button @click="edit">修改</el-button>
    </div>
</template>

<script>
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