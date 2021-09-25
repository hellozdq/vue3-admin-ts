import { ref } from 'vue'
import { useStore } from 'vuex'
export function getRoles() {
  const store = useStore()
  const roles = ref(store.state.user.roles)
  return roles
}
