import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router'
import { consoleRoutes } from './modules/console'
import { systemRoutes } from './modules/system'
import { infoRoutes } from './modules/info'
import { useUserStore } from '@/store/useUserStore'

import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

// 进度条的配置
nprogress.configure({})

// type _RouteRecordRaw = RouteRecordRaw & { hidden?: boolean }

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home/console',
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

router.beforeEach((to, from) => {
  nprogress.start()
  const userStore = useUserStore()
  // 此路由是否需要授权，检查是否已登录
  if (to.meta.requiresAuth && !userStore.userName) {
    // 如果没有，则重定向到登录页面
    return {
      path: '/login',
      // 保存我们所在的位置，以便以登陆成功后调回去
      query: { redirect: to.fullPath }
    }
  }
})

router.afterEach(() => {
  nprogress.done()
})

export default router
