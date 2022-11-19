<template>
  <el-icon>
    <FullScreen @click="toggleFullScreen" />
  </el-icon>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'

defineOptions({
  name: 'DisFullScreen'
})

const toggleFullScreen = () => {
  try {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  } catch (error) {
    console.log(error)
    ElMessage.error('全屏失败')
  }
}
</script>

<style lang="scss" scoped>

</style>
