import { createRouter, createWebHashHistory } from "vue-router";

import home from "@/pages/home";
import switchs from "@/pages/switchs";

import login from "@/pages/login";

let routes = [{
        path: '/',
        redirect: '/login'
    },
    {
        path: '/home',
        component: home,
        children:[
            {
                path: 'equitmentButton',
                component: () => import('@/pages/EButton'),
                beforeEnter:(from, to,next)=>{
                    if (window.localStorage.getItem('token')){
                        next()
                    }
                    else {
                        alert("你还没有登录，请先登录")
        
                    }
                }
                
            },
            {
                path:'equitmentManagement',
                component:()=>import('@/pages/equimentManagement')
            },
            {
                path:'personalInfo',
                component:()=>import('@/pages/personalInfo'),
                beforeEnter:(from, to,next)=>{
                    if (window.localStorage.getItem('token')){
                        next()
                    }
                    else {
                        alert("你还没有登录，请先登录")
        
                    }
                }
             }

        ],
        beforeEnter:(from, to,next)=>{
            if (window.localStorage.getItem('token')){
                next()
            }
            else {
                alert("你还没有登录，请先登录")

            }
        }
    },
    {
        path:'/datav',
        component:()=>import('@/pages/datav'),
        beforeEnter:(from, to,next)=>{
            if (window.localStorage.getItem('token')){
                next()
            }
            else {
                alert("你还没有登录，请先登录")

            }
        }
    },
    {
        path: '/login',
        component: login
    },
     
    
];
let router = createRouter({
    history: createWebHashHistory(),
    routes
});
export default router;