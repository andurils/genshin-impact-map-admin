import type { App } from 'vue';
import { Button } from './Button';
import { Input, Layout } from 'ant-design-vue';

export function registerGlobComp(app: App) {
  // 注册 antdv的Input、Layout组件和手写的Button组件
  app.use(Input).use(Button).use(Layout);
}
