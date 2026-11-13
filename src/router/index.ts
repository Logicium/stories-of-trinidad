import { createRouter, createWebHistory } from 'vue-router'
import { notFoundRoute, publicRoutes } from '@/routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // The home page and every tour stop, each with its SEO record (src/routes.ts)
  routes: [...publicRoutes, notFoundRoute],
  scrollBehavior(to, from, savedPosition) {
    // Restore on back/forward; otherwise always start a new page at the top.
    return savedPosition ?? { top: 0 }
  },
})

export default router
