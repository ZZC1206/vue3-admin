<!-- eslint-disable vue/valid-v-show -->
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
      <div class="radio-box">
        <el-radio-group
          v-model="isLogin"
          size="default"
        >
          <el-radio-button label="登陆" />
          <el-radio-button label="注册" />
        </el-radio-group>
      </div>
      <el-form
        ref="form"
        :model="sizeForm"
        label-width="auto"
        label-position="top"
        size="default"
      >
        <!-- 帐号 -->
        <el-form-item>
          <el-input
            v-model="sizeForm.userName"
            :prefix-icon="User"
            placeholder="电子邮箱"
            size="large"
          />
        </el-form-item>
        <!-- 密码 -->
        <el-form-item>
          <el-input
            v-model="sizeForm.password"
            :prefix-icon="Lock"
            placeholder="密码"
            type="password"
            size="large"
          />
        </el-form-item>
        <!-- 二次密码 -->
        <el-collapse-transition>
          <el-form-item v-show="isLogin === '注册'">
            <el-input
              v-model="sizeForm.passwordTwice"
              :prefix-icon="Lock"
              placeholder="密码"
              type="password"
              size="large"
            />
          </el-form-item>
        </el-collapse-transition>
        <!-- 验证码 -->
        <el-form-item>
          <!-- <el-row :gutter="10">
            <el-col :span="14">
              <el-input v-model="sizeForm.code" />
            </el-col>
            <el-col :span="10">
              <el-button @click="getCode">获取验证码</el-button>
            </el-col>
          </el-row> -->
          <el-input
            v-model="sizeForm.code"
            placeholder="验证码"
            size="large"
          >
            <template #append>
              <el-button @click="getCode">
                获取验证码
              </el-button>
            </template>
          </el-input>
        </el-form-item>
        <!-- 提交按钮 -->
        <el-form-item>
          <el-button
            type="primary"
            class="el-button-block"
            @click="onSubmit"
          >
            {{ isLogin }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'

defineOptions({
  name: 'Login'
})

const isLogin = ref('登陆')

const sizeForm = reactive({
  userName: '',
  password: '',
  passwordTwice: '',
  code: ''
})

// 提交按钮
const onSubmit = () => { console.log(sizeForm) }

// 提交按钮
const getCode = () => { console.log('获取验证码') }

watch(isLogin, (newValue, oldValue) => {
  console.log('isLogin变化了', newValue, oldValue)
})

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
  border-radius: 6px;
  padding: 20px 40px 12px;

  .radio-box {
    display: flex;
    justify-content: center;
    align-content: center;
    padding-bottom: 20px;
  }
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
