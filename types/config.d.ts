import { MenuTypeEnum, MenuModeEnum, TriggerEnum, MixSidebarTriggerEnum } from '/@/enums/menuEnum';
import {
  ContentEnum,
  PermissionModeEnum,
  ThemeEnum,
  RouterTransitionEnum,
  SettingButtonPositionEnum,
  SessionTimeoutProcessingEnum,
} from '/@/enums/appEnum';

import { CacheTypeEnum } from '/@/enums/cacheEnum';

export type LocaleType = 'zh_CN' | 'en' | 'ru' | 'ja' | 'ko';

/**
 * 菜单设置
 *
 */
export interface MenuSetting {
  bgColor: string;
  fixed: boolean;
  collapsed: boolean;
  canDrag: boolean;
  show: boolean;
  hidden: boolean;
  split: boolean;
  menuWidth: number;
  mode: MenuModeEnum;
  type: MenuTypeEnum;
  theme: ThemeEnum;
  topMenuAlign: 'start' | 'center' | 'end';
  trigger: TriggerEnum;
  accordion: boolean;
  closeMixSidebarOnChange: boolean;
  collapsedShowTitle: boolean;
  mixSideTrigger: MixSidebarTriggerEnum;
  mixSideFixed: boolean;
}

/**
 * 多Tab设置
 *
 */
export interface MultiTabsSetting {
  /**
   * 是否开启缓存
   *
   * @type {boolean}
   * @memberof MultiTabsSetting
   */
  cache: boolean;
  show: boolean;
  showQuick: boolean;
  canDrag: boolean;
  showRedo: boolean;
  showFold: boolean;
}

/**
 * 顶栏设置
 *
 */
export interface HeaderSetting {
  bgColor: string;
  fixed: boolean;
  show: boolean;
  theme: ThemeEnum;
  // Turn on full screen
  showFullScreen: boolean;
  // Whether to show the lock screen
  useLockPage: boolean;
  // Show document button
  showDoc: boolean;
  // Show message center button
  showNotice: boolean;
  showSearch: boolean;
}

/**
 * 本地化设置
 *
 */
export interface LocaleSetting {
  // Whether to show the language picker 是否显示语言选择器
  showPicker: boolean;
  // Current language 当前语言
  locale: LocaleType;
  // default language 默认语言
  fallback: LocaleType;
  // available Locales 可用语言
  availableLocales: LocaleType[];
}

/**
 * 过渡动画设置
 *
 */
export interface TransitionSetting {
  //  Whether to open the page switching animation  是否开启页面切换动画
  enable: boolean;
  // Route basic switching animation 路由切换动画
  basicTransition: RouterTransitionEnum;
  // Whether to open page switching loading  是否开启页面加载动画
  openPageLoading: boolean;
  /**
   * Whether to open the top progress bar
   * 是否开启顶部进度条
   *
   * @type {boolean}
   * @memberof TransitionSetting
   */
  openNProgress: boolean;
}

/**
 * 项目配置
 *
 */
export interface ProjectConfig {
  // Storage location of permission related information  权限缓存类型 SESSION LOCAL
  permissionCacheType: CacheTypeEnum;
  // Whether to show the configuration button 是否显示配置按钮
  showSettingButton: boolean;
  // Whether to show the theme switch button  是否显示主题风格切换按钮
  showDarkModeToggle: boolean;
  // Configure where the button is displayed  配置按钮显示位置
  settingButtonPosition: SettingButtonPositionEnum;

  /**
   * Permission mode  权限模式
   * ROLE / BACK / ROUTE_MAPPING
   *
   * @type {PermissionModeEnum}
   * @memberof ProjectConfig
   */
  permissionMode: PermissionModeEnum;
  // Session timeout processing 会话超时处理方式 ROUTE_JUMP  PAGE_COVERAGE
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum;
  // Website gray mode, open for possible mourning dates  网站灰度模式
  grayMode: boolean;
  // Whether to turn on the color weak mode   是否开启颜色弱化模式
  colorWeak: boolean;
  // Theme color 主题颜色
  themeColor: string;

  // The main interface is displayed in full screen, the menu is not displayed, and the top
  fullContent: boolean;
  // content width 内容宽度
  contentMode: ContentEnum;
  // Whether to display the logo 是否显示logo
  showLogo: boolean;
  // Whether to show the global footer 是否显示全局底部
  showFooter: boolean;
  // 菜单类型
  // menuType: MenuTypeEnum;
  // Header 配置
  headerSetting: HeaderSetting;
  // menuSetting 菜单配置
  menuSetting: MenuSetting;

  /**
   * Multi-tab settings 多TAB配置
   *
   * @type {MultiTabsSetting}
   * @memberof ProjectConfig
   */
  multiTabsSetting: MultiTabsSetting;
  // Animation configuration  动画配置
  transitionSetting: TransitionSetting;
  // pageLayout whether to enable keep-alive  是否启用keep-alive
  openKeepAlive: boolean;
  // Lock screen time 锁屏时间
  lockTime: number;
  // Show breadcrumbs   是否显示面包屑
  showBreadCrumb: boolean;
  // Show breadcrumb icon   是否显示面包屑图标
  showBreadCrumbIcon: boolean;
  /**
   * Use error-handler-plugin 是否使用错误插件
   *
   * @type {boolean}
   * @memberof ProjectConfig
   */
  useErrorHandle: boolean;
  // Whether to open back to top  是否开启回到顶部
  useOpenBackTop: boolean;
  // Is it possible to embed iframe pages 是否可以嵌入iframe页面
  canEmbedIFramePage: boolean;

  /**
   * Whether to delete unclosed messages and notify when switching the interface
   * 是否在切换页面时 删除未关闭的消息通知
   * @type {boolean}
   * @memberof ProjectConfig
   */
  closeMessageOnSwitch: boolean;
  // Whether to cancel the http request that has been sent but not responded when switching the interface.
  // 是否取消未响应的http请求
  removeAllHttpPending: boolean;
}

/**
 * 全局配置
 *
 */
export interface GlobConfig {
  // Site title 站点标题
  title: string;
  // Service interface url  服务接口地址
  apiUrl: string;
  // Upload url 上传地址
  uploadUrl?: string;
  //  Service interface url prefix  服务接口地址前缀
  urlPrefix?: string;
  // Project abbreviation 项目简称
  shortName: string;
}

/**
 * 全局环境配置
 *
 */
export interface GlobEnvConfig {
  // Site title 站点标题
  VITE_GLOB_APP_TITLE: string;
  // Service interface url  服务接口地址
  VITE_GLOB_API_URL: string;
  // Service interface url prefix 服务接口地址前缀
  VITE_GLOB_API_URL_PREFIX?: string;
  // Project abbreviation   项目简称
  VITE_GLOB_APP_SHORT_NAME: string;
  // Upload url   上传地址
  VITE_GLOB_UPLOAD_URL?: string;
}
