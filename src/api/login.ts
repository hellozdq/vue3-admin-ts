import request from '@/common/request'

/* 登录 */
export type LoginForm = {
    account:string,
    password:string
}
export function login(data:LoginForm) {
    return request({
        url: `/account/login`,
        method: 'post',
        data
    })
}

/* 退出登录 */
export function logout(data:number) {
    return request({
        url: `/account/logout`,
        method: 'post',
        data
    })
}

/* 修改密码 */
export type UpdataData = {
    id:number,
    account?:string,
    password:string,
    newPassword:string,
    newPassword2?:string
}
export function updatePassword(data:UpdataData) {
    return request({
      url: `/account/updatePassword`,
      method: 'put',
      data
    })
}