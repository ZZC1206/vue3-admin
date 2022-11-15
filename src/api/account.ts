/**
 * 关于帐号接口封装
 */
import request from '@/utils/request'
import { AccountLoginOrRegisterData, IAccountLoginData, IAccountRegisterData } from './types/account'

/** 登录 */
export const Login = async (data: AccountLoginOrRegisterData) => {
  return await request<IAccountLoginData>({
    method: 'post',
    url: '/login/',
    data
  })
}

/** 注册 */
export const Register = async (data: AccountLoginOrRegisterData) => {
  return await request<IAccountRegisterData>({
    method: 'post',
    url: '/register/',
    data
  })
}
