import type { Router, RouteLocationNormalized } from 'vue-router';
import { useAppStoreWithOut } from '/@/store/modules/app';
import { useUserStoreWithOut } from '/@/store/modules/user';
import { useTransitionSetting } from '/@/hooks/setting/useTransitionSetting';
import { AxiosCanceler } from '/@/utils/http/axios/axiosCancel';
import { Modal, notification } from 'ant-design-vue';
import { warn } from '/@/utils/log';
import { unref } from 'vue';
import { setRouteChange } from '/@/logics/mitt/routeChange';
import { createPermissionGuard } from './permissionGuard';
import { createStateGuard } from './stateGuard';
import nProgress from 'nprogress';
import projectSetting from '/@/settings/projectSetting';
import { createParamMenuGuard } from './paramMenuGuard';

// Don't change the order of creation
export function setupRouterGuard(router: Router) {
  createPageGuard(router);
  createPageLoadingGuard(router);
  createHttpGuard(router);
  createScrollGuard(router);
  createMessageGuard(router);
  createProgressGuard(router);
  createPermissionGuard(router);
  createParamMenuGuard(router); // must after createPermissionGuard (menu has been built.)
  createStateGuard(router);
}

/**
 * Hooks for handling page state   处理页面状态
 */
function createPageGuard(router: Router) {
  // 加载过的页面map
  const loadedPageMap = new Map<string, boolean>();

  // 添加一个导航守卫，在任何导航前执行
  // to -  要导航到的路由地址
  // from -  从哪里来的路由地址
  router.beforeEach(async (to) => {
    // The page has already been loaded, it will be faster to open it again, you don’t need to do loading and other processing  已经加载过的页面，加载速度会更快，不需要加载和其他处理
    // 路由元信息 添加 loaded 属性，表示已经加载过
    to.meta.loaded = !!loadedPageMap.get(to.path);
    // Notify routing changes  发送路由变化通知
    setRouteChange(to);

    return true;
  });

  // 添加一个导航钩子，在每次导航后执行
  router.afterEach((to) => {
    loadedPageMap.set(to.path, true); // 更新页面路由状态
  });
}

/**
 * Used to handle page loading status   处理页面加载状态
 */
function createPageLoadingGuard(router: Router) {
  const userStore = useUserStoreWithOut(); // 用户信息存储
  const appStore = useAppStoreWithOut(); // 应用信息存储
  const { getOpenPageLoading } = useTransitionSetting(); // 过渡动画设置
  router.beforeEach(async (to) => {
    // 未获取 token 用户未登录 不显示加载动画
    if (!userStore.getToken) {
      return true;
    }
    // 路由元信息获取 loaded 属性 不显示加载动画
    if (to.meta.loaded) {
      return true;
    }
    // 根据配置选项 开启加载动画
    if (unref(getOpenPageLoading)) {
      appStore.setPageLoadingAction(true);
      return true;
    }

    return true;
  });
  router.afterEach(async () => {
    // 根据配置选项 关闭加载动画
    if (unref(getOpenPageLoading)) {
      // TODO Looking for a better way
      // The timer simulates the loading time to prevent flashing too fast,
      // 定时器模拟加载时间，防止过快闪烁
      setTimeout(() => {
        appStore.setPageLoading(false);
      }, 220);
    }
    return true;
  });
}

/**
 * The interface used to close the current page to complete the request when the route is switched
 * 路由切换时关闭当前页面完成请求
 * @param router
 */
function createHttpGuard(router: Router) {
  const { removeAllHttpPending } = projectSetting;
  let axiosCanceler: Nullable<AxiosCanceler>;
  // 取消未响应的http请求
  if (removeAllHttpPending) {
    axiosCanceler = new AxiosCanceler();
  }
  router.beforeEach(async () => {
    // Switching the route will delete the previous request 路由切换将删除之前的请求
    axiosCanceler?.removeAllPending();
    return true;
  });
}

/**
 * Routing switch back to the top  路由切换回到顶部
 *
 * @param {Router} router
 */
function createScrollGuard(router: Router) {
  // 是否hash模式
  const isHash = (href: string) => {
    return /^#/.test(href);
  };

  const body = document.body;

  router.afterEach(async (to) => {
    // scroll top    hash模式下 跳转到顶部
    isHash((to as RouteLocationNormalized & { href: string })?.href) && body.scrollTo(0, 0);
    return true;
  });
}

/**
 * Used to close the message instance when the route is switched 路由切换时关闭消息实例
 * @param router
 */
export function createMessageGuard(router: Router) {
  const { closeMessageOnSwitch } = projectSetting;

  router.beforeEach(async () => {
    try {
      if (closeMessageOnSwitch) {
        // 通常用于路由监听当中，处理路由前进、后退不能销毁确认对话框的问题。
        Modal.destroyAll(); // 销毁弹出的确认窗
        notification.destroy(); // 销毁通知提醒框
      }
    } catch (error) {
      warn('message guard error:' + error);
    }
    return true;
  });
}

/**
 * open the top progress bar  页面顶部进度条
 * @param router
 */
export function createProgressGuard(router: Router) {
  const { getOpenNProgress } = useTransitionSetting();
  router.beforeEach(async (to) => {
    // 页面是否已经加载过
    if (to.meta.loaded) {
      return true;
    }
    // 进度条开始加载
    unref(getOpenNProgress) && nProgress.start();
    return true;
  });

  router.afterEach(async () => {
    // 进度条加载结束
    unref(getOpenNProgress) && nProgress.done();
    return true;
  });
}
