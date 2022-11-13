import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import EslintPlugin from 'vite-plugin-eslint'
import legacy from '@vitejs/plugin-legacy'
import path from 'path'
// import VueMacros from 'unplugin-vue-macros/vite'
import DefineOptions from 'unplugin-vue-define-options/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    DefineOptions(),
    EslintPlugin({
      // 配置选项
      cache: false // 禁用 eslint 缓存
    }),
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
