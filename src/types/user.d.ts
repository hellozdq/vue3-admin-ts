declare namespace User {
  // 查询列表表单的参数
  export type ListForm = {
    pageSize: number
    pageNum: number
    name: string
    phone: string
  }

  // 根据用户id获取用户权限的参数
  type userIdData = {
    userId: number
  }
  //   修改权限参数
  export type UpdateRoleQuery = {
    userId: number
    roles: string
  }

  // updateUser, UpdateData
  // 修改用户的参数
  export type UpdateData = {
    id: number
    name: string
    phone: string
  }
}
