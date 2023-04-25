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
        component: home
    },
    {
        path: '/login',
        component: login
    },
    {
        path: '/switchs',
        component: switchs
    }
];
let router = createRouter({
    history: createWebHashHistory(),
    routes
});
export default router;