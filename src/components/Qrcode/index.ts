import { withInstall } from '/@/utils';
import qrCode from './src/Qrcode.vue';

/**
 * 用于生成二维码的组件
 */
export const QrCode = withInstall(qrCode);
export * from './src/typing';
