const Layout = () => import('@/layout/index.vue')
const Database = () => import('@/views/database/index.vue')
export default {
  path: '/database',
  component: Layout,
  meta: {
    title: '数据库',
    icon: 'el-icon-s-cooperation',
    roles: [10]
  },
  children: [
    {
      path: '',
      component: Database,
      name: 'Database',
      meta: {
        title: '数据库列表',
        icon: 'el-icon-s-cooperation',
        roles: [101]
      }
    }
  ]
}
