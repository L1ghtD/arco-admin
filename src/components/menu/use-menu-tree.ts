import { computed } from 'vue'
import { RouteRecordRaw, RouteRecordNormalized } from 'vue-router'
import usePermission from '@/hooks/permission'
import { useAppStore } from '@/store'
import appClientMenus from '@/router/app-menus'
import { cloneDeep } from 'lodash'

export default function useMenuTree() {
  const permission = usePermission()
  const appStore = useAppStore()
  const appRoute = computed(() => {
    if (appStore.menuFromServer) {
      return appStore.appAsyncMenus
    }
    return appClientMenus
  })
  // 返回需要显示的路由列表
  const menuTree = computed(() => {
    const copyRouter = cloneDeep(appRoute.value) as RouteRecordNormalized[]
    // 按 order 从小到大排序
    copyRouter.sort((a: RouteRecordNormalized, b: RouteRecordNormalized) => {
      return (a.meta.order || 0) - (b.meta.order || 0)
    })
    function travel(_routes: RouteRecordRaw[], layer: number) {
      if (!_routes) return null

      const collector: any = _routes.map((element) => {
        // 没有权限
        if (!permission.accessRouter(element)) {
          return null
        }

        // 叶子节点: 隐藏子节点或者没有子节点则符合条件
        if (element.meta?.hideChildrenInMenu || !element.children) {
          element.children = []
          return element
        }

        // 过滤掉需要隐藏菜单的子节点
        element.children = element.children.filter((x) => x.meta?.hideInMenu !== true)

        // 递归遍历子节点
        const subItem = travel(element.children, layer + 1)

        if (subItem.length) {
          element.children = subItem
          return element
        }
        // the else logic
        if (layer > 1) {
          element.children = subItem
          return element
        }

        if (element.meta?.hideInMenu === false) {
          return element
        }

        return null
      })
      return collector.filter(Boolean)
    }
    return travel(copyRouter, 0)
  })

  return {
    menuTree
  }
}
