
// 设置权限
import router, { asyncRouter } from '@/router/index';
import { filterRoutes } from '@/common/permission'
import store from '@/store/index'
import { cusLocalStorage } from '@/common/index';

cusLocalStorage.set("router",true);
router.beforeEach((to, from, next) => {
    if(cusLocalStorage.get("router")){
        // 动态路由添加
        const roles = store.state.user.roles;
        const routes = filterRoutes(asyncRouter,roles)
        for(let i in routes){
            router.addRoute(asyncRouter[i]);
        }
        router.options.routes = router.options.routes.concat(asyncRouter);
        cusLocalStorage.set("router",false);
        next({ ...to, replace: true });
    }else{
        next()
    }
    
})