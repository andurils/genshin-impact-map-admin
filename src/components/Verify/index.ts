import { withInstall } from '/@/utils/index';
import basicDragVerify from './src/DragVerify.vue';
import rotateDragVerify from './src/ImgRotate.vue';

/**
 * 拖动校验组件
 */
export const BasicDragVerify = withInstall(basicDragVerify);
/**
 * 图片还原正方向校验组件
 */
export const RotateDragVerify = withInstall(rotateDragVerify);
export * from './src/typing';
