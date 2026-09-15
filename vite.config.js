import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// Vite 配置
// - Vue 3 单页应用
// - 资源别名 @/ → src/
// - 开发服务器 5173，预览 4173
// - 允许访问局域网（方便其他设备预览）
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // 根目录的 assets 也用 @assets 别名访问
      '@assets': fileURLToPath(new URL('./assets', import.meta.url))
    }
  },
  server: {
    port: 5173,
    host: '0.0.0.0',
    open: true
  },
  preview: {
    port: 4173,
    host: '0.0.0.0'
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    chunkSizeWarningLimit: 1500
  }
})
