import axios, { AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store/useUserStore'
import router from '@/router'

const instance = axios.create({
  // baseURL: 'http://v3.web-jshtml.cn/api', // 基础路径
  baseURL: import.meta.env.VITE_API, // 基础路径
  timeout: 5000 // 超时，单位：毫秒
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 请求发送前做一些处理，例如：统一设置用户身份 Token
    const userStore = useUserStore()
    if (config && config?.headers) {
      config.headers.Token = userStore.token
      config.headers.Username = userStore.userName
    }
    return config
  },
  error => {
    // 处理请求错误
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  response => {
    // 使用响应数据，2xx范围内的状态代码都会触发
    const data = response.data
    if (data.resCode === 0) {
      return Promise.resolve(data)
    } else {
      // 处理 Token 过期
      ElMessage.error(`业务代码：${data.resCode}，${data.message}`)
      return Promise.reject(data)
    }
  },
  err => {
    // 处理响应错误，超出2xx范围的状态代码都会触发，例如 token 无效、服务端异常等
    const errorData = JSON.parse(err.request.response)
    // token失效自动退出
    if (errorData.resCode === 1010) {
      if (errorData.message) {
        ElMessage.error(errorData.message)
      }
      // 清空信息
      const userStore = useUserStore()
      userStore.clearInfo()
      // 返回登录页面
      router.push({
        name: 'Login',
        path: '/login'
      })
      return Promise.reject(err)
    }

    // 1.公共错误处理
    if (err && err.response) {
      // 2.根据响应码具体处理
      switch (err.response.status) {
        case 400:
          err.message = '错误请求'
          break
        case 401:
          err.message = '未授权，请重新登录'
          break
        case 403:
          err.message = '拒绝访问'
          break
        // case 404:
        //   err.message = '请求错误，未找到该资源'
        //   break
        case 405:
          err.message = '请求方法未允许'
          break
        case 408:
          err.message = '请求超时'
          break
        case 500:
          err.message = '服务器端出错'
          break
        case 501:
          err.message = '网络未实现'
          break
        case 502:
          err.message = '网络错误'
          break
        case 503:
          err.message = '服务不可用'
          break
        case 504:
          err.message = '网络超时'
          break
        case 505:
          err.message = 'http版本不支持该请求'
          break
        default:
          err.message = '响应错误'
      }
    } else {
      // 超时处理
      if (JSON.stringify(err).includes('timeout')) {
        err.message = '服务器响应超时，请刷新当前页'
      } else {
        err.message = '连接服务器失败'
      }
    }
    ElMessage.error(`错误代码：${err.response.status}；${err.message}`)
    return Promise.reject(err)
  }
)

/** 泛型请求方法 */
const request = async <T = any>(config: AxiosRequestConfig) => {
  return await instance(config).then(res => {
    return res as T
  })
}

export default request
