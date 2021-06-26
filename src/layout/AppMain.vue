<template>
  <section class="main">
    <router-view v-slot="{ Component }">
        <transition>
          <keep-alive :include="caches" :exclude="['Redirect']">
              <component :is="Component" />
          </keep-alive>
        </transition>
    </router-view>
  </section>
</template>

<script>
import { computed, defineComponent, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default defineComponent ({
    setup(){
        const route = useRoute();
        const key = route.path;
        const store = useStore();
        const caches = computed(() => {
          return store.state.layout.caches;
        })

        return { key, caches }
    }
})
</script>

<style lang="scss" scoped>
.main{
  background: #fff;
  height: 100%;
  padding:10px;
  box-sizing: border-box;
}
</style>