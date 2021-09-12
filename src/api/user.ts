import request from '@/common/request'

// 获取用户列表
export function getList(data: User.ListForm) {
  // return request({
  //   url: '/user/list',
  //   method: 'post',
  //   data
  // })
  return new Promise(function (resovle) {
    resovle([])
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
export function getUserRoles(data: User.userIdData) {
  // return request({
  //   url: '/user/rolesByUserId',
  //   method: 'get',
  //   params: data
  // })
  return { data: 'admin' }
}

// 修改权限
export function updateRole(data: User.UpdateRoleQuery) {
  return request({
    url: '/user/updateRole',
    method: 'put',
    data
  })
}

// updateUser, UpdateData
// 修改用户
export function updateUser(data: User.UpdateData) {
  return request({
    url: '/user/updateUser',
    method: 'put',
    data
  })
}

// 删除用户
export function deleteUser(data: object) {
  return request({
    url: '/user/deleteUser',
    method: 'delete',
    data
  })
}
