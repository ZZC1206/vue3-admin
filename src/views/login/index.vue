<template>
  <div id="login">
    <div class="form-wrap">
      <!-- <ul class="menu-tab">
        <li class="current">
          登录
        </li>
        <li>
          注册
        </li>
      </ul> -->
      <div class="radio-box">
        <el-radio-group
          v-model="isLogin"
          size="default"
          @change="radioChange"
        >
          <el-radio-button label="登录" />
          <el-radio-button label="注册" />
        </el-radio-group>
      </div>
      <el-form
        ref="userFormRef"
        :model="userForm"
        :rules="userRules"
        label-width="auto"
        label-position="top"
        size="default"
      >
        <!-- 帐号 -->
        <el-form-item prop="userName">
          <el-input
            v-model="userForm.userName"
            :prefix-icon="User"
            placeholder="电子邮箱"
            size="large"
          />
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="userForm.password"
            :prefix-icon="Lock"
            placeholder="密码"
            type="password"
            size="large"
          />
        </el-form-item>
        <!-- 二次密码 -->
        <el-collapse-transition>
          <el-form-item
            v-show="isLogin === '注册'"
            prop="passwordTwice"
          >
            <el-input
              v-model="userForm.passwordTwice"
              :prefix-icon="Lock"
              placeholder="再次输入密码"
              type="password"
              size="large"
            />
          </el-form-item>
        </el-collapse-transition>
        <!-- 验证码 -->
        <el-form-item prop="code">
          <!-- <el-row :gutter="10">
            <el-col :span="14">
              <el-input v-model="userForm.code" />
            </el-col>
            <el-col :span="10">
              <el-button @click="getCode">获取验证码</el-button>
            </el-col>
          </el-row> -->
          <el-input
            v-model="userForm.code"
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
            @click="onSubmit(userFormRef)"
          >
            {{ isLogin }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { FormInstance, FormRules } from 'element-plus'
import { validateEmail, validatePassword, validateCode } from '@/utils/validate'
import { GetCode } from '@/api/common'

defineOptions({
  name: 'Login'
})

const isLogin = ref<string>('登录')

const userFormRef = ref<FormInstance | undefined>()
const userForm = reactive({
  userName: '',
  password: '',
  passwordTwice: '',
  code: ''
})

/** 用户名校验规则 */
const checkUserName = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('帐号不能为空'))
  } else if (!validateEmail(value)) {
    return callback(new Error('邮箱格式不正确'))
  } else {
    return callback()
  }
}

/** 密码校验规则 */
const checkPassword = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('密码不能为空'))
  } else if (!validatePassword(value)) {
    return callback(new Error('密码必须6~20位，包含数字和字母'))
  } else {
    return callback()
  }
}

/** 密码二次名校验规则 */
const checkPasswordTwice = (rule: any, value: any, callback: any) => {
  const password = userForm.password
  if (!value) {
    return callback(new Error('密码不能为空'))
  } else if (!validatePassword(value)) {
    return callback(new Error('密码必须6~20位，包含数字和字母'))
  } else if (password && password !== value) {
    return callback(new Error('两次密码不一致'))
  } else {
    return callback()
  }
}

/** 验证码校验规则 */
const checkCode = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('验证码不能为空'))
  }
  if (!validateCode(value)) {
    callback(new Error('验证码为6位'))
  } else {
    callback()
  }
}

/** 表单规则 */
const userRules = reactive<FormRules>({
  userName: [
    { validator: checkUserName, trigger: 'blur' }
  ],
  password: [
    { validator: checkPassword, trigger: 'blur' }
  ],
  passwordTwice: [
    { validator: checkPasswordTwice, trigger: 'blur' }
  ],
  code: [
    { validator: checkCode, trigger: 'blur' }
  ]
})

 /** 提交按钮 */
const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      // console.log('error submit!', fields)
    }
  })
}

 /** 验证码类型 */
const getModule = () => {
  switch (isLogin.value) {
    case '登录':return 'Login'
    case '注册':return 'Register'
    case '忘记密码': return 'Forget'
    default:
      return ''
  }
}
/** 验证码按钮 */
const getCode = async () => {
  console.log('获取验证码')

  await GetCode({
    username: userForm.userName,
    module: getModule()
  }).then((res) => {
    console.log(res)
  }).catch(error => {
      console.log(error)
  })
}

/** 按钮组变化监听 */
const radioChange = () => {
  resetForm(userFormRef.value)
  resetFormData()
}

/** 重置校验 */
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

/** 重置表单信息 */
const resetFormData = () => {
  userForm.userName = ''
  userForm.password = ''
  userForm.passwordTwice = ''
  userForm.code = ''
}
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
