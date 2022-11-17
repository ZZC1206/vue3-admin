// import { RouteRecordRaw } from 'vue-router'

// type _RouteRecordRaw = RouteRecordRaw & { hidden?: boolean }

// export const consoleRoutes: _RouteRecordRaw[] = [
//   {
//     path: '/console',
//     name: 'Console',
//     hidden: false,
//     meta: {
//       title: '首页'
//     },
//     component: () => import('@/views/console/index.vue')
//   }
// ]
import { RouteRecordRaw } from 'vue-router'

export const consoleRoutes: RouteRecordRaw = {
  path: '/home',
  name: 'Home',
  hidden: false,
  meta: {
    title: '控制台',
    icon: 'home'
  },
  component: () => import('@/layout/index.vue'),
  children: [
    {
      path: '/console',
      name: 'Console',
      hidden: false,
      meta: {
        title: '首页'
      },
      component: () => import('@/views/console/index.vue')
    }
  ]
}
