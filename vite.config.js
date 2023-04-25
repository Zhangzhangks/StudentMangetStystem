import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'
import { VantResolver } from 'unplugin-vue-components/resolvers';
import { LayuiVueResolver } from 'unplugin-vue-components/resolvers';
import requireTransform from 'vite-plugin-require-transform';
export default defineConfig({
    // ...
    plugins: [vue(),
        // ...
        AutoImport({
            resolvers: [ElementPlusResolver(), LayuiVueResolver()]
        }),
        Components({
            resolvers: [ElementPlusResolver(), VantResolver(), LayuiVueResolver()],
        }),


    ],
    resolve: {
        alias: {
            '@': resolve('src')
        }
    },
    server: {
        port: 5050,
        proxy: {
            '/path': {
                target: 'http://127.0.0.1:3007',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/path/, '')
            },
            '/mock': {
                target: 'http://127.0.0.1:3007',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/path/, '')
            },
        }

    },

})