const Layout = () => import('@/layout/index.vue')
const Custom = () => import('@/views/custom/index.vue')
export default {
  path: '/custom',
  component: Layout,
  meta: {
    title: '自定义',
    icon: 'el-icon-s-cooperation',
    roles: []
  },
  children: [
    {
      path: '',
      component: Custom,
      name: 'Custom',
      meta: {
        title: '自定义表单',
        icon: 'el-icon-s-cooperation',
        roles: []
      }
    }
  ]
}
