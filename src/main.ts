import { createApp } from 'vue'
import router from './router/index'
import store from './store/index'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import '@/permission';
import dialogDrag from '@/common/directives'

console.log("----------------++++-2")

const app = createApp(App)
app.directive('dialogDrag', dialogDrag);
app.use(router);
app.use(store);
app.use(ElementPlus);
app.mount('#app');
