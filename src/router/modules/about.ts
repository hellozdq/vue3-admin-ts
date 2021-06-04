const Layout = () => import('@/layout/index.vue');
const About = () => import('@/views/About/index.vue');
export default {
    path: '/about',
    component: Layout,
    meta:{
        title: "关于",
        icon:'el-icon-s-shop',
        roles: ["admin"]
    },
    children:[
        {
            path: '',
            component: About,
            name:"About",
            meta:{
                title: "关于列表",
                icon:'el-icon-s-shop',
                roles: ["admin"]
            },
        },
    ]
}