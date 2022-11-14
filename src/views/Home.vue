<template>
  <div class="box">
    <h1>Hello,this's Home!</h1>
  </div>
  <el-row class="mb-4">
    <el-button>Default</el-button>
    <el-button type="primary">
      Primary
    </el-button>
    <el-button type="success">
      Success
    </el-button>
    <el-button type="info">
      Info
    </el-button>
    <el-button type="warning">
      Warning
    </el-button>
    <el-button type="danger">
      Danger
    </el-button>
  </el-row>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'Home'
})
</script>

<style  scoped>
.box {
  width: 400px;
  height: 50px;
  background-color: pink;
}
</style>
