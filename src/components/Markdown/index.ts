import { withInstall } from '/@/utils';
import markDown from './src/Markdown.vue';
import markDownViewer from './src/MarkdownViewer.vue';

// 基于 Vditor 的 MarkDown 编辑器
export const MarkDown = withInstall(markDown);
export const MarkdownViewer = withInstall(markDownViewer);
export * from './src/typing';
