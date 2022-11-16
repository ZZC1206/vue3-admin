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
  name: 'Layout'
})
</script>

<style lang="scss" scoped>
.el-container {
  height: 100vh;
}

.el-header {
  background-color: #C6E2FF;
  color: #333;
  height: 60px;
}

.el-aside {
  width: 250px;
  // background-color: #D9ECFF;
  background-color: #FFFFFF;
  color: #333;
}

.el-main {
  background-color: #ECF5FF;
  color: #333;
}

</style>
