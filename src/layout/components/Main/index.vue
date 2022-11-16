<template>
  <div class="main-content">
    <router-view />
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'Main'
})
</script>

<style lang="scss" scoped>
.main-content{
  background-color: #FFFFFF; // 背景色
  min-height: 100%; // 高度
}
</style>
