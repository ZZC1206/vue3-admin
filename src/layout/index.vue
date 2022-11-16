<template>
  <el-container>
    <el-aside>
      Aside
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
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
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-aside {
  width: 200px;
  background-color: #D9ECFF;
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-main {
  background-color: #ECF5FF;
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
