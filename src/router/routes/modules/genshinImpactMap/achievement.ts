import type { AppRouteModule } from '/@/router/types';

import { getParentLayout, LAYOUT } from '/@/router/constant';
// TODO 国际化
// import { t } from '/@/hooks/web/useI18n';
import { ExceptionEnum } from '/@/enums/exceptionEnum';
const ExceptionPage = () => import('/@/views/sys/exception/Exception.vue');

// 成就管理模块菜单
const achievement: AppRouteModule = {
  path: '/achievement',
  name: 'Achievement',
  component: LAYOUT,
  redirect: '/achievement/maintain',
  meta: {
    orderNo: 14,
    icon: 'ion:layers-outline',
    title: '成就系统',
  },

  children: [
    {
      path: 'maintain',
      name: 'Maintain',
      component: ExceptionPage,
      props: {
        status: ExceptionEnum.ERROR,
      },
      meta: {
        title: '成就项编辑',
      },
    },
  ],
};

export default achievement;
