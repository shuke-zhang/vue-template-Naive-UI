import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig, loadEnv } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const _isBuild = command === 'build'

  return {
    define: {
      __DEV__: mode === 'development',
      __PROD__: mode === 'production',
      __APP_TITLE__: `"${env.VITE_APP_TITLE}"`,
      __API_URL__: `"${env.VITE_API_URL}"`,
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        'sass': 'sass-embedded',
      },
    },
    plugins: [
      vue(),
      vueJsx(),
      vueDevTools(),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        dts: './types/auto-imports.d.ts', // 指定生成的自动导入声明文件的路径
        dirs: ['./src/hooks', './src/utils', './src/stores'], // 告诉AutoImport插件在哪些目录中自动导入模块。插件会扫描这些目录中的文件，并根据文件内容自动生成导入语句。
        eslintrc: {
          enabled: true, // 生成 ESLint 配置，避免 import 报错
          filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true, // 自动设置全局变量
        },
        resolvers: [
          NaiveUiResolver(),
        ],
      }),
      Components({
        dirs: ['./src/components'],
        dts: './types/components.d.ts', // 指定生成的组件声明文件的路径
        resolvers: [
          NaiveUiResolver(),
        ],
      }),

    ],

    server: {
      host: '0.0.0.0',
      open: false,
      port: 88,
    },

    build: {
      rollupOptions: {
        external: ['fs'], // 确保不打包 Node.js 模块
      },
    },
  }
})
