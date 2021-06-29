const Layout = () => import('@/layout/index.vue')
const Record = () => import('@/views/record/index.vue')
const RecordSet = () => import('@/views/record/set.vue')
export default {
  path: '/record',
  component: Layout,
  meta: {
    title: '记录',
    icon: 'el-icon-s-order',
    roles: [11]
  },
  children: [
    {
      path: '',
      component: Record,
      name: 'Record',
      meta: {
        title: '记录列表',
        icon: 'el-icon-s-order',
        roles: [111]
      }
    },
    {
      path: 'set',
      component: RecordSet,
      name: 'RecordSet',
      meta: {
        title: '记录设置',
        icon: 'el-icon-s-order',
        roles: [112]
      }
    }
  ]
}
