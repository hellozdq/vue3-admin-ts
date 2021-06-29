import request from '@/common/request'

export type LoginForm = {
  account: string
  password: string
}
// 登陆
export function toLogin(data: LoginForm) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

// 获取rsa key
export function getPublicKey() {
  return request({
    url: '/login/publicKey',
    method: 'get'
  })
}

// 修改密码
export type UpdataData = {
  id: number
  account?: string
  password: string
  newPassword: string
  newPassword2?: string
}
export function updatePassword(data: UpdataData) {
  return request({
    url: '/login/updatePassword',
    method: 'put',
    data
  })
}
