import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';

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
      name: 'AMaintain',
      meta: {
        title: '成就项编辑',
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/genshinImpact/system/role/index.vue'),
    },
  ],
};

export default achievement;
