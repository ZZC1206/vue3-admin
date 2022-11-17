import { RouteRecordRaw } from 'vue-router'

export const systemRoutes: RouteRecordRaw = {
  path: '/system',
  name: 'System',
  hidden: false,
  meta: {
    title: '系统配置',
    icon: 'system'
  },
  component: () => import('@/layout/index.vue'),
  children: [
    {
      path: '/user',
      name: 'User',
      hidden: false,
      meta: {
        title: '用户列表'
      },
      component: () => import('@/views/system/User.vue')
    },
    {
      path: '/role',
      name: 'Role',
      hidden: false,
      meta: {
        title: '角色列表'
      },
      component: () => import('@/views/system/Role.vue')
    },
    {
      path: '/menu',
      name: 'Menu',
      hidden: false,
      meta: {
        title: '菜单列表'
      },
      component: () => import('@/views/system/Menu.vue')
    }
  ]
}
