import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';
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
      name: 'AchievementMaintain',
      component: ExceptionPage,
      props: {
        status: ExceptionEnum.ERROR,
      },
      meta: {
        title: '点位维护',
      },
    },
  ],
};

export default achievement;
