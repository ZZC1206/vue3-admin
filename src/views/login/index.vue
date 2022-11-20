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
          <el-radio-button label="Login">
            登录
          </el-radio-button>
          <el-radio-button label="Register">
            注册
          </el-radio-button>
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
            v-show="isLogin === 'Register'"
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
          <el-row :gutter="10">
            <el-col :span="14">
              <el-input
                v-model="userForm.code"
                placeholder="验证码"
                size="large"
              />
            </el-col>
            <el-col :span="10">
              <el-button
                :type="codeBtn.disabled ? 'info' : ''"
                size="large"
                class="el-button-block"
                :loading="codeBtn.loading"
                :disabled="codeBtn.disabled"
                @click="getCode"
              >
                {{ codeBtn.text }}
              </el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 提交按钮 -->
        <el-form-item>
          <el-button
            type="primary"
            size="large"
            class="el-button-block"
            :loading="subBtn.loading"
            :disabled="subBtn.disabled"
            @click="onSubmit(userFormRef)"
          >
            {{ isLogin === 'Login' ? '登陆' : '注册' }}
          </el-button>
        </el-form-item>
      </el-form>
      <!-- <el-button @click="login">
        登陆
      </el-button>
      <el-button @click="register">
        注册
      </el-button> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onBeforeUnmount } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { FormInstance, FormRules, ElMessage } from 'element-plus'
import { validateEmail, validatePassword, validateCode } from '@/utils/validate'
import { GetCode } from '@/api/common'
import { Register } from '@/api/account'
import sha1 from 'js-sha1'
import { useUserStore } from '@/store/useUserStore'
import { useRoute, useRouter } from 'vue-router'

defineOptions({
  name: 'Login'
})

const isLogin = ref<string>('Login')

const userFormRef = ref<FormInstance | undefined>()
const userForm = reactive({
  userName: '409019683@qq.com',
  password: 'qq111111',
  passwordTwice: 'qq111111',
  // userName: '',
  // password: '',
  // passwordTwice: '',
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
  // 如果是登录，不需要校验确认密码，默认通过
  if (isLogin.value === 'Login') {
    callback()
    return
  }
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

/** 提交按钮属性 */
const subBtn = reactive({
  loading: false,
  disabled: false
})

/** 提交按钮 */
const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      subBtn.loading = true
      // 判断是登录 / 注册
      isLogin.value === 'Login' ? login() : register()
    } else {
      ElMessage.error('登陆表单检验失败')
      console.log('error submit!', fields)
      return false
    }
  }).finally(() => resetSubBtn())
}

const userstore = useUserStore()

const router = useRouter()
const route = useRoute()

/** 登陆 */
const login = async () => {
  // await Login({
  //   username: userForm.userName,
  //   password: sha1(userForm.password),
  //   code: parseInt(userForm.code)
  // })
  await userstore.userLogin({
    username: userForm.userName,
    password: sha1(userForm.password),
    code: parseInt(userForm.code)
  }).then((res) => {
    // console.log(res)
    // 跳转回原来页面
    let redirect = route.query.redirect || '/'
    if (typeof redirect !== 'string') {
      redirect = '/'
    }
    router.replace(redirect)
  })
    .catch((err) => { ElMessage.error('登陆失败：' + err) })
  // .finally(() => { })
}

/** 注册 */
const register = async () => {
  await Register({
    username: userForm.userName,
    password: sha1(userForm.password),
    code: parseInt(userForm.code)
  })
    .then((res) => {
      console.log(res)
      if (res.data?.username) {
        ElMessage.success(res.message)
        userForm.userName = res.data?.username
      } else if (res.data?.user || !res.data.code) {
        ElMessage.warning(res.message)
      }
    })
    .catch((err) => {
      ElMessage.error(err.message)
    })
  // .finally(() => { })
}

/** 验证码按钮属性 */
const codeBtn = reactive({
  loading: false,
  disabled: false,
  text: '获取',
  timer: 1
})

/** 验证码按钮 */
const getCode = async () => {
  // 校验用户名
  if (!validateEmail(userForm.userName)) {
    ElMessage.warning('用户名不能为空 或 格式不正确')
    return false
  }
  // 校验密码
  if (!validatePassword(userForm.password)) {
    ElMessage.warning('密码不能为空 或 格式不正确')
    return false
  }
  // 判断非‘登录’时，校验密码
  if (isLogin.value === 'Register' && (userForm.password !== userForm.passwordTwice)) {
    ElMessage.warning('两次密码不一致')
    return false
  }
  codeBtn.loading = true
  codeBtn.text = '发送中'

  await GetCode({
    username: userForm.userName,
    module: isLogin.value
  }).then((res) => {
    if (res.resCode === 1024) {
      ElMessage.warning(res.message)
      return false
    } else if (res.resCode === 0) {
      ElMessage.success(res.message)
      console.log(res.data)
      userForm.code = res.data.toString()
      // 执行倒计时
      countdown(30)
      return true
    } else {
      ElMessage.error(res.message)
      return false
    }
  }).catch(() => {
    codeBtn.text = '获取验证码'
  }).finally(() => {
    codeBtn.loading = false
  })
}

/** 倒计时，默认60秒 */
const countdown = (time: number = 60) => {
  let second = time // 默认时间
  codeBtn.loading = false // 取消加载
  codeBtn.disabled = true // 禁用按钮
  codeBtn.text = `${second} 秒` // 按钮文本
  // 判断是否存在定时器，存在则先清除
  if (codeBtn.timer) { clearInterval(codeBtn.timer) }
  // 开启定时器
  codeBtn.timer = setInterval(() => {
    second--
    codeBtn.text = `${second} 秒` // 按钮文本
    if (second <= 0) {
      codeBtn.text = '重新获取' // 按钮文本
      codeBtn.disabled = false // 启用按钮
      clearInterval(codeBtn.timer) // 清除倒计时
    }
  }, 1000)
}

/** 按钮组变化监听 */
const radioChange = () => {
  resetFormCheck(userFormRef.value)
  resetFormData()
  resetCodeBtn()
  resetSubBtn()
}

// 组件销毁之前 - 生命周期
onBeforeUnmount(() => {
  clearInterval(codeBtn.timer) // 清除倒计时
})

/** 重置校验 */
const resetFormCheck = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

/** 重置表单信息 */
const resetFormData = () => {
  // userForm.userName = ''
  userForm.password = ''
  userForm.passwordTwice = ''
  userForm.code = ''
}

/** 重置登录按钮状态 */
const resetSubBtn = () => {
  subBtn.disabled = false
  subBtn.loading = false
}
/** 重置验证码按钮状态 */
const resetCodeBtn = () => {
  clearInterval(codeBtn.timer) // 清除倒计时
  codeBtn.timer = 1
  codeBtn.text = '获取'
  codeBtn.disabled = false
  codeBtn.loading = false
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
  width: 262px;
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
</style>
