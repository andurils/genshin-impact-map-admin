import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const system: AppRouteModule = {
  path: '/system',
  name: 'System',
  component: LAYOUT,
  redirect: '/system/account',
  meta: {
    orderNo: 11,
    icon: 'ion:settings-outline',
    title: t('routes.genshinImpact.system.moduleName'),
  },
  children: [
    {
      path: 'user',
      name: 'UserManagement',
      meta: {
        title: t('routes.genshinImpact.system.user'),
        ignoreKeepAlive: false,
      },
      component: () => import('/@/views/genshinImpact/system/user/index.vue'),
    },
    // {
    //   path: 'account_detail/:id',
    //   name: 'AccountDetail',
    //   meta: {
    //     hideMenu: true,
    //     title: t('routes.genshinImpact.system.account_detail'),
    //     ignoreKeepAlive: true,
    //     showMenu: false,
    //     currentActiveMenu: '/system/account',
    //   },
    //   component: () => import('/@/views/genshinImpact/system/account/AccountDetail.vue'),
    // },
    {
      path: 'role',
      name: 'RoleManagement',
      meta: {
        title: t('routes.demo.system.role'),
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/genshinImpact/system/role/index.vue'),
    },

    {
      path: 'menu',
      name: 'MenuManagement',
      meta: {
        title: t('routes.demo.system.menu'),
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/genshinImpact/system/menu/index.vue'),
    },
    {
      path: 'changePassword',
      name: 'ChangePassword',
      meta: {
        title: t('routes.demo.system.password'),
        ignoreKeepAlive: true,
        hideMenu: true,
        hideBreadcrumb: true,
        // currentActiveMenu: '/dashboard',
        // icon: 'bx:bx-home',
      },
      component: () => import('/@/views/genshinImpact/system/password/index.vue'),
    },
  ],
};

export default system;
