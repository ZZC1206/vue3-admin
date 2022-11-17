<template>
  <h1 class="logo">
    <img
      :src="logo"
      alt="前端"
    >
  </h1>
  <el-menu
    text-color="#28251B"
    active-text-color="#28251B"
    background-color="#FFF"
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
          >
            <template #title>
              <svg-icon
                name="home"
                color="#28251B"
              />
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
                color="#28251B"
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
import { useRouter, RouteRecordRaw, useRoute } from 'vue-router'

defineOptions({
  name: 'Aside'
})
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
const currentPath = computed(() => path)

const logo = Object.keys(import.meta.glob('@/assets/images/logo.png', { eager: false }))[0]

</script>

<style lang="scss" scoped>
.el-menu {
  border-right: none;
}

.logo {
  margin: 0;
  padding: 9px 0;
  display: flex;
  justify-content: center;
  align-content: center;

  img {
    margin: auto;
  }
}
</style>
