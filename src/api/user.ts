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