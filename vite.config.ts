import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import Pages from 'vite-plugin-pages'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/app',
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
    plugins: [
        react(),
        Pages({
            dirs: 'src/app/pages',
            exclude: ['**/components/*.tsx'],
            extensions: ['tsx'],
            resolver: 'react'
        }),
        visualizer(),
        viteStaticCopy({
            targets: [
                {
                    src: 'node_modules/pdfjs-dist/build/pdf.worker.mjs',
                    dest: 'assets'
                }
            ]
        })
    ]
})
