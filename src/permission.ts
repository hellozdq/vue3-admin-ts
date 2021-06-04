
// 设置权限
import router, { asyncRouter } from '@/router/index';
import { filterRoutes } from '@/common/permission'
import store from '@/store/index'
console.log(store)
localStorage.setItem("router","false")
router.beforeEach((to, from, next) => {
    if(localStorage.getItem("router") !== 'true'){
        const roles = store.state.user.roles;
        console.log('roles')
        console.log(roles)
        console.log(asyncRouter)
        const routes = filterRoutes(asyncRouter,roles)
        router.addRoute(asyncRouter[0]);
        router.options.routes = router.options.routes.concat(asyncRouter);
        
        localStorage.setItem("router","true")
        next({ ...to, replace: true })
    }else{
        next()
    }
    
})