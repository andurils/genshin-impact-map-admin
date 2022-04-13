import type { LocaleType } from '/#/config';

import { set } from 'lodash-es';

/**
 * 语言池 存储支持语言
 */
export const loadLocalePool: LocaleType[] = [];

/**
 * 设置HTML页面lang 属性
 */
export function setHtmlPageLang(locale: LocaleType) {
  document.querySelector('html')?.setAttribute('lang', locale);
}

/**
 * 设置语言池
 */
export function setLoadLocalePool(cb: (loadLocalePool: LocaleType[]) => void) {
  cb(loadLocalePool);
}

/**
 *
 * @description: 加载 `lang/{lang}/modules` 目录下翻译文件,生产本地化的语言环境信息
 * @export
 * @param {Record<string, Record<string, any>>} langs
 * @param {string} [prefix='lang']
 * @return {Recordable} 返回本地化的语言环境信息
 */
export function genMessage(langs: Record<string, Record<string, any>>, prefix = 'lang') {
  const obj: Recordable = {};

  Object.keys(langs).forEach((key) => {
    const langFileModule = langs[key].default;
    let fileName = key.replace(`./${prefix}/`, '').replace(/^\.\//, '');
    const lastIndex = fileName.lastIndexOf('.');
    fileName = fileName.substring(0, lastIndex);
    const keyList = fileName.split('/');
    const moduleName = keyList.shift();
    const objKey = keyList.join('.');

    if (moduleName) {
      if (objKey) {
        set(obj, moduleName, obj[moduleName] || {});
        set(obj[moduleName], objKey, langFileModule);
      } else {
        set(obj, moduleName, langFileModule || {});
      }
    }
  });
  return obj;
}
