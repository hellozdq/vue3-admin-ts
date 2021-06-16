import request from '@/common/request'

export type ListForm = {
    pageSize:number,
    pageNum:number,
    name:string,
    phone:number
}

// 获取用户列表
export function getList(data:ListForm) {
    return request({
      url: '/user/list',
      method: 'post',
      data
    })
}

// 获取权限
export function getRoles() {
  return request({
    url: '/user/selectRoles',
    method: 'get'
  })
}

// updateRoles, UpdateRoleQuery

export type UpdateRoleQuery = {
    userId:number,
    roles:string
}

// 修改权限
export function updateRoles(data:UpdateRoleQuery) {
    return request({
        url: '/user/updateRoles',
        method: 'get'
    })
}

// updateUser, UpdateData
// 修改用户
export type UpdateData = {
    id: number,
    name: string,
    phone: number
}

// 修改权限
export function updateUser(data:UpdateData) {
    return request({
        url: '/user/updateUser',
        method: 'put'
    })
}