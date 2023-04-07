// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        component: () => import("@/views/Home.vue"),
    },
    {
        path: "/lk",
        component: () => import("@/views/Home.vue"),
    },
    {
        path: "/diary",
        component: () => import("@/views/Diary.vue"),
    },
    {
        path: "/vacancies",
        component: () => import("@/views/Home.vue"),
    },
    {
        path: "/offers",
        component: () => import("@/views/Home.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;