<template>
  <el-container>
    <el-aside>
      <Aside />
    </el-aside>
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-main>
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
.el-container {
  height: 100vh;
}

.el-header {
  background-color: #FFFFFF;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-aside {
  width: auto;
  background-color: #2B579A;
}

.el-main {
  --el-main-padding: 10px;
  background-color: #ECF5FF;
}
</style>
