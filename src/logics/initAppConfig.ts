/**
 * Application configuration
 */
import type { ProjectConfig } from '/#/config';

import { PROJ_CFG_KEY } from '/@/enums/cacheEnum';
import projectSetting from '/@/settings/projectSetting';

import { updateHeaderBgColor, updateSidebarBgColor } from '/@/logics/theme/updateBackground';
import { updateColorWeak } from '/@/logics/theme/updateColorWeak';
import { updateGrayMode } from '/@/logics/theme/updateGrayMode';
import { updateDarkTheme } from '/@/logics/theme/dark';
import { changeTheme } from '/@/logics/theme';

import { useAppStore } from '/@/store/modules/app';
import { useLocaleStore } from '/@/store/modules/locale';

import { getCommonStoragePrefix, getStorageShortName } from '/@/utils/env';

import { primaryColor } from '../../build/config/themeConfig';
import { Persistent } from '/@/utils/cache/persistent';
import { deepMerge } from '/@/utils';
import { ThemeEnum } from '/@/enums/appEnum';

// Initial project configuration  初始化项目配置
export function initAppConfigStore() {
  const localeStore = useLocaleStore(); // 多语言国际化
  const appStore = useAppStore(); // 应用状态(主题风格、项目配置、页面加载、页面状态等等)
  // 项目配置
  let projCfg: ProjectConfig = Persistent.getLocal(PROJ_CFG_KEY) as ProjectConfig;
  projCfg = deepMerge(projectSetting, projCfg || {});
  const darkMode = appStore.getDarkMode; // 主题暗黑模式
  const {
    colorWeak, // 是否开启色弱模式
    grayMode, // 是否开启灰度模式
    themeColor, // 主题颜色

    headerSetting: { bgColor: headerBgColor } = {}, // 顶栏配置
    menuSetting: { bgColor } = {}, // 菜单配置
  } = projCfg;

  try {
    if (themeColor && themeColor !== primaryColor) {
      changeTheme(themeColor);
    }

    grayMode && updateGrayMode(grayMode);
    colorWeak && updateColorWeak(colorWeak);
  } catch (error) {
    console.log(error);
  }
  // 存储项目配置
  appStore.setProjectConfig(projCfg);

  // init dark mode  初始化暗黑模式
  updateDarkTheme(darkMode);
  if (darkMode === ThemeEnum.DARK) {
    updateHeaderBgColor();
    updateSidebarBgColor();
  } else {
    headerBgColor && updateHeaderBgColor(headerBgColor);
    bgColor && updateSidebarBgColor(bgColor);
  }
  // init store  初始化国际化多语言
  localeStore.initLocale();

  // 清理过期的缓存
  setTimeout(() => {
    clearObsoleteStorage();
  }, 16);
}

/**
 * As the version continues to iterate, there will be more and more cache keys stored in localStorage.
 * This method is used to delete useless keys
 * 清理过期的缓存
 */
export function clearObsoleteStorage() {
  const commonPrefix = getCommonStoragePrefix(); // 公共前缀
  const shortPrefix = getStorageShortName(); // 版本缓存key

  [localStorage, sessionStorage].forEach((item: Storage) => {
    Object.keys(item).forEach((key) => {
      if (key && key.startsWith(commonPrefix) && !key.startsWith(shortPrefix)) {
        item.removeItem(key);
      }
    });
  });
}
