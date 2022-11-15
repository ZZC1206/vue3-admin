/**
 * 公共基础接口封装
 */
import request from '@/utils/request'
import { AccountGetCodePostData, IGetCodeData } from './types/common'

/** 获取验证码 */
export const GetCode = async (data: AccountGetCodePostData) => {
  return await request<IGetCodeData>({
    method: 'post',
    url: '/getCode123/',
    data
  })
}
