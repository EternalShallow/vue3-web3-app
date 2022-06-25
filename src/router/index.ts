import {
  createRouter, createWebHistory, RouteRecordRaw,
} from 'vue-router';

// const modules: any = import.meta.glob('../views/**/**.tsx');
// const routes: any = [];
// if (modules) {
//   for (const key in modules) {
//     if (Object.prototype.hasOwnProperty.call(modules, key)) {
//       const name = key.split('.tsx')[0].split('/')[key.split('.tsx')[0].split('/').length - 1];
//       // home 从定向
//       routes.push({
//         path: `/${name === 'home' ? '' : name}`,
//         name,
//         meta: {
//           title: name,
//         },
//         component: modules[key],
//       });
//     }
//   }
// }
// console.log(routes);
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: 'home',
    path: '/home',
    component: () => import('@/views/home/index.tsx'),
  },
  {
    name: 'record',
    path: '/record',
    component: () => import('@/views/record/index.tsx'),
  },
];
export const ROUTES = routes;
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({
    top: 0,
  }),
});
export default router;
