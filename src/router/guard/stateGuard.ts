import type { Router } from 'vue-router';
import { useAppStore } from '/@/store/modules/app';
import { useMultipleTabStore } from '/@/store/modules/multipleTab';
import { useUserStore } from '/@/store/modules/user';
import { usePermissionStore } from '/@/store/modules/permission';
import { PageEnum } from '/@/enums/pageEnum';
import { removeTabChangeListener } from '/@/logics/mitt/routeChange';

/**
 * 系统状态守卫- 当用户未登录时，进入登录页面并清除存储中的认证信息
 *
 * @export
 * @param {Router} router
 */
export function createStateGuard(router: Router) {
  router.afterEach((to) => {
    // Just enter the login page and clear the authentication information in the storage when the user is not logged in.
    // 当用户未登录时，进入登录页面并清除存储中的认证信息
    if (to.path === PageEnum.BASE_LOGIN) {
      const tabStore = useMultipleTabStore(); // 多标签页
      const userStore = useUserStore(); // 用户信息
      const appStore = useAppStore(); // app信息
      const permissionStore = usePermissionStore(); // 权限信息
      appStore.resetAllState();
      permissionStore.resetState();
      tabStore.resetState();
      userStore.resetState();
      removeTabChangeListener();
    }
  });
}
