<template>
  <!-- 路由匹配到的组件将渲染在这里 -->
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts" setup>
import locale from 'element-plus/lib/locale/lang/zh-cn'
</script>
