import request from '@/common/request'

export type ListForm = {
    pageSize: number,
    pageNum: number,
    name: string,
    phone: string
}

// 获取用户列表
export function getList(data:ListForm) {
    return request({
      url: '/user/list',
      method: 'post',
      data
    })
}

// 获取所有权限
export function getRoles() {
  return request({
    url: '/user/roles',
    method: 'get'
  })
}

// 根据用户id获取用户权限
type userIdData = {
    userId: number
}
export function getUserRoles(data: userIdData) {
    return request({
      url: '/user/rolesByUserId',
      method: 'get',
      params: data
    })
}


export type UpdateRoleQuery = {
    userId:number,
    roles:string
}

// 修改权限
export function updateRole(data:UpdateRoleQuery) {
    return request({
        url: '/user/updateRole',
        method: 'put',
        data
    })
}

// updateUser, UpdateData
// 修改用户
export type UpdateData = {
    id: number,
    name: string,
    phone: string
}

// 修改用户
export function updateUser(data:UpdateData) {
    return request({
        url: '/user/updateUser',
        method: 'put',
        data
    })
}

// 删除用户
export function deleteUser(data:object) {
    return request({
        url: '/user/deleteUser',
        method: 'delete',
        data
    })
}