<template>
  <div class="container">
    <Breadcrumb :items="['个人中心', '用户信息']" />
    <div class="wrapper">个人中心页面</div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.container {
  background-color: var(--color-fill-2);
  padding: 0 20px 20px 20px;
}
.wrapper {
  padding: 25px 15px;
  background-color: var(--color-bg-2);
  border-radius: 4px;
  color: rgb(var(--gray-8));
}
</style>
