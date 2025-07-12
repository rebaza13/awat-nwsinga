import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// Import page components
import HomePage from '../components/home/HomePage.vue'
import HousesPage from '../pages/HousesPage.vue'
import BuildingsPage from '../pages/BuildingsPage.vue'

/**
 * Define application routes
 * Each route maps a path to a component
 */
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: {
      title: 'Home - NWSinga Property Solutions'
    }
  },
  {
    path: '/houses',
    name: 'Houses',
    component: HousesPage,
    meta: {
      title: 'Houses - NWSinga'
    }
  },
  {
    path: '/buildings',
    name: 'Buildings',
    component: BuildingsPage,
    meta: {
      title: 'Buildings - NWSinga'
    }
  }
]

/**
 * Create Vue Router instance
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // Scroll behavior for route changes
  scrollBehavior(_to, _from, savedPosition) {
    // If there's a saved position (back button), use it
    if (savedPosition) {
      return savedPosition
    }
    // Otherwise, scroll to top
    return { top: 0 }
  }
})

/**
 * Global navigation guard
 * Updates document title based on route meta
 */
router.beforeEach((to, _from, next) => {
  // Update document title
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
  
  next()
})

export default router
