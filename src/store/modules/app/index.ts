import { defineStore } from 'pinia'
import { AppState } from './types'
import { Notification } from '@arco-design/web-vue'
import type { NotificationReturn } from '@arco-design/web-vue/es/notification/interface'
import type { RouteRecordNormalized } from 'vue-router'
import { getMenuList } from '@/api/user'
import defaultSettings from '@/config/settings.json'

const useAppStore = defineStore('app', {
  state: (): AppState => ({ ...defaultSettings }),

  getters: {
    appCurrentSetting(state: AppState): AppState {
      return { ...state }
    },
    appDevice(state: AppState) {
      return state.device
    },
    appAsyncMenus(state: AppState): RouteRecordNormalized[] {
      return state.serverMenu as unknown as RouteRecordNormalized[]
    }
  },

  actions: {
    updateSettings(partial: Partial<AppState>) {
      //  @ts-ignore-next-line
      this.$patch(partial)
    },
    // 切换主题
    toggleTheme(dark: boolean) {
      if (dark) {
        this.theme = 'dark'
        document.body.setAttribute('arco-theme', 'dark')
      } else {
        this.theme = 'light'
        document.body.setAttribute('arco-theme', 'light')
      }
    },
    toggleDevice(device: string) {
      this.device = device
    },
    toggleMenu(value: boolean) {
      this.hideMenu = value
    },
    async fetchServerMenuConfig() {
      let notifyInstance: NotificationReturn | null = null
      try {
        notifyInstance = Notification.info({
          id: 'menuNotice', // Keep the instance id the same
          content: 'loading',
          closable: true
        })
        const { data } = await getMenuList()
        this.serverMenu = data
        notifyInstance = Notification.success({
          id: 'menuNotice',
          content: 'success',
          closable: true
        })
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        notifyInstance = Notification.error({
          id: 'menuNotice',
          content: 'error',
          closable: true
        })
      }
    },
    clearServerMenu() {
      this.serverMenu = []
    }
  }
})

export default useAppStore
