/**
 * Used to monitor routing changes to change the status of menus and tabs. There is no need to monitor the route, because the route status change is affected by the page rendering time, which will be slow
 *  监视路由变化 改变菜单和标签的状态。
 *  无需监控路由，因为路由状态更改受页面呈现时间的影响，速度会很慢
 */

import mitt from '/@/utils/mitt';
import type { RouteLocationNormalized } from 'vue-router';
import { getRawRoute } from '/@/utils';

const emitter = mitt();

const key = Symbol();
// 最后变化的 tab 路由地址   https://router.vuejs.org/zh/api/index.html#routelocationnormalized
let lastChangeTab: RouteLocationNormalized;

// 设置路由变化
export function setRouteChange(lastChangeRoute: RouteLocationNormalized) {
  const r = getRawRoute(lastChangeRoute);
  emitter.emit(key, r); // 事件注册发布
  lastChangeTab = r;
}

// 监听路由变化
export function listenerRouteChange(
  callback: (route: RouteLocationNormalized) => void,
  immediate = true,
) {
  emitter.on(key, callback); // 事件监听
  immediate && lastChangeTab && callback(lastChangeTab); // 立即执行回调
}

/**
 * 移除Tab路由变化监听
 */
export function removeTabChangeListener() {
  emitter.clear();
}
