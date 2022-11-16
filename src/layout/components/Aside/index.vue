<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
  >
    <template
      v-for="item in routes"
      :key="item.path"
    >
      <el-sub-menu
        v-if="!item.hidden"
        :index="item.path"
      >
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
            <template #title>
              <span>{{ child.meta?.title }}</span>
            </template>
          </el-menu-item>
        </template>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

defineOptions({
  name: 'Aside'
})
const { options } = useRouter()

const routes = options.routes

</script>

<style lang="scss" scoped>
.el-menu{
  border-right: none;
}
</style>
