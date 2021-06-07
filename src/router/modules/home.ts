const Layout = () => import('@/layout/index.vue');
const Home = () => import('@/views/home/index.vue');

// 首页路由
const homePath = '/home';
localStorage.setItem('homePath',homePath);
export default {
    path: '/',
    component: Layout,
    redirect:homePath,
    meta:{
        hiddenParent:true
    },
    children:[
        {
            path: homePath,
            component:Home,
            name:"Home",
            meta:{
                title: "主页",
                icon: "el-icon-s-shop"
            },
        },
    ]
}