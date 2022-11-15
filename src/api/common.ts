/**
 * 公共基础接口封装
 */
import request from '@/utils/request'
import { AccountGetCodePostData, IGetCodeData } from './types/common'

/** 获取验证码 */
export const GetCode = async (params: AccountGetCodePostData) => await request<IGetCodeData>({
  method: 'POST',
  url: '/getCode/',
  params
})
