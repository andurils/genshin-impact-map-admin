import type { RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';

import { createRouter, createWebHashHistory } from 'vue-router';
import { basicRoutes } from './routes';

// 白名单应该包含基本静态路由
const WHITE_NAME_LIST: string[] = [];
const getRouteNames = (array: any[]) =>
  array.forEach((item) => {
    WHITE_NAME_LIST.push(item.name);
    getRouteNames(item.children || []);
  });
// 层级遍历基础路由添加至白名单中
getRouteNames(basicRoutes);

// app router  创建路由实例
export const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH), // 基于 hash 的历史记录
  routes: basicRoutes as unknown as RouteRecordRaw[], // 添加到路由的初始路由列表
  strict: true, // 替代 caseSensitive
  scrollBehavior: () => ({ left: 0, top: 0 }), // 在页面之间导航时控制滚动的函数
});

/**
 * reset router 重置路由
 */
export function resetRouter() {
  // 获取所有 路由记录的完整列表
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name && !WHITE_NAME_LIST.includes(name as string)) {
      // 确认是否存在指定名称的路由  如果存在通过名称删除该路由
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

// config router  配置路由
export function setupRouter(app: App<Element>) {
  app.use(router);
}
