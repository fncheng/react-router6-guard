import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    'react-vendor': ['react', 'react-dom', 'react-router-dom'],
                    antd: ['antd']
                }
            }
        },
        cssCodeSplit: true
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    server: {
        port: 10001,
        proxy: {
            '/proxyApi/test': {
                target: 'http://127.0.0.1:3000',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/proxyApi\/test/, '/test')
            }
        }
    },
    plugins: [react(), visualizer()]
})
