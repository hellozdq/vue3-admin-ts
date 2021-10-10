const Layout = () => import('@/layout/index.vue')
const Head = () => import('@/views/interest/head.vue')
export default {
  path: '/interest',
  component: Layout,
  meta: {
    title: '兴趣',
    icon: 'el-icon-s-cooperation',
    roles: []
  },
  children: [
    {
      path: '',
      component: Head,
      name: 'Head',
      meta: {
        title: '头像',
        icon: 'el-icon-s-cooperation',
        roles: []
      }
    }
  ]
}
