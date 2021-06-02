type state = {
    isCollapse: Boolean,
    tagViews: Array<Object>,
}
type Route = {
  fullPath:String, 
  hash: String,
  matched: Array<Object>,
  meta: Object,
  name: String,
  params: Object,
  path: String,
  query: Object,
  redirectedFrom: any
}
const state:state = {
    isCollapse:false, //侧边栏是否收起
    tagViews:[],//tag导航的页面

}

import {toRaw} from 'vue'

const mutations = {
  // 是否收起侧边栏
  SET_ISCOLLAPSE: (state:state,data:Boolean) => {
    state.isCollapse = data;
  },
  // 添加tags
  ADD_TAGVIEWS: (state:state,data:Route) => {
    console.log("toRaw(state.tagViews)")
    console.log(toRaw(state.tagViews))
    console.log(data.path)
    const isExist = state.tagViews.some((item)=>{
      return item.path === data.path
    })
    
    if(isExist){ return false; };
    state.tagViews.push({...data});
    console.log(state.tagViews)
  },
  // 删除tags
  REMOVE_TAGVIEWS: (state:state,data:String) => {
    const index = state.tagViews.findIndex((item)=>{
      return item.path === data
    })
    state.tagViews.splice(index,1);
  }
}

const actions = {
  set_isCollapse:({ commit }, data:Boolean)=>{
    commit("SET_ISCOLLAPSE",data);
  },
  add_tagViews:({ commit }, data:Route)=>{
    commit("ADD_TAGVIEWS",data);
  },
  remove_tagViews:({ commit }, data:Route)=>{
    commit("REMOVE_TAGVIEWS",data);
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}