<template>
  <h1 class="logo">
    <img
      :src="logo"
      alt="前端"
    >
  </h1>
  <el-menu
    class="el-menu-vertical-demo"
    text-color="#FFFFFF"
    active-text-color="#FFFFFF"
    background-color="#2B579A"
    :collapse="settingStore.isCollapse"
    :default-active="currentPath"
  >
    <template
      v-for="item in routes"
      :key="item.path"
    >
      <template v-if="!item.hidden">
        <!-- 渲染有一个子路由 -->
        <template v-if="hasonlyChild(item.children)">
          <el-menu-item
            v-if="item.children?.length"
            :index="item.children[0].path"
            @click="handleChilk(item?.children[0]?.name)"
          >
            <svg-icon
              :name="item.meta?.icon"
              color="#FFFFFF"
              class="hover-color"
            />
            <template #title>
              <span>{{ item.children[0].meta?.title }}</span>
            </template>
          </el-menu-item>
        </template>
        <!-- 渲染有多个子路由 -->
        <template v-else>
          <el-sub-menu :index="item.path">
            <template #title>
              <svg-icon
                :name="item.meta?.icon"
                color="#FFFFFF"
              />
              <span>{{ item.meta?.title }}</span>
            </template>
            <template
              v-for="child in item.children"
              :key="child.path"
            >
              <el-menu-item
                v-if="!child.hidden"
                :index="child.path"
                class="hover-color"
                @click="handleChilk(child.name)"
              >
                <span>{{ child.meta?.title }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </template>
    </template>
  </el-menu>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter, RouteRecordRaw, useRoute, RouteRecordName } from 'vue-router'
import { useSettingStore } from '@/store/useSettingStore'
import router from '@/router'

defineOptions({
  name: 'Aside'
})
const settingStore = useSettingStore()

const { options } = useRouter()
const routes = options.routes

const hasonlyChild = (children: RouteRecordRaw[] | undefined): boolean => {
  // 没有子路由
  if (!children) return false
  // 获取需要显示的子路由
  const childRoutes = children.filter((item: RouteRecordRaw) => !item.hidden)
  // 判断是否只有一个子路由
  if (childRoutes.length === 1) return true
  else return false
}

const { path } = useRoute()
const currentPath = computed(() => path.split('/').pop())

const logo = computed(() => {
  const urlPath = settingStore.isCollapse
    ? Object.keys(import.meta.glob('@/assets/images/logo-min.png', { eager: false }))[0]
    : Object.keys(import.meta.glob('@/assets/images/logo.png', { eager: false }))[0]
  return urlPath
})

const handleChilk = (item: RouteRecordName | undefined) => {
  if (!item) return false
  console.log(item)
  router.push({ name: item })
}

</script>

<style lang="scss" scoped>
.el-menu {
  border-right: none;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 240px;
  // min-height: 400px;
}

.hover-color {
  --el-menu-hover-bg-color: #19478A
}

.logo {
  margin: 0;
  padding: 9px 0;
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>
