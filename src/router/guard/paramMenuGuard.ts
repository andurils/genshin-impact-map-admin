import type { Router } from 'vue-router';
import { configureDynamicParamsMenu } from '../helper/menuHelper';
import { Menu } from '../types';
import { PermissionModeEnum } from '/@/enums/appEnum';
import { useAppStoreWithOut } from '/@/store/modules/app';

import { usePermissionStoreWithOut } from '/@/store/modules/permission';

/**
 * 菜单守卫
 * @param {Router} router
 */
export function createParamMenuGuard(router: Router) {
  const permissionStore = usePermissionStoreWithOut(); // 权限信息存储
  router.beforeEach(async (to, _, next) => {
    // filter no name route  过滤没有名称的路由
    // name 路由记录的名称。如果什么都没提供，则为 undefined
    if (!to.name) {
      next();
      return;
    }

    // menu has been built.   未动态添加路由
    if (!permissionStore.getIsDynamicAddedRoute) {
      next();
      return;
    }

    // 根据权限模式构建菜单
    let menus: Menu[] = [];
    if (isBackMode()) {
      menus = permissionStore.getBackMenuList; // 获取后台菜单
    } else if (isRouteMappingMode()) {
      menus = permissionStore.getFrontMenuList; // 获取前台菜单
    }
    menus.forEach((item) => configureDynamicParamsMenu(item, to.params));

    next();
  });
}

/** 获取系统权限模式 */
const getPermissionMode = () => {
  const appStore = useAppStoreWithOut();
  return appStore.getProjectConfig.permissionMode;
};

/** 是否后台权限模式 */
const isBackMode = () => {
  return getPermissionMode() === PermissionModeEnum.BACK;
};

/** 是否前端权限模式 */
const isRouteMappingMode = () => {
  return getPermissionMode() === PermissionModeEnum.ROUTE_MAPPING;
};
