type state = {
    isCollapse: Boolean,
    tagViews: Array<Object>
}

const state:state = {
    isCollapse:false, //侧边栏是否收起
    tagViews:[],//tag导航的页面
}

const mutations = {
  SET_ISCOLLAPSE: (state:state,data:Boolean) => {
      state.isCollapse = data;
  },
  ADD_TAGVIEWS: (state:state,data:Object) => {
      state.tagViews.push(data);
  }
}

const actions = {
  set_isCollapse:({ commit }, data:Boolean)=>{
    commit("SET_ISCOLLAPSE",data);
  },
  add_tagViews:({ commit }, data:Object)=>{
    commit("ADD_TAGVIEWS",data);
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}