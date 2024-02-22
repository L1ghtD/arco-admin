import { getToken } from '@/utils/auth'
import axios from 'axios'
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios'

if (import.meta.env.VITE_API_BASE_URL) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL
}

axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 让每个请求携带 token
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    const res = response.data
    if (res.code !== 20000) {
      return Promise.reject(new Error(res.msg || 'Error'))
    }
    return res
  },
  (error) => {
    return Promise.reject(error)
  }
)
