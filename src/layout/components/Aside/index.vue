<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
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
              <span>{{ item.children[0].meta?.title }}</span>
            </template>
          </el-menu-item>
        </template>
        <!-- 渲染有多个子路由 -->
        <template v-else>
          <el-sub-menu :index="item.path">
            <template #title>
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
import { useRouter, RouteRecordRaw } from 'vue-router'

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

</script>

<style lang="scss" scoped>
.el-menu {
  border-right: none;
}
</style>
