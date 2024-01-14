import { createRouter, createWebHistory } from 'vue-router'


// Компоненты страниц

import LoginPage from './views/LoginPage.vue';
import LocationPage from './views/LocationPage.vue';

export default createRouter({
    // История переходов сохраняется
    history: createWebHistory(),


    // Роуты и компоненты
    routes: [
        {
            path: '/location',
            name: 'location',
            component: LocationPage,
        },
        {
            path: '/',
            name: 'login',
            component: LoginPage
        }
    ]
})