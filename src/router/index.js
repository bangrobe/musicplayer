import { createRouter, createWebHistory } from 'vue-router'
// import Home from '@/views/Home.vue'
// import Manage from '@/views/Manage.vue'
// import Song from '@/views/Song.vue'
// import Timing from '@/views/Timing.vue'
import useUserStore from '@/stores/user'

const Home = () => import("@/views/Home.vue")
const Manage = () => import("@/views/Manage.vue")
const Song = () => import("@/views/Song.vue")
const About = () => import('@/views/About.vue')
const routes = [
    {
        name: "home",
        path: "/",
        component: Home
    },
    {
        name: "about",
        path: "/About",
        component: About
    },
    {
        name: "manage",
        alias: "/manage",
        path: "/manage-music",
        component: Manage,
        meta: {
            requiresAuth: true
        }
    },
    {
        name: 'song',
        path: '/song/:id',
        component: Song
    },
    // {
    //     path: '/manage',
    //      redirect: {name: 'manage'}
    // },
    {
        path: "/:catchAll(.*)*",
        redirect: { name: "home" },
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    linkActiveClass: "text-yellow-500"
})

router.beforeEach((to, from, next)=> {
    if (!to.meta.requiresAuth) {
        next();
        return;
    }
    const store = useUserStore();
    if(store.userLoggedIn) {
        next();
    } else {
        next({name: 'home'})
    }
})

export default router;