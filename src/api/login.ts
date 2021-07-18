import request from '@/common/request'
import { LoginForm, UpdataData } from '@/types/login'

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
export function updatePassword(data: UpdataData) {
  return request({
    url: '/login/updatePassword',
    method: 'put',
    data
  })
}
