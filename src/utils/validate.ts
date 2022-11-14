/** 邮箱格式校验 */
export const validateName = (value: string): boolean => {
  // eslint-disable-next-line no-useless-escape
  const regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
  return regEmail.test(value)
}

// /** 用户名校验规则 */
// export const checkPassword = (rule: any, value: any, callback: any) => {
//   const regPassword = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/
//   if (!value) {
//     return callback(new Error('请输入密码'))
//   } else if (!regPassword.test(value)) {
//     return callback(new Error('密码必须6~20位，包含数字、字母'))
//   } else {
//     return callback()
//   }
// }

// /** 用户名校验规则 */
// export const checkPasswordTwice = (rule: any, value: any, callback: any) => {
//   const regPassword = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/
//   const password = userForm.password
//   if (!value) {
//     return callback(new Error('请输入密码'))
//   } else if (!regPassword.test(value)) {
//     return callback(new Error('密码必须6~20位，包含数字、字母'))
//   } else if (password && password !== value) {
//     return callback(new Error('两次密码不一致'))
//   } else {
//     return callback()
//   }
// }

/** 验证码校验规则 */
export const checkCode = (rule: any, value: any, callback: any) => {
  const regCode = /^[a-z0-9]{6}$/
  if (!value) {
    return callback(new Error('请输入验证码'))
  }
  if (!regCode.test(value)) {
    callback(new Error('验证码为6位'))
  } else {
    callback()
  }
}
