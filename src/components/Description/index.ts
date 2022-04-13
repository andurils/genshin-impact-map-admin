import { withInstall } from '/@/utils';
import description from './src/Description.vue';

// 对 antv 的 Descriptions 组件进行封装
export * from './src/typing';
export { useDescription } from './src/useDescription';
export const Description = withInstall(description);
