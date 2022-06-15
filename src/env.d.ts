/// <reference types="vite/client" />

// declare module '*.vue' {
//   import type { DefineComponent } from 'vue';
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
//   const component: DefineComponent<{}, {}, any>;
//   export default component;
// }
declare module '*.ts'
declare module '*.tsx'
declare module '*.vue'
interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_PROVIDER: never
}
