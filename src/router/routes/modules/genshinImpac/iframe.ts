import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
const IFrame = () => import('/@/views/sys/iframe/FrameBlank.vue');
import { t } from '/@/hooks/web/useI18n';

const iframe: AppRouteModule = {
  path: '/frame',
  name: 'Frame',
  component: LAYOUT,
  redirect: '/frame/doc',
  meta: {
    orderNo: 15,
    icon: 'ion:tv-outline',
    title: t('routes.demo.iframe.frame'),
  },

  children: [
    {
      path: 'doc',
      name: 'Doc',
      component: IFrame,
      meta: {
        frameSrc: 'https://yuanshen.site/docs/',
        title: '原神地图',
      },
    },
    {
      path: 'http://api.yuanshen.site:8089/api/swagger-ui.html',
      name: 'Swagger',
      component: IFrame,
      meta: {
        title: '接口文档',
      },
    },
    {
      path: 'https://genshin-impact.fandom.com/wiki/Genshin_Impact_Wiki',
      name: 'DocExternal',
      component: IFrame,
      meta: {
        title: '原神Wiki',
      },
    },
  ],
};

export default iframe;
