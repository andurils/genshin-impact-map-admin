import { withInstall } from '/@/utils';

import pageFooter from './src/PageFooter.vue';
import pageWrapper from './src/PageWrapper.vue';

// 页面相关组件

/**
 * 用于页面底部工具栏
 */
export const PageFooter = withInstall(pageFooter);
/**
 * 用于包裹页面组件
 */
export const PageWrapper = withInstall(pageWrapper);

export const PageWrapperFixedHeightKey = 'PageWrapperFixedHeight';
