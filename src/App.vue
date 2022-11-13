<template>
  <h1>App</h1>
  <router-link to="/home">
    Go to Home
  </router-link>
  <router-link to="/about">
    Go to About
  </router-link>

  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view />
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>

</style>
