<template>
  <div id="login">
    <div class="form-wrap">
      <!-- <ul class="menu-tab">
        <li class="current">
          登陆
        </li>
        <li>
          注册
        </li>
      </ul> -->
      <el-radio-group
        v-model="isLogin"
        size="large"
      >
        <el-radio-button label="登陆" />
        <el-radio-button label="注册" />
      </el-radio-group>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

defineOptions({
  name: 'Login'
})

const isLogin = ref('登陆')

</script>

<style lang="scss" scoped>
#login {
  height: 100vh; // 设置高度，居于浏览器可视区高度
  background-color: #F7F7F7; // 设置背景颜色
  display: flex;
  justify-content: center;
  align-content: center;
}

.form-wrap {
  box-sizing: border-box;
  width: 320px;
  margin: auto; // 块元素水平居中
  background-color: #FFFFFF; // 设置背景颜色
  border-radius: 4px;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  align-content: center;
}

// .menu-tab {
//   text-align: center;

//   li {
//     display: inline-block;
//     padding: 10px 24px;
//     margin: 0 10px;
//     color: #fff;
//     font-size: 14px;
//     border-radius: 5px;
//     cursor: pointer;

//     &.current {
//       background-color: rgba(0, 0, 0, .1);
//     }
//   }
// }
</style>
