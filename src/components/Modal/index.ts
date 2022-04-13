import { withInstall } from '/@/utils';
import './src/index.less';
import basicModal from './src/BasicModal.vue';

// 对 antv 的 modal 组件进行封装，扩展拖拽，全屏，自适应高度等功能
export const BasicModal = withInstall(basicModal);
export { useModalContext } from './src/hooks/useModalContext';
export { useModal, useModalInner } from './src/hooks/useModal';
export * from './src/typing';
