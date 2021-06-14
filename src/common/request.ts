import axios from 'axios'
import { ElMessageBox, ElMessage, ElLoading } from 'element-plus'
import store from '@/store'
import router from '@/router'
import { getToken } from './auth'

// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  baseURL: '/api', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 30000 // request timeout
})

let loadingInstance:any
// request interceptor
service.interceptors.request.use(
  (config:any) => {
    // do something before request is sent
    if (config.isLoading) {
      loadingInstance = ElLoading.service({
        text: '正在请求数据'
      })
    }
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    if (loadingInstance) {
      loadingInstance.close()
    }
    const res = response.data
    if (res.code !== 0) {
      if (res.code === -1) {
        ElMessageBox.confirm('您已登录超时，请重新登录！', '确认退出', {
          confirmButtonText: '重新登录',
          type: 'warning'
        }).then(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('accountId');
          router.push("/login");
        })
      } else {
        ElMessage({
          message: res.msg || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      }
      return Promise.reject(new Error(res.msg || 'Error'))
      // return res || 'Error'
    } else {
      return res
    }
  },
  error => {
    if (loadingInstance) {
      loadingInstance.close()
    }
    console.log('err' + error) // for debug
    ElMessage({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
