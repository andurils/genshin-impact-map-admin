import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';
import { ExceptionEnum } from '/@/enums/exceptionEnum';
import { t } from '/@/hooks/web/useI18n';
const ExceptionPage = () => import('/@/views/sys/exception/Exception.vue');

// 地图管理模块菜单
const map: AppRouteModule = {
  path: '/map',
  name: 'Map',
  component: LAYOUT,
  redirect: '/map/maintain',
  meta: {
    orderNo: 12,
    icon: 'ic:outline-map',
    title: t('routes.genshinImpact.map.moduleName'),
  },

  children: [
    {
      path: 'maintain',
      name: 'MapMaintain',
      component: ExceptionPage,
      props: {
        status: ExceptionEnum.ERROR,
      },
      meta: {
        title: t('routes.genshinImpact.map.maintain'),
      },
    },
  ],
};

export default map;
