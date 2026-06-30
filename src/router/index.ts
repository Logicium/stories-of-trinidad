import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import TourLocation from '@/views/TourLocation.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/location/:id',
      name: 'location',
      component: TourLocation
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // Restore on back/forward; otherwise always start a new page at the top.
    return savedPosition ?? { top: 0 }
  },
})

export default router
