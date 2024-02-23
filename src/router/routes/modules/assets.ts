import { DEFAULT_LAYOUT } from '../base'
import { AppRouteRecordRaw } from '../types'

const RESULT: AppRouteRecordRaw = {
  path: '/assets',
  name: 'assets',
  component: DEFAULT_LAYOUT,
  meta: {
    title: '资产管理',
    icon: 'icon-computer',
    requiresAuth: true,
    order: 7
  },
  children: [
    {
      path: 'device',
      name: 'Device',
      component: () => import('@/views/assets/device/index.vue'),
      meta: {
        title: '设备管理',
        requiresAuth: true,
        roles: ['*']
      }
    },
    {
      path: 'domain',
      name: 'Domain',
      component: () => import('@/views/assets/domain/index.vue'),
      meta: {
        title: '域名管理',
        requiresAuth: true,
        roles: ['admin']
      }
    }
  ]
}

export default RESULT
