import { withInstall } from '/@/utils';
import countButton from './src/CountButton.vue';
import countdownInput from './src/CountdownInput.vue';

/**
 * 倒计时输入框按钮组件  短信验证码等
 */
export const CountdownInput = withInstall(countdownInput);
/**
 * 倒计时按钮组件
 */
export const CountButton = withInstall(countButton);
