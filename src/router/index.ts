import { createRouter, createWebHistory } from "vue-router";
 
export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component:() => import('../views/home/index.vue'),
            name:"Home",
            meta:{
                title: "主页",
                hidden: false
            },
        },
        {
            path: '/home',
            component:() => import('../views/home/index.vue'),
            name:"Home1",
            meta:{
                title: "1",
                hidden: false
            },
            children:[
                {
                    path: '/about',
                    component:() => import('../views/home/index.vue'),
                    name:"About",
                    meta:{
                        title: "1-2",
                        hidden: false
                    },
                },
            ]
        }
    ]
})