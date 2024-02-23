<template>
  <div class="container">
    <Breadcrumb :items="['资产管理', '域名管理']" />
    <div class="wrapper">域名管理页面</div>
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
