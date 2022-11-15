/** 用户登录 / 注册 数据 */
export interface AccountLoginOrRegisterData {
  /** 用户名 */
  username: string
  /** 密码 */
  password: string,
  /** 验证码 */
  code: number
}

/** ‘登录’数据集合 */
export interface AccLoginData {
  /** token令牌 */
  token: string
  /**  用户名 */
  username: string,
  /** 业务状态码 */
  resCode: number
}

/** 用户‘登录’返回数据 */
export interface IAccountLoginData {
  /** 数据集合 */
  data: AccLoginData
  /** 消息 */
  message: string,
  /** 业务状态码 */
  resCode: number
}

/** ‘注册’数据集合 */
export interface AccRegisterData {
  /** 用户名状态 true：已存在，false：不存在 */
  user?: boolean
  /** 验证码状态 true：正确，false：不正确 */
  code?: boolean,
  /** token 密钥 */
  token?: string
  /** 用户名 */
  username?: string
}

/** 用户‘注册’返回数据 */
export interface IAccountRegisterData {
  /** 数据集合 */
  data: AccRegisterData
  /** 消息 */
  message: string,
  /** 业务状态码 */
  resCode: number
}
