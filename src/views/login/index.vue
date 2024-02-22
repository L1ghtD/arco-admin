<template>
  <div class="container">
    <div class="logo">
      <img
        alt="logo"
        src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/dfdba5317c0c20ce20e64fac803d52bc.svg~tplv-49unhts6dw-image.image"
      />
      <div class="logo-text">Arco Admin</div>
    </div>
    <div class="content">
      <div class="content-inner">
        <LoginForm />
      </div>
      <div class="footer">
        <Footer />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Footer from '@/components/footer/index.vue'
import LoginForm from './components/login-form.vue'
</script>

<style lang="less" scoped>
.container {
  display: flex;
  height: 100vh;
  background-image: url('@/assets/images/background.svg');
  background-size: cover;
  background-position: center;
  // position: relative;

  .content {
    position: relative;
    display: flex;
    flex: 1;
    align-items: center;
    // justify-content: center;
    padding-left: 350px;
    padding-bottom: 40px;
  }

  .footer {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 100%;
  }
}

.logo {
  position: fixed;
  top: 24px;
  left: 22px;
  z-index: 1;
  display: inline-flex;
  align-items: center;

  &-text {
    margin-right: 4px;
    margin-left: 4px;
    color: var(--color-fill-5);
    font-size: 20px;
  }
}
</style>
