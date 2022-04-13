export const buttonProps = {
  /**
   * 按钮的颜色场景状态颜色  对应类型 'error','warning', 'success'
   */
  color: { type: String, validator: (v) => ['error', 'warning', 'success', ''].includes(v) },
  loading: { type: Boolean },
  disabled: { type: Boolean },
  /**
   * Text before icon.  按钮文本前图标
   */
  preIcon: { type: String },
  /**
   * Text after icon. 按钮文本后图标  按钮图标大小
   */
  postIcon: { type: String },
  /**
   * preIcon and postIcon icon size.
   * @default: 14
   */
  iconSize: { type: Number, default: 14 },
  onClick: { type: Function as PropType<(...args) => any>, default: null },
};
