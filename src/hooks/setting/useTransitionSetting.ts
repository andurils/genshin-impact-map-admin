import type { TransitionSetting } from '/#/config';

import { computed } from 'vue';

import { useAppStore } from '/@/store/modules/app';

/**
 * 过渡动画设置
 *
 */
export function useTransitionSetting() {
  // 应用状态
  const appStore = useAppStore();
  // 是否开启页面切换动画
  const getEnableTransition = computed(() => appStore.getTransitionSetting?.enable);
  // 是否开启顶部进度条
  const getOpenNProgress = computed(() => appStore.getTransitionSetting?.openNProgress);
  // 是否开启页面加载动画;
  const getOpenPageLoading = computed((): boolean => {
    return !!appStore.getTransitionSetting?.openPageLoading;
  });
  // 路由切换动画
  const getBasicTransition = computed(() => appStore.getTransitionSetting?.basicTransition);

  // 设置过渡动画设置
  function setTransitionSetting(transitionSetting: Partial<TransitionSetting>) {
    appStore.setProjectConfig({ transitionSetting });
  }

  return {
    setTransitionSetting,

    getEnableTransition,
    getOpenNProgress,
    getOpenPageLoading,
    getBasicTransition,
  };
}
