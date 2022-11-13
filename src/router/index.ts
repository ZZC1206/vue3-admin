import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/about',
    component: async () => await import('@/views/About.vue')
  },
  {
    path: '/home',
    component: async () => await import('@/views/Home.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
