import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/message-box/style/css'
import '@/styles/index.scss'

import SvgIcon from '@/components/svgIcon/index.vue'
import 'virtual:svg-icons-register'

import pinia from '@/store'

// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router)
  .use(pinia)
  .component('svg-icon', SvgIcon)
  .mount('#app')
