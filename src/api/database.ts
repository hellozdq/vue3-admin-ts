import request from '@/common/request'

// 获取列表
export function getList(data: Database.ListForm) {
  return request({
    url: '/database/list',
    method: 'post',
    data
  })
  // return new Promise((resovle) => {
  //   resovle({ data: [] })
  // })
}

// 获取表名列表
export function getTableNameList() {
  return request({
    url: '/database/tableNameList',
    method: 'get'
  })
  // return new Promise((resovle) => {
  //   resovle({ data: [] })
  // })
}
