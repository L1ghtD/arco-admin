import { defineStore } from 'pinia'
import useAppStore from '../app'
import { UserState } from './types'
import { type LoginData, login as userLogin, logout as userLogout, getUserInfo } from '@/api/user'
import { setToken, clearToken } from '@/utils/auth'
import { removeRouteListener } from '@/utils/route-listener'

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    name: undefined,
    avatar: undefined,
    email: undefined,
    phone: undefined,
    registrationDate: undefined,
    accountId: undefined,
    role: ''
  }),

  getters: {
    userInfo(state: UserState): UserState {
      return { ...state }
    }
  },

  actions: {
    switchRoles() {
      return new Promise((resolve) => {
        this.role = this.role === 'user' ? 'admin' : 'user'
        resolve(this.role)
      })
    },

    // 设置用户信息
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial)
    },

    // 重置用户信息
    resetInfo() {
      this.$reset()
    },

    // 获取用户信息
    async info() {
      const res = await getUserInfo()

      this.setInfo(res.data)
    },

    // Login
    async login(loginForm: LoginData) {
      try {
        const res = await userLogin(loginForm)
        setToken(res.data.token)
      } catch (err) {
        clearToken()
        throw err
      }
    },

    logoutCallBack() {
      const appStore = useAppStore()
      this.resetInfo()
      clearToken()
      removeRouteListener()
      appStore.clearServerMenu()
    },

    // logout
    async logout() {
      try {
        await userLogout()
      } finally {
        this.logoutCallBack()
      }
    }
  }
})

export default useUserStore
