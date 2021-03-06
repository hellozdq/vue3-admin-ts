const Layout = () => import('@/layout/index.vue')
const About = () => import('@/views/about/index.vue')
export default {
  path: '/about',
  component: Layout,
  meta: {
    title: '关于',
    icon: 'el-icon-s-cooperation',
    roles: [10]
  },
  children: [
    {
      path: '',
      component: About,
      name: 'About',
      meta: {
        title: '关于列表',
        icon: 'el-icon-s-cooperation',
        roles: [101]
      }
    }
  ]
}
