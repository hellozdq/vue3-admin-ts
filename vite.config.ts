import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const path = require('path')

function resolve(dir) {
  return path.resolve(__dirname, dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: '/'
  },
  css:{
    preprocessorOptions: {
       scss: {
         additionalData: `@import "@/styles/index.scss";`
       }
     }
  },
  resolve: {
    alias:{
      '@':resolve('src'),
    }
  },
  plugins: [vue()],
})


