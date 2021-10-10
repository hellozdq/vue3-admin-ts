import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// 添加 Router type 可选参数
export type AppRouterRecordRaw = RouteRecordRaw & {
  hidden?: boolean
}

const Layout = () => import('@/layout/index.vue')
const Home = () => import('@/views/home/index.vue')
const Redirect = () => import('@/views/redirect/index.vue')
const Login = () => import('@/views/login/index.vue')
const NotPage = () => import('@/views/404.vue')

import UserRouter from './modules/user'
import AboutRouter from './modules/about'
import DatabaseRouter from './modules/database'
import RecordRouter from './modules/record'
import CustomRouter from './modules/custom'
import InsterestRouter from './modules/interest'

// 首页路由
const homePath = '/home'
localStorage.setItem('homePath', homePath)

/* 
routes 
path: 路由
componet: 组件
name: 组件名称
hidden：是否隐藏
meta: 自定义属性
    title: 标题
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
      hidden: true,
      meta: {},
      children: [
        {
          path: '/redirect/:path*',
          name: 'Redirect',
          component: Redirect,
          meta: {
            noShowTag: true
          }
        }
      ]
    },
    {
      path: '/',
      component: Layout,
      redirect: homePath,
      meta: {
        hiddenParent: true
      },
      children: [
        {
          path: homePath,
          component: Home,
          name: 'Home',
          meta: {
            title: '主页',
            icon: 'el-icon-s-home'
          }
        }
      ]
    },
    {
      path: '/login',
      component: Login,
      hidden: true,
      meta: {
        noShowTag: true
      }
    },
    {
      path: '/:pathMatch(.*)',
      component: NotPage,
      hidden: true,
      meta: {}
    }
  ] as AppRouterRecordRaw[]
})

export const asyncRouter = [UserRouter, DatabaseRouter, AboutRouter, RecordRouter, CustomRouter,InsterestRouter]
