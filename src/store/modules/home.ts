type state = {
  name: string
}

const state: state = {
  name: 'storeName'
}

const mutations = {
  SET_NAME: (state: state, name: string) => {
    state.name = name
  }
}

const actions = {
  setName: ({ commit }, name: string) => {
    commit('SET_NAME', name)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
