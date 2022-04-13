import { withInstall } from '/@/utils';
import basicDrawer from './src/BasicDrawer.vue';

// 对 antv 的 drawer 组件进行封装，扩展拖拽，全屏，自适应高度等功能。
export const BasicDrawer = withInstall(basicDrawer);
export * from './src/typing';
export { useDrawer, useDrawerInner } from './src/useDrawer';
