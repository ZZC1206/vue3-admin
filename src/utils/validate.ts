/** 邮箱格式校验 */
export const validateEmail = (value: string): boolean => {
  // eslint-disable-next-line no-useless-escape
  const regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
  return regEmail.test(value)
}

/** 密码格式校验 */
export const validatePassword = (value: string): boolean => {
  const regPassword = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/
  return regPassword.test(value)
}

/** 验证码格式校验 */
export const validateCode = (value: string): boolean => {
  const regCode = /^[a-z0-9]{6}$/
  return regCode.test(value)
}
