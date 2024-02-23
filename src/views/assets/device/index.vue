<template>
  <div class="container">
    <Breadcrumb :items="['资产管理', '设备管理']" />
    <div class="wrapper">
      <h2>测试组件权限</h2>
      <a-space>
        <a-button type="primary" v-permission="['admin']">仅admin可见</a-button>
        <a-button>所有可见</a-button>
      </a-space>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.container {
  padding: 0 20px 20px 20px;
}
.wrapper {
  padding: 25px 15px;
  background-color: var(--color-bg-2);
  border-radius: 4px;
  color: rgb(var(--gray-8));
}
</style>
