type stateTy = {
    name:string
}

const state:stateTy = {
    name:'storeName'
}

const mutations = {
  SET_NAME: (state:stateTy,name:string) => {
      state.name = name
  }
}

const actions = {
  setName:({ commit }, name:string)=>{
    commit("SET_NAME",name)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}