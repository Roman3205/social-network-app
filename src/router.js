import { createRouter, createWebHistory } from 'vue-router'
import FriendsPage from './views/FriendsPage.vue'
import UserPage from './views/UserPage.vue'
import FeedPage from './views/FeedPage.vue'
import AppEnter from './views/AppEnter.vue'
import AppRegister from './views/AppRegister.vue'
import NotFoundPage from './views/NotFoundPage.vue'
import ChatsPage from './views/ChatsPage.vue'

export default createRouter({
    history: createWebHistory(),

    routes: [
        {
            path: '/profile',
            name: 'profile',
            component: UserPage
        },
        {
            path: '/friends',
            name: 'friends',
            component: FriendsPage
        },
        {
            path: '/user/:id',
            name: 'user',
            component: UserPage
        },
        {
            path: '/feed',
            name: 'feed',
            component: FeedPage
        },
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'login',
            component: AppEnter
        },
        {
            path: '/register',
            name: 'register',
            component: AppRegister
        },
        {
            path: '/messages',
            name: 'messages',
            component: ChatsPage
        },
        {
            path: '/:pathMatch(.*)',
            name: 'not-found',
            component: NotFoundPage
        }
    ]
})