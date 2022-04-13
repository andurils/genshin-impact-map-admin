import type {
  UseDrawerReturnType,
  DrawerInstance,
  ReturnMethods,
  DrawerProps,
  UseDrawerInnerReturnType,
} from './typing';
import {
  ref,
  getCurrentInstance,
  unref,
  reactive,
  watchEffect,
  nextTick,
  toRaw,
  computed,
} from 'vue';
import { isProdMode } from '/@/utils/env';
import { isFunction } from '/@/utils/is';
import { tryOnUnmounted } from '@vueuse/core';
import { isEqual } from 'lodash-es';
import { error } from '/@/utils/log';

const dataTransferRef = reactive<any>({});

const visibleData = reactive<{ [key: number]: boolean }>({});

/**
 * @description: Applicable to separate drawer and call outside
 */
export function useDrawer(): UseDrawerReturnType {
  if (!getCurrentInstance()) {
    throw new Error('useDrawer() can only be used inside setup() or functional components!');
  }
  const drawer = ref<DrawerInstance | null>(null);
  const loaded = ref<Nullable<boolean>>(false);
  const uid = ref<string>('');

  /**
   * register 用于注册 useDrawer，如果需要使用 useDrawer 提供的 api，必须将 register 传入组件的 onRegister。
   * @description: 原理其实很简单，就是 vue 的组件子传父通信，内部通过 emit("register"，instance) 实现。
   * @param {DrawerInstance} drawerInstance
   * @param {string} uuid
   * @return {*}
   */
  function register(drawerInstance: DrawerInstance, uuid: string) {
    isProdMode() &&
      tryOnUnmounted(() => {
        drawer.value = null;
        loaded.value = null;
        dataTransferRef[unref(uid)] = null;
      });

    if (unref(loaded) && isProdMode() && drawerInstance === unref(drawer)) {
      return;
    }
    uid.value = uuid;
    drawer.value = drawerInstance;
    loaded.value = true;

    drawerInstance.emitVisible = (visible: boolean, uid: number) => {
      visibleData[uid] = visible;
    };
  }

  const getInstance = () => {
    const instance = unref(drawer);
    if (!instance) {
      error('useDrawer instance is undefined!');
    }
    return instance;
  };

  const methods: ReturnMethods = {
    setDrawerProps: (props: Partial<DrawerProps>): void => {
      getInstance()?.setDrawerProps(props);
    },

    getVisible: computed((): boolean => {
      return visibleData[~~unref(uid)];
    }),

    // 打开弹窗
    openDrawer: <T = any>(visible = true, data?: T, openOnSet = true): void => {
      getInstance()?.setDrawerProps({
        visible: visible,
      });
      if (!data) return;

      if (openOnSet) {
        dataTransferRef[unref(uid)] = null;
        dataTransferRef[unref(uid)] = toRaw(data);
        return;
      }
      const equal = isEqual(toRaw(dataTransferRef[unref(uid)]), toRaw(data));
      if (!equal) {
        dataTransferRef[unref(uid)] = toRaw(data);
      }
    },
    // 关闭弹窗
    closeDrawer: () => {
      getInstance()?.setDrawerProps({ visible: false });
    },
  };

  return [register, methods];
}

/**
 * 用于独立的 Drawer 内部调用
 */
export const useDrawerInner = (callbackFn?: Fn): UseDrawerInnerReturnType => {
  const drawerInstanceRef = ref<Nullable<DrawerInstance>>(null);
  const currentInstance = getCurrentInstance();
  const uidRef = ref<string>('');

  if (!getCurrentInstance()) {
    throw new Error('useDrawerInner() can only be used inside setup() or functional components!');
  }

  const getInstance = () => {
    const instance = unref(drawerInstanceRef);
    if (!instance) {
      error('useDrawerInner instance is undefined!');
      return;
    }
    return instance;
  };

  const register = (modalInstance: DrawerInstance, uuid: string) => {
    isProdMode() &&
      tryOnUnmounted(() => {
        drawerInstanceRef.value = null;
      });

    uidRef.value = uuid;
    drawerInstanceRef.value = modalInstance;
    currentInstance?.emit('register', modalInstance, uuid);
  };

  watchEffect(() => {
    const data = dataTransferRef[unref(uidRef)];
    if (!data) return;
    if (!callbackFn || !isFunction(callbackFn)) return;
    nextTick(() => {
      callbackFn(data);
    });
  });

  return [
    register,
    {
      // 修改 modal 的 loading 状态
      changeLoading: (loading = true) => {
        getInstance()?.setDrawerProps({ loading });
      },
      // 修改确认按钮的 loading 状态
      changeOkLoading: (loading = true) => {
        getInstance()?.setDrawerProps({ confirmLoading: loading });
      },
      getVisible: computed((): boolean => {
        return visibleData[~~unref(uidRef)];
      }),

      closeDrawer: () => {
        getInstance()?.setDrawerProps({ visible: false });
      },

      setDrawerProps: (props: Partial<DrawerProps>) => {
        getInstance()?.setDrawerProps(props);
      },
    },
  ];
};
