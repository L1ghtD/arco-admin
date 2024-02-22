import Mock from 'mockjs'
import setupMock, { successResponseWrap, failResponseWrap } from '@/utils/setup-mock'
import { MockParams } from '@/types/mock'

setupMock({
  mock: true,
  setup() {
    // 登录
    Mock.mock(new RegExp('/api/user/login'), (params: MockParams) => {
      const { username, password } = JSON.parse(params.body)
      if (!username) {
        return failResponseWrap(null, '用户名不能为空', 50000)
      }
      if (!password) {
        return failResponseWrap(null, '密码不能为空', 50000)
      }
      if (username === 'admin' && password === 'admin') {
        window.localStorage.setItem('userRole', 'admin')
        return successResponseWrap({
          token: '12345'
        })
      }
      if (username === 'user1' && password === 'user1') {
        window.localStorage.setItem('userRole', 'user')
        return successResponseWrap({
          token: '54321'
        })
      }
      return failResponseWrap(null, '账号或者密码错误', 50000)
    })
  }
})
