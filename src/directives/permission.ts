/**
 * Global authority directive
 * Used for fine-grained control of component permissions
 * @Example v-auth="RoleEnum.TEST"
 */
import type { App, Directive, DirectiveBinding } from 'vue';

import { usePermission } from '/@/hooks/web/usePermission';

/**
 * 是否有权限
 *
 * @param {Element} el
 * @param {*} binding
 */
function isAuth(el: Element, binding: any) {
  const { hasPermission } = usePermission();

  const value = binding.value;
  if (!value) return;
  // 判断是否有权限访问，删除该节点
  if (!hasPermission(value)) {
    el.parentNode?.removeChild(el);
  }
}

const mounted = (el: Element, binding: DirectiveBinding<any>) => {
  isAuth(el, binding);
};

const authDirective: Directive = {
  mounted,
};

/** 注册 auth 指令 */
export function setupPermissionDirective(app: App) {
  app.directive('auth', authDirective);
}

export default authDirective;
