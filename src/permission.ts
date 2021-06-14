
// 设置权限
import router, { asyncRouter } from '@/router/index';
import { filterRoutes } from '@/common/permission'
// import store from '@/store/index'
import { cusLocalStorage } from '@/common/index';

cusLocalStorage.set('router',true);
const whiteList = ['/login']; //白名单
router.beforeEach((to, from, next) => {
    if(whiteList.includes(to.path)){
        return next();
    }
    if(!cusLocalStorage.get('accountId')){
        router.push('/login');
    }
    if(cusLocalStorage.get('router')){
        // 动态路由添加
        const roles = ['admin'];
        const routes = filterRoutes(asyncRouter,roles);
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