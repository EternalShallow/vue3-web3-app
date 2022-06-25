import path from 'path';
import { loadEnv, defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
// import styleImport from 'vite-plugin-style-import';

import viteCompression from 'vite-plugin-compression';
// import Components from 'unplugin-vue-components/vite';
// import { VantResolver } from 'unplugin-vue-components/resolvers';
// 添加这一句
const server = (mode: string) => ({
  host: '0.0.0.0',
  open: true,
  proxy: {
    [`^${loadEnv(mode, process.cwd()).VITE_BASE_API}/.*`]: {
      target: loadEnv(mode, process.cwd()).VITE_BASE_URL,
      changeOrigin: true,
    },
  },
});
// https://vitejs.dev/config/
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default ({ mode }) => defineConfig({
  // esbuild: {
  //   jsxInject: 'import React from \'react\'',
  // },
  define: {
    'process.env': {},
  },
  base: loadEnv(mode, process.cwd()).VITE_BASE_PATH,
  server: server(mode),
  preview: server(mode),
  // resolve: {
  //   alias: [{
  //     find: '@', replacement: path.resolve(__dirname, 'src'),
  //   }],
  // },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      // '@views': path.resolve(__dirname, 'src/views'),
      process: 'process/browser',
      stream: 'stream-browserify',
      zlib: 'browserify-zlib',
      util: 'util',
      web3: path.resolve(__dirname, './node_modules/web3/dist/web3.min.js'),
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
    preprocessorOptions: {
      less: {
        additionalData: '@import "@/styles/main.less";',
      },
    },
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // 将所有包含短横线的标签作为自定义元素处理
          isCustomElement: (tag: string | string[]) => tag.includes('-'),
        },
      },
    }),
    // styleImport({
    //   libs: [
    //     {
    //       libraryName: 'vant',
    //       esModule: true,
    //       resolveStyle: (name) => `vant/es/${name}/style`,
    //     },
    //   ],
    // }),
    // Components({
    //   resolvers: [VantResolver()],
    // }),
    legacy(),
    vueJsx(), // 添加这一句
    viteCompression(),
  ],
});
