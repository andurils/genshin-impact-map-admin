import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const account: AppRouteModule = {
  path: '/account',
  name: 'AccountManagement',
  component: LAYOUT,
  redirect: '/account/profile',
  meta: {
    orderNo: 2000,
    icon: 'ion:person-circle-outline',
    title: t('routes.genshinImpact.account.moduleName'),
  },
  children: [
    {
      path: 'profile',
      name: 'AccountProfilePage',
      component: () => import('/@/views/genshinImpact/account/profile/index.vue'),
      meta: {
        title: t('routes.genshinImpact.account.accountProfile'),
      },
    },
    {
      path: 'setting',
      name: 'AccountSettingPage',
      component: () => import('/@/views/genshinImpact/account/setting/index.vue'),
      meta: {
        title: t('routes.genshinImpact.account.accountSetting'),
      },
    },
  ],
};

export default account;
