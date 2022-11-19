import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/index.scss'
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/message-box/style/css'

import SvgIcon from '@/components/svgIcon/index.vue'
import 'virtual:svg-icons-register'

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const pinia = createPinia()
// pinia 数据持久化
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router)
  .use(pinia)
  .component('svg-icon', SvgIcon)
  .mount('#app')
