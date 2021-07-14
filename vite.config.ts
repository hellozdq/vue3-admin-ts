import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { loadEnv } from 'vite'

const path = require('path')

console.log(process.env.NODE_ENV)

export default ({ mode }) => {
  console.log(loadEnv(mode, process.cwd()).VITE_BASE_API)
  return defineConfig({
    base: './',
    server: {
      open: '/',
      proxy: {
        '/api': {
          target: 'http://localhost:5000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          // eslint-disable-next-line quotes
          additionalData: "@import '@/styles/index.scss';" //全家引入scss
        }
      }
    },
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    plugins: [vue()]
  })
}

function resolve(dir: string) {
  return path.resolve(__dirname, dir)
}

// https://vitejs.dev/config/
// export default defineConfig({
//   base: './',
//   server: {
//     open: '/',
//     proxy: {
//       '/api': {
//         target: 'http://localhost:5000',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, '')
//       }
//     }
//   },
//   css: {
//     preprocessorOptions: {
//       scss: {
//         additionalData: "@import '@/styles/index.scss';" //全家引入scss
//       }
//     }
//   },
//   resolve: {
//     alias: {
//       '@': resolve('src')
//     }
//   },
//   plugins: [vue()]
// })
