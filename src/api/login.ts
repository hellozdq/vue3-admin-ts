import request from '@/common/request'


export type LoginForm = {
    account: string,
    password: string
}
// 登陆
export function toLogin(data:LoginForm) {
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