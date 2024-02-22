import { defineStore } from 'pinia'
import { AppState } from './types'
import defaultSettings from '@/config/settings.json'

const useAppStore = defineStore('app', {
  state: (): AppState => ({ ...defaultSettings }),

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
    clearServerMenu() {
      this.serverMenu = []
    }
  }
})

export default useAppStore
