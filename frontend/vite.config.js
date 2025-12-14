import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    // 代码分割配置
    rollupOptions: {
      output: {
        manualChunks: {
          // 将 React 和 React DOM 单独打包
          'react-vendor': ['react', 'react-dom'],
          // 将 Material-UI 组件库单独打包
          'mui-vendor': [
            '@mui/material',
            '@mui/icons-material',
            '@emotion/react',
            '@emotion/styled'
          ],
          // 将 Redux 相关库单独打包
          'redux-vendor': ['@reduxjs/toolkit', 'react-redux'],
          // 将 axios 单独打包
          'axios-vendor': ['axios']
        }
      }
    },
    // 减小打包体积，使用 esbuild（Vite 默认）
    minify: 'esbuild',
    // esbuild 压缩选项
    esbuildOptions: {
      drop: ['console', 'debugger']
    },
    // 启用 CSS 代码分割
    cssCodeSplit: true,
    // 禁用源映射以减小文件大小
    sourcemap: false
  }
})
