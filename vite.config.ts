import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import monkey, { cdn } from 'vite-plugin-monkey';
import { PagesInfoMap } from './src/Pages';
import { resolve } from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [
    vue(),
    monkey({
      entry: 'src/main.ts',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        author: 'Ryan',
        namespace: 'npm/vite-plugin-monkey',
        description: '自动签到脚本, 需要配合自动化脚本(MacOS: Script Editor / Windows: bat)使用, 开机启动(MacOS: 启动项管理 / Windows: Task Scheduler)',
        // match: ['https://juejin.cn/user/center/signin?__auto_signin=1&from=pornhub'],
        include: Object.values(PagesInfoMap).map(info => info.pattern),
      },
      build: {
        externalGlobals: {
          vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.js'),
        },
      },
    }),
  ],
});
