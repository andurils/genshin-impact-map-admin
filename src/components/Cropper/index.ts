import { withInstall } from '/@/utils';
import cropperImage from './src/Cropper.vue';
import avatarCropper from './src/CropperAvatar.vue';

//图片裁剪组件
export * from './src/typing';
/**
 *  图片裁剪组件
 */
export const CropperImage = withInstall(cropperImage);
/**
 *  头像裁剪组件
 */
export const CropperAvatar = withInstall(avatarCropper);
