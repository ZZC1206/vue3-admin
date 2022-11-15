import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/index.scss'
import 'element-plus/es/components/message/style/css'

createApp(App).use(router).mount('#app')
