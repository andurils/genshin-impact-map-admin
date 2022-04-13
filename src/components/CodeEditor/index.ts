import { withInstall } from '/@/utils';
import codeEditor from './src/CodeEditor.vue';
import jsonPreview from './src/json-preview/JsonPreview.vue';

/**
 * 代码编辑器 codemirror
 */
export const CodeEditor = withInstall(codeEditor);
/**
 * json 数据预览组件
 */
export const JsonPreview = withInstall(jsonPreview);

export * from './src/typing';
