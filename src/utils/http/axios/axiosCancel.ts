import type { AxiosRequestConfig, Canceler } from 'axios';
import axios from 'axios';
import { isFunction } from '/@/utils/is';

// Used to store the identification and cancellation function of each request
// 用于存储每个请求的标识和取消函数
let pendingMap = new Map<string, Canceler>();

export const getPendingUrl = (config: AxiosRequestConfig) => [config.method, config.url].join('&');
/**
 * 类 取消请求
 * TODO https://www.codeleading.com/article/49655934605/
 * @export
 * @class AxiosCanceler
 */
export class AxiosCanceler {
  /**
   * Add request 新增请求
   * @param {Object} config
   */
  addPending(config: AxiosRequestConfig) {
    this.removePending(config);
    const url = getPendingUrl(config);
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel) => {
        if (!pendingMap.has(url)) {
          // If there is no current request in pending, add it  如果没有当前请求在挂起，则添加它
          pendingMap.set(url, cancel);
        }
      });
  }

  /**
   * @description: Clear all pending requests    清除所有的请求
   */
  removeAllPending() {
    pendingMap.forEach((cancel) => {
      cancel && isFunction(cancel) && cancel();
    });
    pendingMap.clear();
  }

  /**
   * Removal request  删除请求
   * @param {Object} config
   */
  removePending(config: AxiosRequestConfig) {
    const url = getPendingUrl(config);

    if (pendingMap.has(url)) {
      // If there is a current request identifier in pending,
      // the current request needs to be cancelled and removed
      const cancel = pendingMap.get(url);
      cancel && cancel(url);
      pendingMap.delete(url);
    }
  }

  /**
   * @description: reset  重置pendingMap
   */
  reset(): void {
    pendingMap = new Map<string, Canceler>();
  }
}
