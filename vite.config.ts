import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import EslintPlugin from 'vite-plugin-eslint'
import legacy from '@vitejs/plugin-legacy'
import path from 'path'
// import VueMacros from 'unplugin-vue-macros/vite'
import DefineOptions from 'unplugin-vue-define-options/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // VueMacros({
    //   plugins: {
    //     vue: vue()
    //     // vueJsx: VueJsx(), // if needed
    //   }
    // }),
    DefineOptions(),
    EslintPlugin({
      // 配置选项
      cache: false // 禁用 eslint 缓存
    }),
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/variables.scss";'
      }
    }
  }
  // server: {
  //   proxy: {
  //     // 字符串简写写法
  //     '/foo': 'http://localhost:4567', // => 'http://localhost:4567/foo'
  //     // 选项写法
  //     '/api': {
  //       // 代理的目标地址
  //       target: 'http://jsonplaceholder.typicode.com',
  //       // true，代理服务会把 origin 修改为目标地址 http://jsonplaceholder.typicode.com
  //       changeOrigin: true,
  //       // 路径重写
  //       rewrite: (path) => path.replace(/^\/api/, '')
  //     }
  //   }
  // }
})
