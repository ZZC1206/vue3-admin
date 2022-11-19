<template>
  <el-dropdown>
    <el-avatar class="head-bgc">
      {{ userStore.userName.slice(0, 2) }}
    </el-avatar>
    <el-icon>
      <CaretBottom />
    </el-icon>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item icon="User">
          个人中心
        </el-dropdown-item>
        <el-dropdown-item
          @click="handleLogou"
          icon="SwitchButton"
          class="error-item"
          style="color: #F56C6C; --el-dropdown-menuItem-hover-fill: rgb(254, 240, 240);"
        >
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/useUserStore'
import { CaretBottom } from '@element-plus/icons-vue'

defineOptions({
  name: 'UserInfo'
})

const router = useRouter()
const userStore = useUserStore()

const handleLogou = () => {
  // 退出提示
  ElMessageBox.confirm('确认退出吗？', '退出提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    // 确认发出退出请求
    await userStore.userLogout()
      .then((res) => { console.log(res) })
      .catch((err) => { console.log(err) })
    // 清除用户登录信息
    userStore.clearInfo()
    ElMessage.success('退出成功!')
    // 跳转到登录页
    router.push({
      name: 'login'
    })
  }).catch(() => {
    // ElMessage.info('取消退出!')
  })
}
</script>

<style lang="scss" scoped>
.head-bgc {
  --el-avatar-bg-color: #2B579A
}
</style>
