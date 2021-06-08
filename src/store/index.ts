import { createStore, Store } from 'vuex'

// 获取文件名 自动读取modules文件
const modulesFiles = import.meta.globEager("./modules/*.ts")

const modules = Object.keys(modulesFiles).reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/modules\/(.*)\.\w+$/, '$1')
  const value = modulesFiles[modulePath]
  modules[moduleName] = value.default
  return modules
}, {})


const store:Store<any> = createStore({
  modules
})
export default store