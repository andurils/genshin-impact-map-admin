import type { PropType } from 'vue';
import { FileBasicColumn } from './typing';

export const basicProps = {
  /**
   * 帮助文本
   */
  helpText: {
    type: String as PropType<string>,
    default: '',
  },
  /**
   * 文件最大多少MB
   */
  maxSize: {
    type: Number as PropType<number>,
    default: 2,
  },
  /**
   * 最大数量的文件，Infinity不限制
   */
  maxNumber: {
    type: Number as PropType<number>,
    default: Infinity,
  },
  /**
   * 限制上传格式，可使用文件后缀名(点号可选)或MIME字符串。
   * 例如 ['.doc,','docx','application/msword','image/*']
   */
  accept: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  /**
   * 开启多文件上传
   */
  multiple: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  /**
   * 上传携带的参数
   */
  uploadParams: {
    type: Object as PropType<any>,
    default: {},
  },
  /**
   * 上传接口  具体配置详见 .env.[mode] 中 VITE_PROXY  VITE_GLOB_UPLOAD_URL
   */
  api: {
    type: Function as PropType<PromiseFn>,
    default: null,
    required: true,
  },
  name: {
    type: String as PropType<string>,
    default: 'file',
  },
  filename: {
    type: String as PropType<string>,
    default: null,
  },
};

export const uploadContainerProps = {
  /**
   * 已上传的文件列表
   */
  value: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  ...basicProps,
  /**
   * 是否显示预览数量
   */
  showPreviewNumber: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  /**
   * 没有上传文件时是否隐藏预览
   */
  emptyHidePreview: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
};

export const previewProps = {
  value: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
};

export const fileListProps = {
  columns: {
    type: [Array] as PropType<FileBasicColumn[]>,
    default: null,
  },
  actionColumn: {
    type: Object as PropType<FileBasicColumn>,
    default: null,
  },
  dataSource: {
    type: Array as PropType<any[]>,
    default: null,
  },
};
