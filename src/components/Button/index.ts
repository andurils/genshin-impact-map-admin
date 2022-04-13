import { withInstall } from '/@/utils';
import type { ExtractPropTypes } from 'vue';
import button from './src/BasicButton.vue';
import popConfirmButton from './src/PopConfirmButton.vue';
import { buttonProps } from './src/props';

export const Button = withInstall(button);
/**
 * 带有 PopConfirm 下拉菜单功能的按钮
 */
export const PopConfirmButton = withInstall(popConfirmButton);
export declare type ButtonProps = Partial<ExtractPropTypes<typeof buttonProps>>;
