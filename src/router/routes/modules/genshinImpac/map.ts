import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { ExceptionEnum } from '/@/enums/exceptionEnum';
const ExceptionPage = () => import('/@/views/sys/exception/Exception.vue');

// 地图管理模块菜单
const map: AppRouteModule = {
  path: '/map',
  name: 'Map',
  component: LAYOUT,
  redirect: '/map/maintain',
  meta: {
    orderNo: 13,
    icon: 'ion:layers-outline',
    title: '原神地图',
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
        title: '点位维护',
      },
    },
  ],
};

export default map;
