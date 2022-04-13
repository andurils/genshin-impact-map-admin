import { genMessage } from '../helper';
import antdLocale from 'ant-design-vue/es/locale/en_US';

// 自动加载 `modules` 目录下翻译文件
const modules = import.meta.globEager('./en/**/*.ts');
export default {
  message: {
    ...genMessage(modules, 'en'),
    antdLocale, // antd类库的翻译文件
  },
  dateLocale: null,
  dateLocaleName: 'en', // 日期格式化的语言
};
