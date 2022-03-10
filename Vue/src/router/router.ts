import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

import Home from '../views/Home.vue';
import Welcome from '../views/Welcome.vue';

export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: Welcome,
    },
    {
        path: '/home',
        component: Home,
    },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});