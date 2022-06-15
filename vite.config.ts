import path from 'path';
import { loadEnv, defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
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
export default ({ mode }) => defineConfig({
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
    // Components({
    //   resolvers: [VantResolver()],
    // }),
    legacy(),
    vueJsx(), // 添加这一句
    viteCompression(),
  ],
});
