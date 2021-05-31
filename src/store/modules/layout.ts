type state = {
    isCollapse:Boolean
}

const state:state = {
    isCollapse:false
}

const mutations = {
  SET_ISCOLLAPSE: (state:state,data:Boolean) => {
      state.isCollapse = data
  }
}

const actions = {
  set_isCollapse:({ commit }, name:string)=>{
    commit("SET_ISCOLLAPSE",name)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}