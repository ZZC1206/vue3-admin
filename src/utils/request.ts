import axios from 'axios'

const request = axios.create({
  baseURL: 'xxx' // 基础路径
})

// 请求拦截器
request.interceptors.request.use(
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
request.interceptors.response.use(
  response => {
    // 使用响应数据，2xx范围内的状态代码都会触发
    return response
  },
  err => {
    // 处理响应错误，超出2xx范围的状态代码都会触发，例如 token 无效、服务端异常等
    return Promise.reject(err)
  }
)

export default request
