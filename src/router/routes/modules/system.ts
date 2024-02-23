import { DEFAULT_LAYOUT } from '../base'
import { AppRouteRecordRaw } from '../types'

const RESULT: AppRouteRecordRaw = {
  path: '/system',
  name: 'system',
  component: DEFAULT_LAYOUT,
  meta: {
    title: '系统管理',
    icon: 'icon-settings',
    requiresAuth: true,
    order: 9
  },
  children: [
    {
      path: 'user',
      name: 'User',
      component: () => import('@/views/system/user/index.vue'),
      meta: {
        title: '用户管理',
        requiresAuth: true,
        roles: ['admin']
      }
    },
    {
      path: 'role',
      name: 'Role',
      component: () => import('@/views/system/role/index.vue'),
      meta: {
        title: '角色管理',
        requiresAuth: true,
        roles: ['admin']
      }
    }
  ]
}

export default RESULT
