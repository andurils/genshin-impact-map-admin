// 实现自动加载 modules 下的路由文件并生成路由配置信息和一些通用的配置
import type { AppRouteRecordRaw, AppRouteModule } from '/@/router/types';
import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from '/@/router/routes/basic';

import { mainOutRoutes } from './mainOut';
import { PageEnum } from '/@/enums/pageEnum';
import { t } from '/@/hooks/web/useI18n';

// 自动加载 `modules` 目录下的路由模块
const modules = import.meta.globEager('./modules/**/*.ts');

// routeModuleList = modules
const routeModuleList: AppRouteModule[] = [];
Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList];

// 根路由 /
export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
};
// 登录路由 /login
export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('/@/views/sys/login/Login.vue'),
  meta: {
    title: t('routes.basic.login'),
  },
};

// Basic routing without permission  未经权限过滤的基础路由
export const basicRoutes = [
  LoginRoute, // 登录路由 /login
  RootRoute, // 根路由 /
  ...mainOutRoutes, // 新页面 /main-out
  REDIRECT_ROUTE, // 从定义 /redirect
  PAGE_NOT_FOUND_ROUTE, // 404 /:path(.*)*
];
