<template>
  <section
    class="full-loading"
    :class="{ absolute, [theme]: !!theme }"
    :style="[background ? `background-color: ${background}` : '']"
    v-show="loading"
  >
    <Spin v-bind="$attrs" :tip="tip" :size="size" :spinning="loading" />
  </section>
</template>
<script lang="ts">
  import { PropType } from 'vue';
  import { defineComponent } from 'vue';
  import { Spin } from 'ant-design-vue';
  import { SizeEnum } from '/@/enums/sizeEnum';

  export default defineComponent({
    name: 'Loading',
    components: { Spin },
    props: {
      /**
       * 加载文本
       */
      tip: {
        type: String as PropType<string>,
        default: '',
      },
      /**
       * 大小
       */
      size: {
        type: String as PropType<SizeEnum>,
        default: SizeEnum.LARGE,
        validator: (v: SizeEnum): boolean => {
          return [SizeEnum.DEFAULT, SizeEnum.SMALL, SizeEnum.LARGE].includes(v);
        },
      },
      /**
       * 绝对定位，为 false 时可以全屏
       */
      absolute: {
        type: Boolean as PropType<boolean>,
        default: false,
      },
      /**
       * 当前加载状态
       */
      loading: {
        type: Boolean as PropType<boolean>,
        default: false,
      },
      /**
       * 背景色
       */
      background: {
        type: String as PropType<string>,
      },
      /**
       * 背景色主题，当背景色不为空时使用背景色
       */
      theme: {
        type: String as PropType<'dark' | 'light'>,
      },
    },
  });
</script>
<style lang="less" scoped>
  .full-loading {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 200;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    background-color: rgb(240 242 245 / 40%);

    &.absolute {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 300;
    }
  }

  html[data-theme='dark'] {
    .full-loading:not(.light) {
      background-color: @modal-mask-bg;
    }
  }

  .full-loading.dark {
    background-color: @modal-mask-bg;
  }
</style>
