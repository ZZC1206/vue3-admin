<template>
  <el-icon @click="handleCollapse">
    <Expand v-show="settingStore.isCollapse" />
    <Fold v-show="!settingStore.isCollapse" />
  </el-icon>
</template>

<script lang="ts" setup>
import { useSettingStore } from '@/store/useSettingStore'

defineOptions({
  name: 'ToggleSidebar'
})

const settingStore = useSettingStore()

const handleCollapse = () => {
  settingStore.isCollapse = !settingStore.isCollapse
}
</script>

<style lang="scss" scoped>

</style>
