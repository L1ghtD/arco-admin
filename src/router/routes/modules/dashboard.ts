import { DEFAULT_LAYOUT } from '../base'
import type { AppRouteRecordRaw } from '../types'

const DASHBOARD: AppRouteRecordRaw = {
  path: '/dashboard',
  name: 'dashboard',
  component: DEFAULT_LAYOUT,
  meta: {
    title: '仪表盘',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 0
  },
  children: [
    {
      path: 'workplace',
      name: 'Workplace',
      component: () => import('@/views/dashboard/workplace/index.vue'),
      meta: {
        title: '首页',
        requiresAuth: true,
        roles: ['*']
      }
    },
    {
      path: 'monitor',
      name: 'Monitor',
      component: () => import('@/views/dashboard/monitor/index.vue'),
      meta: {
        title: '监控',
        requiresAuth: true,
        roles: ['*']
      }
    }
  ]
}

export default DASHBOARD
