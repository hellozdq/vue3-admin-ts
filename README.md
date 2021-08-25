## vue3 全局桶 + typescript + elementui 搭建后台管理系统

![avatar](/src/assets/images/login_page.jpg)

![avatar](/src/assets/images/page.jpg)

### 拉取使用

1. git clone https://github.com/hellozdq/vue3-admin-ts.git 拉取项目
2. yarn 安装依赖
3. yarn run dev 运行

### 结构

- api 所有接口
- assets 静态文件
- common 公共 ts
  - auth 增删 token
  - directives 拖拽指令（需修改）
  - index 公共方法
  - permission 权限方法
  - regexp 所有的正则
  - request 请求
  - scroll-to 页面变化方法（需修改）
- components 公共组件
  - Pagination 分页
- layout 布局
  - HeaderView 头部
    - HeadTags 头部标签栏
    - index 显示头部其他和组合头部标签栏
  - Sidebar 侧边栏
    - index 所有侧边栏
    - SidebarItem 子侧边栏组件
  - AppMain 主要内容路由页面（包括处理页面缓存）
  - index 组合所有布局（包括初始化头部标签栏）
- router 路由
- store vuex
- views 路由页面
- APP 主页面
- main 创建和配置 vue
- permission 权限
- shims-vue vue 的 ts 配置
- vite-env vite 的 ts 配置
- .env.development 开发环境配置
- .env.production 生产环境配置
- .gitignore git
- index.html 总页面
- package-lock package
- README.md 文档
- tsconfig.json ts 配置
- vite.config.ts vite 配置
- yarn-error.log
- yarn.lock

### 创建项目

- yarn create @vitejs/app 创建 vue3+typescript 项目

### 在 src 添加 views 文件

- views 添加 home/index.vue

### 添加 router

- yarn add vue-router@next -D

1. 建立路由

```
<!-- 在src建立 router/index.js
     在router/index.js在设置路由 -->
import { createRouter, createWebHistory } from "vue-router";

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component:() => import('../views/home/index.vue')
        }
    ]
})
```

2. 将 App.vue 的模板修改

```
    <template>
        <router-view></router-view>
    </template>
```

3. 在 main.ts 引入 router

```
import { createApp } from 'vue'
import router from './router/index'
import App from './App.vue'

const app = createApp(App)
app.use(router);
app.mount('#app')
```

### 添加 vuex

yarn add vuex@next --D

1. 建立 store

```
<!-- 在src建 store 文件夹
store 文件夹再建 index.ts 、modules/home.ts 文件
modules 主要用于分模块
 -->
//home.ts
type stateTy = {
    name:string
}

const state:stateTy = {
    name:'storeName'
}

const mutations = {
  SET_NAME: (state:stateTy,name:string) => {
      state.name = name
  }
}

const actions = {
  setName:({ commit }, name:string)=>{
    commit("SET_NAME",name)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

//index.ts
import { createStore } from 'vuex'

// 获取文件名 自动读取modules文件
const modulesFiles = import.meta.globEager("./modules/*.ts")

const modules = Object.keys(modulesFiles).reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/modules\/(.*)\.\w+$/, '$1')
  const value = modulesFiles[modulePath]
  modules[moduleName] = value.default
  return modules
}, {})


const store = createStore({
  modules
})
export default store
```

2. 添加 store 到 main.ts 中

```
import { createApp } from 'vue'
import router from './router/index'
import store from './store/index'
import App from './App.vue'

const app = createApp(App)
app.use(router);
app.use(store);
app.mount('#app')

```

3. 在 views 中的 home 使用 store

```
<template>
    <div>{{name}}</div>
    <button @click="setStoreName('name2')">按钮</button>
</template>

<script>
import { useStore } from 'vuex'
import { computed, defineComponent } from 'vue'
export default defineComponent({
    setup(props) {
        const store = useStore();
        const name = computed(() => store.state.home.name);
        function setStoreName(name){
            store.dispatch('app/setName',name)
        }
        return { name , setStoreName };
    }
})
</script>
```

### 基本的 vue3 + router + vuex 完成

