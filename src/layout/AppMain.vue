<template>
  <section class="main">
    <router-view v-slot="{ Component }">
        <transition>
            <component :is="Component" />
        </transition>
    </router-view>
  </section>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";

export default defineComponent ({
    setup(){
        const route = useRoute();
        const key = route.path
        return { key }
    }
})
</script>

<style lang="scss" scoped>
.main{
  background: #fff;
  height: 100%;
}
</style>