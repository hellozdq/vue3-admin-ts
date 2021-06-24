import { getUserRoles } from '@/api/user';

type state = {
    roles: Array<string|number>
}

const state: state = {
    roles: []
}

const mutations = {
    SET_ROLES: (state: state, data: Array<string|number>) => {
        state.roles = data;
    }
}

const actions = {
    setRoles: async ({ commit }, data: number) => {
        const res = await getUserRoles({userId:data});
        let roles:Array<string|number> = [];
        if(res.data == 'admin'){
            roles = ['admin']
        }else{
            roles = res.data.split(',').map((item)=>{
                return Number(item);
            })
        }
        commit("SET_ROLES", roles);
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}