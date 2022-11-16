/** 验证码类型 */
// enum codeType {
//   Login = '登录',
//   Register = '注册',
//   Forget = '忘记密码',
// }

/** 用户获取验证码发送数据类型 */
export interface AccountGetCodePostData {
  /** 用户名 */
  username: string
  /** 验证码类型 Login：登录，Register：注册，Forget：忘记密码 */
  module: string
}

/** 用户获取验证码返回数据类型 */
export interface IGetCodeData {
  /** 业务状态码 */
  resCode: number
  /** 消息 */
  message: string
  /** 验证码 */
  data: number | string
}

/** 异常接口返回数据类型 */
export interface IErrorHttp {
  /** 业务状态码 */
  resCode: number
  /** 消息 */
  message: string
  /** 验证码 */
  data: string | null
}
