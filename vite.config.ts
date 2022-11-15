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
  },
  server: {
    open: false, // 编译完成后是否自动打开网页
    host: '0.0.0.0', // 指定使用地址，默认 localhost， 0.0.0.0 代表可以被外界访问
    port: 8080 // 指定访问的端口号
    // proxy: { // 代理跨域
    //   // 字符串简写写法
    //   '/foo': 'http://localhost:4567', // => 'http://localhost:4567/foo'
    //   // 选项写法
    //   '/api': {
    //     // 代理的目标地址
    //     target: 'http://jsonplaceholder.typicode.com',
    //     // 是否允许跨域，true，代理服务会把 origin 修改为目标地址 http://jsonplaceholder.typicode.com
    //     changeOrigin: true,
    //     ws: false, // （选）是否启用 websockets
    //     secure: false, // （选）是否启用 https 接口
    //     // （选）路径重写，匹配 /api 的字符串，替换换成空字符串
    //     rewrite: (path) => path.replace(/^\/api/, '')
    //   }
    // }
  }
})
