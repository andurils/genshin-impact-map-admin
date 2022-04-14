import type { AppRouteModule } from '/@/router/types';

import { getParentLayout, LAYOUT } from '/@/router/constant';
// TODO 国际化
// import { t } from '/@/hooks/web/useI18n';
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
      name: 'Maintain',
      meta: {
        title: '地图维护',
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/genshinImpact/system/role/index.vue'),
    },

    {
      path: 'layer_add',
      name: 'LayerAdd',
      component: ExceptionPage,
      props: {
        status: ExceptionEnum.ERROR,
      },
      meta: {
        title: '点位维护',
      },
    },
    {
      path: 'layer_exam',
      name: 'LayerExam',
      component: ExceptionPage,
      props: {
        status: ExceptionEnum.ERROR,
      },
      meta: {
        // icon: 'mdi:form-select',
        title: '点位审核',
      },
    },
    {
      path: 'layer_manage',
      name: 'LayerManage',
      component: ExceptionPage,
      props: {
        status: ExceptionEnum.ERROR,
      },
      meta: {
        // icon: 'mdi:form-select',
        title: '点位管理',
      },
    },
  ],
};

export default map;
