<template>
  <div class="login-form-wrapper">
    <div class="login-form-title">运维管理系统</div>
    <div class="login-form-sub-title">Biu Biu Biu~~~</div>
    <div class="login-form-error-msg">{{ errorMessage }}</div>
    <a-form :model="userInfo" class="login-form" layout="vertical" @submit="handleSubmit">
      <a-form-item
        field="username"
        :validate-trigger="['change', 'blur']"
        hide-label
        :rules="[
          { required: true, message: '用户名必填' },
          { minLength: 5, message: '长度不得低于5个字符' }
        ]"
      >
        <a-input size="large" placeholder="用户名" v-model="userInfo.username">
          <template #prefix>
            <icon-user />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        field="password"
        :validate-trigger="['change', 'blur']"
        hide-label
        :rules="[
          { required: true, message: '密码必填' },
          { minLength: 5, message: '长度不得低于5个字符' }
        ]"
      >
        <a-input-password allow-clear size="large" placeholder="密码" v-model="userInfo.password">
          <template #prefix>
            <icon-lock />
          </template>
        </a-input-password>
      </a-form-item>
      <a-space :size="26" direction="vertical">
        <div class="login-form-password-actions">
          <a-checkbox
            :model-value="loginConfig.rememberPassword"
            @change="setRememberPassword as any"
          >
            记住密码
          </a-checkbox>
        </div>
        <a-button type="primary" html-type="submit" long size="large" :loading="loading">
          登录
        </a-button>
      </a-space>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import { ref, reactive } from 'vue'
import { ValidatedError } from '@arco-design/web-vue'
import { Message } from '@arco-design/web-vue'

import useLoading from '@/hooks/loading'
import type { LoginData } from '@/api/user'
import { useUserStore } from '@/store'
import { useRouter } from 'vue-router'

const errorMessage = ref('')
const { loading, setLoading } = useLoading()
const userStore = useUserStore()
const router = useRouter()

// 将 loginConfig 存储至 localStorage
const loginConfig = useStorage('login-config', {
  rememberPassword: false,
  username: '',
  password: ''
})

const userInfo = reactive({
  username: loginConfig.value.username,
  password: loginConfig.value.password
})

const handleSubmit = async ({
  errors,
  values
}: {
  // 见表单 submit event api
  errors: Record<string, ValidatedError> | undefined
  values: Record<string, any>
}) => {
  if (loading.value) return
  if (!errors) {
    setLoading(true)
    try {
      // 登录逻辑
      await userStore.login(values as LoginData)

      const { redirect, ...othersQuery } = router.currentRoute.value.query
      console.log('========router===========')
      console.log(router)
      console.log('========================')
      router.push({
        name: (redirect as string) || 'Workplace',
        query: {
          ...othersQuery
        }
      })

      Message.success('登录成功')
      const { rememberPassword } = loginConfig.value
      const { username, password } = values

      // 生产环境需要加密存储
      loginConfig.value.username = rememberPassword ? username : ''
      loginConfig.value.password = rememberPassword ? password : ''
    } catch (err) {
      // 异常
      errorMessage.value = (err as Error).message
    } finally {
      // 结束button转圈
      setLoading(false)
    }
  }
}

const setRememberPassword = (value: boolean) => {
  loginConfig.value.rememberPassword = value
}
</script>

<style lang="less" scoped>
.login-form {
  &-wrapper {
    width: 350px;
  }

  &-title {
    color: var(--color-text-1);
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
    // padding-bottom: 50px;
    text-align: center;
  }

  &-sub-title {
    color: var(--color-text-3);
    font-size: 16px;
    line-height: 24px;
    text-align: center;
  }

  &-error-msg {
    height: 32px;
    color: rgb(var(--red-6));
    line-height: 32px;
  }

  &-password-actions {
    display: flex;
    justify-content: space-between;
  }
}
</style>
