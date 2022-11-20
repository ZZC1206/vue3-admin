import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
// pinia 数据持久化
pinia.use(piniaPluginPersistedstate)

export default pinia
