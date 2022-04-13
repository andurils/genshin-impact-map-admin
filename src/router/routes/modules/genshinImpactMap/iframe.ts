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
        title: t('routes.demo.iframe.doc'),
      },
    },
    {
      path: 'https://genshin-impact.fandom.com/wiki/Genshin_Impact_Wiki',
      name: 'DocExternal',
      component: IFrame,
      meta: {
        title: '原神Wiki外面文档',
      },
    },
  ],
};

export default iframe;
