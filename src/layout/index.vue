<template>
  <el-container id="layout-container">
    <el-aside id="layout-aside">
      <Aside />
    </el-aside>
    <el-container>
      <el-header id="layout-header">
        <Header />
      </el-header>
      <el-main id="layout-main">
        <Main />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import Aside from './components/Aside/index.vue'
import Header from './components/Header/index.vue'
import Main from './components/Main/index.vue'

defineOptions({
  name: 'layout'
})
</script>

<style lang="scss" scoped>
#layout-container {
  height: 100vh;
}

#layout-aside {
  width: auto;
  background-color: $asideColor;
  @include webkit(transition, all 0.3s ease 0s);
}

#layout-main {
  background-color: $mainColor;
}

#layout-header {
  background-color: $headerColor;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 10;
  @include webkit(box-shadow, 0 0 10px 0 rgba(0, 0, 0, 0.1));
}
</style>
