<template>
  <el-autocomplete
    v-model="state1"
    class="inline-input"
    prefix-icon="Search"
    placeholder="请输入内容"
    value-key="menu_name"
    :fetch-suggestions="querySearch"
  >
    <template #default="{ item }">
      <router-link
        :to="item.link"
        custom
        v-slot="{ href }"
      >
        <el-link
          class="menu-link"
          :href="href"
          :underline="false"
          @click="handleLinkClick(item, $event)"
        >
          <span class="link-text">{{ item.value }}</span>
        </el-link>
      </router-link>
    </template>
  </el-autocomplete>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { RouteRecordRaw, useRouter } from 'vue-router'
// import { getMenus } from '@/api/home'
// import type { Menu } from '@/api/types/home'

defineOptions({
  name: 'MenuSearch'
})

interface ListItem {
  value: string,
  link: string
}

const menus = ref<ListItem[]>([])
const state1 = ref('')

onMounted(() => {
  loadMenus()
})

const { options, currentRoute } = useRouter()
// 获取菜单信息
const loadMenus = () => {
  // const data = await getMenus()
  const menusList: ListItem[] = handlerMenu(options.routes)
  menus.value = menusList
  // console.log(menusList)
}

// 处理路有数据
const handlerMenu = (data: readonly RouteRecordRaw[]) => {
  const menusList: ListItem[] = []
  data.forEach(item => {
    if (!item.hidden) {
      if (item.children?.length && item.meta?.title) {
        const childrenList: ListItem[] = handlerMenu(item.children)
        childrenList.forEach(childItem => {
          menusList.push({
            value: `${item.meta?.title}-->${childItem.value}`,
            link: `${item.path}${childItem.link.startsWith('/') ? childItem.link : '/' + childItem.link}`
          })
        })
      } else {
        menusList.push({ value: item.meta?.title as string, link: item.path })
      }
    }
  })
  return menusList
}

// 查询
const querySearch = (queryString: string, cb: (val: any) => void) => {
  // console.log('querySearch', queryString)
  const results = queryString
    ? menus.value.filter(item => item.link !== currentRoute.value.fullPath).filter(createFilter(queryString))
    : []
  // 调用 callback 返回建议列表的数据
  cb(results)
}

const createFilter = (queryString: string) => {
  return (restaurant: ListItem) => {
    return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1 ||
      restaurant.link.toLowerCase().indexOf(queryString.toLowerCase()) !== -1
  }
}

const handleLinkClick = (item: ListItem, e: Event) => {
  if (item.link === '') {
    e.preventDefault()
    e.stopPropagation()
  }
}
</script>

<style lang="scss" scoped>
.is-disabled {
  color: #c0c4cc;
  cursor: not-allowed;
}

.menu-link,
.link-text {
  display: block;
}
</style>
