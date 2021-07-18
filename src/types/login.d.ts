// 登陆表单
export type LoginForm = {
  account: string
  password: string
}

// 修改密码
export type UpdataData = {
  id: number
  account?: string
  password: string
  newPassword: string
  newPassword2?: string
}
