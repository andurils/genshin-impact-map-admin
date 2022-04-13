import type { Router, RouteRecordRaw } from 'vue-router';

import { usePermissionStoreWithOut } from '/@/store/modules/permission';

import { PageEnum } from '/@/enums/pageEnum';
import { useUserStoreWithOut } from '/@/store/modules/user';

import { PAGE_NOT_FOUND_ROUTE } from '/@/router/routes/basic';

import { RootRoute } from '/@/router/routes';

const LOGIN_PATH = PageEnum.BASE_LOGIN;

const ROOT_PATH = RootRoute.path;

const whitePathList: PageEnum[] = [LOGIN_PATH]; // 白名单

/**
 * 页面刷新时，路由会被重置，需要重新获取用户信息
 * @param router
 */
export function createPermissionGuard(router: Router) {
  const userStore = useUserStoreWithOut(); // 用户信息存储
  const permissionStore = usePermissionStoreWithOut(); // 权限信息存储
  router.beforeEach(async (to, from, next) => {
    // 当从 ROOT_PATH 导航到 BASE_HOME 时， 用户主页 homePath 设置不是 BASE_HOME 时， 跳转到 homePath。
    if (
      from.path === ROOT_PATH &&
      to.path === PageEnum.BASE_HOME &&
      userStore.getUserInfo.homePath &&
      userStore.getUserInfo.homePath !== PageEnum.BASE_HOME
    ) {
      // 回调以验证导航
      next(userStore.getUserInfo.homePath);
      return;
    }

    const token = userStore.getToken;

    // Whitelist can be directly entered    白名单可以直接进入
    if (whitePathList.includes(to.path as PageEnum)) {
      if (to.path === LOGIN_PATH && token) {
        const isSessionTimeout = userStore.getSessionTimeout; // 登录是否过期;
        try {
          await userStore.afterLoginAction();
          if (!isSessionTimeout) {
            // query 从 URL 的 search 部分提取的已解码查询参数的字典
            next((to.query?.redirect as string) || '/');
            return;
          }
        } catch {}
      }
      next();
      return;
    }

    // token does not exist 如果 token 不存在
    if (!token) {
      // You can access without permission. You need to set the routing meta.ignoreAuth to true
      // 可以访问，但是需要设置路由元数据 ignoreAuth 为 true
      if (to.meta.ignoreAuth) {
        next();
        return;
      }

      // redirect login page  重定向到登录页
      const redirectData: { path: string; replace: boolean; query?: Recordable<string> } = {
        path: LOGIN_PATH,
        replace: true,
      };
      if (to.path) {
        redirectData.query = {
          ...redirectData.query,
          redirect: to.path,
        };
      }
      next(redirectData);
      return;
    }

    // Jump to the 404 page after processing the login  在处理登录后跳转到 404 页面
    // fullPath URL 编码与路由地址有关。包括 path、 query 和 hash。
    // 当从 LOGIN_PATH 导航到 404 页面时，fullPath 不等于homePath BASE_HOME ，用户跳转到 homePath 或者 BASE_HOME 时
    if (
      from.path === LOGIN_PATH &&
      to.name === PAGE_NOT_FOUND_ROUTE.name &&
      to.fullPath !== (userStore.getUserInfo.homePath || PageEnum.BASE_HOME)
    ) {
      next(userStore.getUserInfo.homePath || PageEnum.BASE_HOME);
      return;
    }

    // get userinfo while last fetch time is empty
    // 用户最后更新时间为0，获取最新用户信息 userInfo / roleList
    if (userStore.getLastUpdateTime === 0) {
      try {
        await userStore.getUserInfoAction();
      } catch (err) {
        next();
        return;
      }
    }

    // 根据判断是否重新获取动态路由
    if (permissionStore.getIsDynamicAddedRoute) {
      next();
      return;
    }

    // 基于权限构建路由列表
    const routes = await permissionStore.buildRoutesAction();

    routes.forEach((route) => {
      router.addRoute(route as unknown as RouteRecordRaw);
    });

    router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw);

    // 设置动态添加路由
    permissionStore.setDynamicAddedRoute(true);

    if (to.name === PAGE_NOT_FOUND_ROUTE.name) {
      // 动态添加路由后，此处应当重定向到fullPath，否则会加载404页面内容
      next({ path: to.fullPath, replace: true, query: to.query });
    } else {
      // TODO 效果待研究
      const redirectPath = (from.query.redirect || to.path) as string;
      const redirect = decodeURIComponent(redirectPath);
      const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect };
      next(nextData);
    }
  });
}
