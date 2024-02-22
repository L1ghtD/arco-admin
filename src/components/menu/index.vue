<script lang="tsx">
import { defineComponent, ref, h, compile, computed } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { useAppStore } from '@/store'
import { listenerRouteChange } from '@/utils/route-listener'
import useMenuTree from './use-menu-tree'

export default defineComponent({
  emit: ['collapse'],
  setup() {
    const appStore = useAppStore()
    const { menuTree } = useMenuTree()
    const collapsed = computed({
      get() {
        if (appStore.device === 'desktop') return appStore.menuCollapse
        return false
      },
      set(value: boolean) {
        appStore.updateSettings({ menuCollapse: value })
      }
    })

    const topMenu = computed(() => appStore.topMenu)
    const openKeys = ref<string[]>([])
    const selectedKey = ref<string[]>([])

    const findMenuOpenKeys = (target: string) => {
      const result: string[] = []
      let isFind = false
      const backtrack = (item: RouteRecordRaw, keys: string[]) => {
        if (item.name === target) {
          isFind = true
          result.push(...keys)
          return
        }
        if (item.children?.length) {
          item.children.forEach((el) => {
            backtrack(el, [...keys, el.name as string])
          })
        }
      }
      menuTree.value.forEach((el: RouteRecordRaw) => {
        if (isFind) return // Performance optimization
        backtrack(el, [el.name as string])
      })
      return result
    }

    listenerRouteChange((newRoute) => {
      const { requiresAuth, activeMenu, hideInMenu } = newRoute.meta
      if (requiresAuth && (!hideInMenu || activeMenu)) {
        const menuOpenKeys = findMenuOpenKeys((activeMenu || newRoute.name) as string)

        const keySet = new Set([...menuOpenKeys, ...openKeys.value])
        openKeys.value = [...keySet]

        selectedKey.value = [activeMenu || menuOpenKeys[menuOpenKeys.length - 1]]
      }
    }, true)

    const setCollapse = (val: boolean) => {
      if (appStore.device === 'desktop') appStore.updateSettings({ menuCollapse: val })
    }

    const renderSubMenu = () => {
      function travel(_route: RouteRecordRaw[], nodes = []) {
        if (_route) {
          _route.forEach((element) => {
            // This is demo, modify nodes as needed
            const icon = element?.meta?.icon ? () => h(compile(`<${element?.meta?.icon}/>`)) : null
            const node =
              element?.children && element?.children.length !== 0 ? (
                <a-sub-menu
                  key={element?.name}
                  v-slots={{
                    icon,
                    title: () => h(compile(element?.meta?.title || ''))
                  }}
                >
                  {travel(element?.children)}
                </a-sub-menu>
              ) : (
                <a-menu-item key={element?.name} v-slots={{ icon }}>
                  {element?.meta?.title || ''}
                </a-menu-item>
              )
            nodes.push(node as never)
          })
        }
        return nodes
      }
      return travel(menuTree.value)
    }

    return () => (
      <a-menu
        mode={topMenu.value ? 'horizontal' : 'vertical'}
        v-model:collapsed={collapsed.value}
        v-model:open-keys={openKeys.value}
        show-collapse-button={appStore.device !== 'mobile'}
        auto-open={false}
        selected-keys={selectedKey.value}
        auto-open-selected={true}
        level-indent={34}
        style="height: 100%;width:100%;"
        onCollapse={setCollapse}
      >
        {renderSubMenu()}
      </a-menu>
    )
  }
})
</script>

<style lang="less" scoped>
:deep(.arco-menu-inner) {
  .arco-menu-inline-header {
    display: flex;
    align-items: center;
  }
  .arco-icon {
    &:not(.arco-icon-down) {
      font-size: 18px;
    }
  }
}
</style>