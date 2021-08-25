import request from '@/common/request'

// 登陆
export function toLogin(data: Login.LoginForm) {
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
export function updatePassword(data: Login.UpdataData) {
  return request({
    url: '/login/updatePassword',
    method: 'put',
    data
  })
}
