import axios, { AxiosRequestConfig } from 'axios'

const instance = axios.create({
  // baseURL: 'http://v3.web-jshtml.cn/api', // 基础路径
  baseURL: import.meta.env.VITE_API, // 基础路径
  timeout: 5000 // 超时，单位：毫秒
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 请求发送前做一些处理，例如：统一设置用户身份 Token
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
      return Promise.reject(data)
    }
  },
  err => {
    // 处理响应错误，超出2xx范围的状态代码都会触发，例如 token 无效、服务端异常等
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