### 将项目配置改成运行就打开浏览器

[vitejs](https://www.vitejs.net/config/#server-open)

```
server: {
    open: '/'
}
```

### 问题

```
An import path cannot end with a '.ts' extension.

修改vite.config.ts
resolve.extensions
```

### 接下来实现 layout(主要是侧边栏和选项卡)

1. 在 views 里建文件 layout layout 里建 HeaderView\、Sidebar\ 、index.vue 、AppMain

   - HeaderView 头部

   * HeadTags 头部导航标签
   * index 所有头部的信息

   - Siderbar 侧边栏
     - index
   - AppMain 中间内容
   - index.vue 组合

2. 引入 elementUI [element-plus](https://element-plus.gitee.io/#/zh-CN/component/quickstart)

3. 引入相关的组件 主要是侧边栏的和头部导航的，进行处理各自点击路由跳转，统一在 layout/index.vue 中监听 route.path 的变化进行选中的路由添加到 vuex 中的导航页面 tabViews，在 vuex 中进行选中的页面进行添加删除

4. 页面缓存使用 vuex 保存组件页面缓存添加删除 tags 的时候 添加删除缓存

5. 不会在 vite 使用 eslint yarn add eslint prettier --save-dev

6. 添加登陆页面

7. 添加并配置全局 axios

8. 添加动态路由(权限处理)

### 添加依赖导出 scss

[how-to-share-variables-between-js-and-sass](https://www.bluematador.com/blog/how-to-share-variables-between-js-and-sass) yarn add sass-loader node-sass --save-dev

添加了 path-browserify 使用 path 没成功

https://blog.csdn.net/h_mo_liang/article/details/113850297 yarn add --dev eslint eslint-plugin-vue @typescript-eslint/parser @typescript-eslint/eslint-plugin prettier-eslint eslint-config-prettier

### 添加 加密

```
yarn add jsencrypt --dep
```

### 设置变量

[https://blog.csdn.net/chendf\_\_/article/details/115676683](https://blog.csdn.net/chendf__/article/details/115676683)

```
npm i dotenv -D
```

#### 安装 cross-env

```
yarn add cross-env dotenv -D 根目录创建 .env.development .env.production

vite.config.js

const fs = require('fs');

try {
  // 根据环境变量加载环境变量文件
  const file = dotenv.parse(fs.readFileSync(`.env.${process.env.NODE_ENV}`))
  // 根据获取的key给对应的环境变量赋值
  for (const key in (file as object)) {
    process.env[key] = file[key]
  }
} catch (e) {
  console.error(e)
}

ts 中访问 process is not defined
```

### 设置变量 2

```
替换前面的设置变量
卸载设置变量1中的dotenv 和cross-env
yarn remove cross-env dotenv
```

<https://blog.csdn.net/hbiao68/article/details/108974194>

```
console.log(import.meta.env.VITE_APP_CONTEXT)
```

<http://events.jianshu.io/p/4973bd983e96>

```
vue3 在vite.config中无法使用import.meta.env.*的解决办法
import { loadEnv } from 'vite'
export default ({ mode }) => {
  return defineConfig({
          plugins: [vue()],
          base:loadEnv(mode, process.cwd()).VITE_APP_NAME
      })
}
```

### 路由 404

[https://next.router.vuejs.org/guide/migration/#removal-of-the-fallback-option](https://next.router.vuejs.org/guide/migration/#removal-of-the-fallback-option)

### eslint

1. 添加依赖 yarn add --dev eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-plugin-vue @typescript-eslint/parser @typescript-eslint/eslint-plugin @typescript-eslint/no-unused-vars
2. 根目录添加.eslintrc.js 、 .prettierrc

### 修改.d.ts

```
全局引入
declare namespace Database {
  // 查询列表表单的参数
  type ListForm = {
    pageSize: number
    pageNum: number
    tableName: string
  }
}
type全部改成这样

```

#### 存在的问题

1. 浏览器无法使用 requirst\path.resolve(暂时写了个方法 connectPath 替代)
2. eslint 用不了（已解决）、 引入 scss 到 js 用不了
3. axios AxiosRequestConfig 不存在 loading
4. el-dialog 使用指令失效(已修改，在 el-dilaog 外加一层ｄｉｖ)

5. const formRef = ref<any>(null); ref 的 typesrcipt 类型 formRef.value.validate (property) Ref<HTMLElement | null>.value: HTMLElement | null Object is possibly 'null'.

6. .ts 中访问 process process is not defined 暂时使用 any

### typescript 的简单记录

#### 类型兼容

1. any 可以赋值给除了 never 之外的任意类型，反过来其他类型可以赋值给 any(谨慎少用)
2. never 可以赋值给其他类型，反之不能被任何类型包括（any）赋值
3. unknown 和 never 反过来，不能把 unknown 赋值给除了 any 之外任何类型，反过来其他类型都可以赋值给 unknown
4. void、null、undefined void 仅可以赋值给 any 和 unknown 类型，反过来仅 any、never、undefined 可以赋值 void null、undefined 只能赋值给 any 和 unknown ，反过来其他类型除了 any 和 never 之外 都不可以赋值给 null 或 undefined

```
let isVoid: void
let isNever: never
let isUnknown: unknown
let isUndefined: undefined
let isNull: null = null
let isAny: any
let isNumber: number

isVoid = isAny
isVoid = isNever
isVoid = isUndefined
isVoid = isNumber //Type 'number' is not assignable to type 'void'.

isAny = isVoid
isUnknown = isVoid

isAny = isNull
isAny = isUndefined
isUnknown = isNull
isUnknown = isUndefined

isNull = isAny
isUndefined = isAny
isNull = isNever //Type 'null' is not assignable to type 'number'
isUndefined = isNever//Type 'undefined' is not assignable to type 'number'
```

5. enum 枚举类型 数字枚举和数字类型兼容 enum A { one } let num:number = A.one;

不同枚举不兼容

```
enum A { one } enum B { one } let a: A let b: B a = b //Type 'B' is not assignable to type 'A'.Vetur(2322)
```

6. 子类型和父类型都兼容

```
interface Parent {
  name: string
}
interface Child extends Parent {
  name: string
}

let p: Parent = { name: 'a' }
let c: Child = { name: 'b' }
p = c
c = p
```

7. 结构类型 如果两个类型结构一致，则互相兼容

```
class C1 {
  name = 'a'
}
class C2 {
  name = 'b'
}
interface P1 {
  name: string
}
interface P2 {
  name: string
}

let a1: C1 = { name: 'a1' }
let a2: C2 = { name: 'a2' }
let a3: P1 = { name: 'a3' }
let a4: P2 = { name: 'a4' }
a1 = a2
a3 = a4
a1 = a3
a3 = a1
console.log(a1)
let f: C1 = {
  name: 'a1',
  id: 1//ype '{ name: string; id: number; }' is not assignable to type 'C1'.Object literal may only specify known properties, and 'id' does not exist in type 'C1'.Vetur(2322)
}
let c = {
  name: 'a1',
  id: 1
}
a1 = c
```

#### ts

# Vue 3 + Typescript + Vite

This template should help get you started developing with Vue 3 and Typescript in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur). Make sure to enable `vetur.experimental.templateInterpolationService` in settings!

### If Using `<script setup>`

[`<script setup>`](https://github.com/vuejs/rfcs/pull/227) is a feature that is currently in RFC stage. To get proper IDE support for the syntax, use [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) instead of Vetur (and disable Vetur).

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can use the following:

### If Using Volar

Run `Volar: Switch TS Plugin on/off` from VSCode command palette.

### If Using Vetur

1. Install and add `@vuedx/typescript-plugin-vue` to the [plugins section](https://www.typescriptlang.org/tsconfig#plugins) in `tsconfig.json`
2. Delete `src/shims-vue.d.ts` as it is no longer needed to provide module info to Typescript
3. Open `src/main.ts` in VSCode
4. Open the VSCode command palette
5. Search and run "Select TypeScript version" -> "Use workspace version"
