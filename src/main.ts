import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/index.scss'
import 'element-plus/es/components/message/style/css'

import SvgIcon from '@/components/svgIcon/index.vue'
import 'virtual:svg-icons-register'

createApp(App)
  .use(router)
  .component('svg-icon', SvgIcon)
  .mount('#app')
