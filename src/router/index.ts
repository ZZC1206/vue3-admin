import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router'
import { consoleRoutes } from './modules/console'
import { systemRoutes } from './modules/system'
import { infoRoutes } from './modules/info'

// type _RouteRecordRaw = RouteRecordRaw & { hidden?: boolean }

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    redirect: '/home',
    hidden: true
  },
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    component: async () => await import('@/views/login/index.vue')
  },
  // 后台首页
  consoleRoutes,
  infoRoutes,
  systemRoutes
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
