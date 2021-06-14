type state = {
    roles: Array<string>
}

const state: state = {
    roles: ['admin']
}

const mutations = {
    // SET_ROLES: (state: state, data: Array<string>) => {
    //     state.roles = data;
    // },
    // GET_INFO: (state: state, data: Array<string>) => {
    //     state.roles = data;
    // }
}

const actions = {
    // setRoles: ({ commit }, data: Array<string>) => {
    //     commit("SET_ROLES", data);
    // },
    // getInfo: ({ commit }, data: Array<string>) => {
    //     commit("GET_INFO", ["admin"]);
    // }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}