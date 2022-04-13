import { withInstall } from '/@/utils';
import collapseContainer from './src/collapse/CollapseContainer.vue';
import scrollContainer from './src/ScrollContainer.vue';
import lazyContainer from './src/LazyContainer.vue';

/**
 * 区域折叠卡片容器
 */
export const CollapseContainer = withInstall(collapseContainer);
/**
 * 滚动容器组件 参考 element-ui 的 el-scrollbar 组件实现
 */
export const ScrollContainer = withInstall(scrollContainer);
/**
 * 延时加载/懒加载组件, 只在组件可见或者延迟一段时间才进行加载
 */
export const LazyContainer = withInstall(lazyContainer);

export * from './src/typing';
