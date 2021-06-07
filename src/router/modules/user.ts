const Layout = () => import('@/layout/index.vue');
const User = () => import('@/views/user/index.vue');
export default {
    path: '/user',
    component: Layout,
    meta:{
        title: "用户",
        icon:'el-icon-s-shop',
        roles: ["admin"]
    },
    children:[
        {
            path: '',
            component: User,
            name:"Roles",
            meta:{
                title: "用户列表",
                icon:'el-icon-s-shop',
                roles: ["admin"]
            },
        },
    ]
}