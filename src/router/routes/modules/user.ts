import { DEFAULT_LAYOUT } from '../base'
import { AppRouteRecordRaw } from '../types'

const RESULT: AppRouteRecordRaw = {
  path: '/user',
  name: 'user',
  component: DEFAULT_LAYOUT,
  meta: {
    title: '个人中心',
    icon: 'icon-user',
    requiresAuth: true,
    order: 8
  },
  children: [
    {
      path: 'info',
      name: 'Info',
      component: () => import('@/views/user/info/index.vue'),
      meta: {
        title: '用户信息',
        requiresAuth: true,
        roles: ['*']
      }
    },
    {
      path: 'setting',
      name: 'Setting',
      component: () => import('@/views/user/setting/index.vue'),
      meta: {
        title: '用户设置',
        requiresAuth: true,
        roles: ['*']
      }
    }
  ]
}

export default RESULT
