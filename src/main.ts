import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import router from './router/index'
import store from './store/index'
import '@/permission'
// import dialogDrag from '@/common/directives'

// 拖拽
import dialogDrag from './common/directives'

const app = createApp(App)
// app.directive('dialogDrag', dialogDrag);
app.use(ElementPlus, { locale })
app.use(router)
app.use(store)
app.use(dialogDrag)
app.mount('#app')
