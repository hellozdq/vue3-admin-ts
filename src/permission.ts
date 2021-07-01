// 设置权限
import router, { asyncRouter } from '@/router/index'
import { filterRoutes } from '@/common/permission'
import { cusLocalStorage } from '@/common/index'
import store from '@/store/index'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // progress bar style

cusLocalStorage.set('router', true) //判断是否添加了路由
const whiteList = ['/login'] //白名单

NProgress.configure({ showSpinner: false })

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  if (whiteList.includes(to.path)) {
    return next()
  }
  const user = cusLocalStorage.get('user')
  if (!user) {
    router.push('/login')
  }
  if (cusLocalStorage.get('router')) {
    // 获取状态
    await store.dispatch('user/setRoles', user.id)
    const roles = store.state.user.roles

    // 动态路由添加
    let routes: any = []
    if (roles[0] == 'admin') {
      routes = asyncRouter
    } else {
      routes = filterRoutes([...asyncRouter], roles)
    }
    for (let i in routes) {
      router.addRoute(routes[i])
    }
    router.options.routes = router.options.routes.concat(routes)
    cusLocalStorage.set('router', false)
    next({ ...to, replace: true })
    NProgress.done()
  } else {
    next()
    NProgress.done()
  }
})

router.afterEach(() => {
  NProgress.done()
})
