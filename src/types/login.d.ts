declare namespace Login {
  // 登陆表单
  type LoginForm = {
    account: string
    password: string
  }

  // 修改密码
  type UpdataData = {
    id: number
    account?: string
    password: string
    newPassword: string
    newPassword2?: string
  }
}
