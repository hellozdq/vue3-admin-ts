type state = {
    isCollapse: boolean,
    tagViews: Array<Object>,
    caches:Array<string>
}
type Route = {
  fullPath:string, 
  hash: string,
  matched: Array<Object>,
  meta: Object,
  name: string,
  params: Object,
  path: string,
  query: Object,
  redirectedFrom: any
}
const state:state = {
    isCollapse:false, //侧边栏是否收起
    tagViews:[],//tag导航的页面
    caches:[]// 组件缓存（使用组件name）

}

const mutations = {
  // 是否收起侧边栏
  SET_ISCOLLAPSE: (state:state,data:boolean) => {
    state.isCollapse = data;
  },
  // 添加tags
  ADD_TAGVIEWS: (state:state,data:Route) => {
    const isExist = state.tagViews.some((item)=>{
      return item.path === data.path
    })
    
    if(isExist){ return false; };
    state.tagViews.push({...data});
  },
  // 删除tags
  REMOVE_TAGVIEWS: (state:state,data:string) => {
    const index = state.tagViews.findIndex((item)=>{
      return item.path === data
    })
    state.tagViews.splice(index,1);
  },

  // 添加缓存
  ADD_CACHES: (state:state, data:string) => {
    const isExist = state.caches.some((item)=>{
      return item === data
    })
    if(isExist){
      return
    }
    state.caches.push(data);
  },
  // 删除缓存
  REMOVE_CACHES: (state:state, data:string) => {
    const index = state.caches.findIndex((item)=>{
      return item === data
    })
    state.caches.splice(index,1);
  }
}

const actions = {
  // 是否收起侧边栏
  set_isCollapse:({ commit }, data:boolean)=>{
    commit("SET_ISCOLLAPSE",data);
  },
  // 添加tags
  add_tagViews:({ commit }, data:Route)=>{
    commit("ADD_TAGVIEWS",data);
    commit("ADD_CACHES",data.name);
  },
  // 删除tags
  remove_tagViews:({ commit }, data:Route)=>{
    commit("REMOVE_TAGVIEWS",data);
    commit("REMOVE_CACHES",data.name);
  },
  // 添加缓存
  add_caches:({ commit }, data:string)=>{
    commit("ADD_CACHES",data);
  },
  // 删除缓存
  remove_caches:({ commit }, data:string)=>{
    commit("REMOVE_CACHES",data);
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}