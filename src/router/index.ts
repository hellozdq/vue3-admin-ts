import { createRouter, createWebHistory } from "vue-router";

const Layout = () => import('@/layout/index.vue');
const Redirect = () => import('@/views/redirect/index.vue');
const Home = () => import('@/views/Home/index.vue');
const Login = () => import('@/views/login/index.vue');
import aboutRouter from './modules/about';


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
    roles:["admin"] //权限
*/
// 首页路由
const homePath = '/home';
localStorage.setItem('homePath',homePath);

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
        path: '/redirect',
        component: Layout,
        meta:{
            hidden: true,
        },
        children: [
                {
                    path: '/redirect/:path*',
                    name:'Redirect',
                    component: Redirect,
                    meta:{
                        noShowTag:true
                    }
                }
            ]
        },
        {
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
        },
        {
            path: '/login',
            component: Login,
            meta:{
                hidden: true,
                noShowTag:true
            }
        }
    ]
})

export const asyncRouter = [
    aboutRouter
]