import request from '@/common/request'

/* 获取列表 */
export type ListData = {
    pageSize:number,
    pageNum:number,
    name:string,
    phone:number
}
export function getList(data:ListData) {
    return request({
        url: `/user/getList`,
        method: 'post',
        data
    })
}

/* 修改信息 */ 
export type UpdateData = {
    id:number,
    name:string,
    phone:number
}
export function updateUser(data:UpdateData) {
    return request({
        url: `/user/updateUser`,
        method: 'post',
        data
    })
}

/* 获取权限 */
export type RolesQuery = {
    userId:number
}
export function getRolesList(data:RolesQuery) {
    return request({
      url: `/user/getRolesList`,
      method: 'post',
      data
    })
}

/* 修改权限 */
export type UpdateRoleQuery = {
    userId:number,
    roles:string
}
export function updateRoles(data:UpdateRoleQuery) {
    return request({
      url: `/user/updateRoles`,
      method: 'put',
      data
    })
}