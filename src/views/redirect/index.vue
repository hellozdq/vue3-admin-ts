<template>
    
</template>
<script>
  import { defineComponent } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  export default defineComponent({
    name:"Redirect",
    setup(){
      console.log("---------->>1redirct")
      const router = useRouter();
      const route = useRoute();
      router.replace("/"+route.params.path.join("/"));
    }
  })

</script>