import { withInstall } from '/@/utils';
import basicArrow from './src/BasicArrow.vue';
import basicTitle from './src/BasicTitle.vue';
import basicHelp from './src/BasicHelp.vue';

/**
 * 用于显示标题，可以显示帮助按钮及文本
 */
export const BasicArrow = withInstall(basicArrow);
/**
 * 带动画的箭头组件
 */
export const BasicTitle = withInstall(basicTitle);

/**
 * 帮助按钮组件
 */
export const BasicHelp = withInstall(basicHelp);
