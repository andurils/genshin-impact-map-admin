import type { RouteLocationNormalized, Router } from 'vue-router';

import { useRouter } from 'vue-router';
import { unref } from 'vue';

import { useMultipleTabStore } from '/@/store/modules/multipleTab';
import { useAppStore } from '/@/store/modules/app';

/**
 * 标签动作枚举
 */
enum TableActionEnum {
  /**
   * 重新加载
   */
  REFRESH,
  /**
   * 关闭全部标签页
   */
  CLOSE_ALL,
  /**
   * 关闭左侧标签页
   */
  CLOSE_LEFT,
  /**
   * 关闭右侧标签页
   */
  CLOSE_RIGHT,
  /**
   * 关闭其他标签页
   */
  CLOSE_OTHER,
  /**
   * 关闭激活标签页
   */
  CLOSE_CURRENT,
  /**
   * 关闭标签页
   */
  CLOSE,
}

/**
 * 多标签页相关操作
 */
export function useTabs(_router?: Router) {
  const appStore = useAppStore();

  /**
   *  是否可以使用多标签页
   *
   * @return {*}  {boolean}
   */
  function canIUseTabs(): boolean {
    const { show } = appStore.getMultiTabsSetting;
    if (!show) {
      // multi-tab page 模式未打开,请在设置中打开
      throw new Error('The multi-tab page is currently not open, please open it in the settings！');
    }
    return !!show;
  }

  const tabStore = useMultipleTabStore();
  const router = _router || useRouter(); // 返回 router 实例。相当于在模板中使用 $router。必须在 setup() 中调用。

  // 当前路由地址
  const { currentRoute } = router;

  /**
   * 根据当前路由地址，获取激活的标签
   */
  function getCurrentTab() {
    const route = unref(currentRoute);
    return tabStore.getTabList.find((item) => item.fullPath === route.fullPath)!;
  }
  /**
   * 更新标签标题
   *
   * @param {string} title
   * @param {RouteLocationNormalized} [tab]
   */
  async function updateTabTitle(title: string, tab?: RouteLocationNormalized) {
    const canIUse = canIUseTabs;
    if (!canIUse) {
      return;
    }
    const targetTab = tab || getCurrentTab();
    await tabStore.setTabTitle(title, targetTab);
  }

  /**
   * 更新标签路由path
   *
   * @param {string} path
   * @param {RouteLocationNormalized} [tab]
   */
  async function updateTabPath(path: string, tab?: RouteLocationNormalized) {
    const canIUse = canIUseTabs;
    if (!canIUse) {
      return;
    }
    const targetTab = tab || getCurrentTab();
    await tabStore.updateTabPath(path, targetTab);
  }

  /**
   * 标签页关闭处理函数
   *
   * @param {TableActionEnum} action  标签动作枚举
   * @param {RouteLocationNormalized} [tab] tab标签页路由
   */
  async function handleTabAction(action: TableActionEnum, tab?: RouteLocationNormalized) {
    const canIUse = canIUseTabs;
    if (!canIUse) {
      return;
    }
    const currentTab = getCurrentTab();
    switch (action) {
      case TableActionEnum.REFRESH:
        await tabStore.refreshPage(router);
        break;

      case TableActionEnum.CLOSE_ALL:
        await tabStore.closeAllTab(router);
        break;

      case TableActionEnum.CLOSE_LEFT:
        await tabStore.closeLeftTabs(currentTab, router);
        break;

      case TableActionEnum.CLOSE_RIGHT:
        await tabStore.closeRightTabs(currentTab, router);
        break;

      case TableActionEnum.CLOSE_OTHER:
        await tabStore.closeOtherTabs(currentTab, router);
        break;

      case TableActionEnum.CLOSE_CURRENT:
      case TableActionEnum.CLOSE:
        await tabStore.closeTab(tab || currentTab, router);
        break;
    }
  }

  return {
    /** 刷新标签页 */
    refreshPage: () => handleTabAction(TableActionEnum.REFRESH),
    /** 关闭所有标签，自动跳转首页 */
    closeAll: () => handleTabAction(TableActionEnum.CLOSE_ALL),
    /** 关闭左侧标签页 */
    closeLeft: () => handleTabAction(TableActionEnum.CLOSE_LEFT),
    /** 关闭右侧标签页 */
    closeRight: () => handleTabAction(TableActionEnum.CLOSE_RIGHT),
    /** 关闭其他标签页 */
    closeOther: () => handleTabAction(TableActionEnum.CLOSE_OTHER),
    /** 关闭激活tab */
    closeCurrent: () => handleTabAction(TableActionEnum.CLOSE_CURRENT),
    /** 关闭指定tab */
    close: (tab?: RouteLocationNormalized) => handleTabAction(TableActionEnum.CLOSE, tab),
    /** 更新标签标题 */
    setTitle: (title: string, tab?: RouteLocationNormalized) => updateTabTitle(title, tab),
    /** 更新标签路由path */
    updatePath: (fullPath: string, tab?: RouteLocationNormalized) => updateTabPath(fullPath, tab),
  };
}
