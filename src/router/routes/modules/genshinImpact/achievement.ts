import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';
import { ExceptionEnum } from '/@/enums/exceptionEnum';
import { t } from '/@/hooks/web/useI18n';
const ExceptionPage = () => import('/@/views/sys/exception/Exception.vue');

// 成就管理模块菜单
const achievement: AppRouteModule = {
  path: '/achievement',
  name: 'Achievement',
  component: LAYOUT,
  redirect: '/achievement/maintain',
  meta: {
    orderNo: 13,
    icon: 'ion:bookmarks-outline',
    title: t('routes.genshinImpact.achievement.moduleName'),
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
        title: t('routes.genshinImpact.achievement.maintain'),
      },
    },
  ],
};

export default achievement;
