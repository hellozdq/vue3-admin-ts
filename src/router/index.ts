import { createRouter, createWebHistory } from "vue-router";

const Layout = () => import('@/layout/index.vue');
const Redirect = () => import('@/views/redirect/index.vue');
const Login = () => import('@/views/login/index.vue');

import Home from './modules/home';
import User from './modules/user';
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
        Home,
        User,
        {
            path: '/login',
            component: Login,
            meta:{
                hidden: true,
                noShowTag:true
            }
        },
    ]
})

export const asyncRouter = [
    aboutRouter
]