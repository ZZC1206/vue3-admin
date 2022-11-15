/**
 * 公共基础接口封装
 */
import request from '@/utils/request'
import { AccountGetCodePostData, IGetCodeData, IErrorHttp } from './types/common'

/** 获取验证码 */
export const GetCode = async (data: AccountGetCodePostData) => {
  return await request<IGetCodeData>({
    method: 'post',
    url: '/getCode/',
    data
  })
}

/** http 状态码异常演示接口 */
export const ErrorHttp = async (data = {}) => {
  return await request<IErrorHttp>({
    method: 'post',
    url: '/error/',
    data
  })
}
