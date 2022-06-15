import { createApp } from 'vue';

import 'amfe-flexible';
import { Button } from 'vant';
import router from './router/index.ts';
import store from './store/index.ts';
import App from './App.tsx';
// TODO 按需引入样式待优化
import 'vant/lib/index.css';

const app = createApp(App)
  .use(store)
  .use(router)
  .use(Button);

app.mount('#app');
