import { createRouter, createWebHistory } from "vue-router";

/* 
routes 
path: 路由
componet: 组件
name: 组件名称
meta: 自定义属性
    title: 标题
    hidden：是否隐藏
    icon：图标
    hiddenParent: 隐藏当前级（当只有一个子元素且为true时只显示children子级的数据）
    noShowTag: 不需要显示在tag上
*/
// 首页路由
const homePath = '/home';
localStorage.setItem('homePath',homePath);

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
        path: '/redirect',
        component: () => import('@/layout/index.vue'),
        meta:{
            hidden: true,
        },
        children: [
                {
                    path: '/redirect/:path*',
                    name:'Redirect',
                    component: () => import('@/views/redirect/index.vue'),
                    meta:{
                        noShowTag:true
                    }
                }
            ]
        },
        {
            path: '/',
            component:() => import('@/layout/index.vue'),
            redirect:homePath,
            meta:{
                hiddenParent:true
            },
            children:[
                {
                    path: homePath,
                    component:() => import('../views/home/index.vue'),
                    name:"Home",
                    meta:{
                        title: "主页",
                        icon: "el-icon-s-shop"
                    },
                },
            ]
        },
        {
            path: '/about',
            component:() => import('@/layout/index.vue'),
            meta:{
                title: "关于",
                icon:'el-icon-s-shop'
            },
            children:[
                {
                    path: '',
                    component:() => import('../views/about/index.vue'),
                    name:"About",
                    meta:{
                        title: "关于列表",
                        icon:'el-icon-s-shop'
                    },
                },
            ]
        },
        {
            path: '/login',
            component:() => import('../views/home/index.vue'),
            meta:{
                hidden: true,
                noShowTag:true
            }
        }
    ]
})