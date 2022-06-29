import 'amfe-flexible';

import './utils/lib/polyfills.ts';
import { createApp } from 'vue';
import {
  Button,
  Tabbar,
  TabbarItem,
  ActionSheet,
  Picker,
} from 'vant';
import router from './router/index.ts';
import store from './store/index.ts';
import App from './App.tsx';

// TODO 按需引入样式待优化
import 'vant/lib/index.css';
import './styles/main.less';
import i18n from './lang/index.ts';

if (typeof (window as any).global === 'undefined') {
  (window as any).global = window;
}

const app = createApp(App)
  .use(i18n)
  .use(store)
  .use(router)
  .use(Button)
  .use(ActionSheet)
  .use(Tabbar)
  .use(Picker)
  .use(TabbarItem);
app.mount('#app');
console.log(app);
app.config.globalProperties.$common = 'common';
export default app;
