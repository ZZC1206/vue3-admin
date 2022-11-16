import { RouteRecordRaw } from 'vue-router'

export const infoRoutes: RouteRecordRaw = {
  path: '/news',
  name: 'News',
  hidden: false,
  meta: {
    title: '信息管理'
  },
  component: () => import('@/layout/index.vue'),
  children: [
    {
      path: '/newsindex',
      name: 'Newsindex',
      hidden: false,
      meta: {
        title: '信息列表'
      },
      component: () => import('@/views/info/index.vue')
    },
    {
      path: '/newsCategory',
      name: 'NewsCategory',
      hidden: false,
      meta: {
        title: '信息分类'
      },
      component: () => import('@/views/info/Category.vue')
    },
    {
      path: '/newsDetailed',
      name: 'NewsDetailed',
      hidden: false,
      meta: {
        title: '信息详情'
      },
      component: () => import('@/views/info/Detailed.vue')
    }
  ]
}
