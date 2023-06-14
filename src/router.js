import { createRouter, createWebHistory } from 'vue-router'
import FriendsPage from './views/FriendsPage.vue'
import UserPage from './views/UserPage.vue'
import FeedPage from './views/FeedPage.vue'

export default createRouter({
    history: createWebHistory(),

    routes: [
        {
            path: '/',
            name: 'profile',
            component: UserPage
        },
        {
            path: '/friends',
            name: 'friends',
            component: FriendsPage
        },
        {
            path: '/user/:username',
            name: 'user',
            component: UserPage
        },
        {
            path: '/feed',
            name: 'feed',
            component: FeedPage
        }
    ]
})