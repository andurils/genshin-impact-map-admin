import type { ProjectConfig } from '/#/config';
import { MenuTypeEnum, MenuModeEnum, TriggerEnum, MixSidebarTriggerEnum } from '/@/enums/menuEnum';
import { CacheTypeEnum } from '/@/enums/cacheEnum';
import {
  ContentEnum,
  PermissionModeEnum,
  ThemeEnum,
  RouterTransitionEnum,
  SettingButtonPositionEnum,
  SessionTimeoutProcessingEnum,
} from '/@/enums/appEnum';
import { SIDE_BAR_BG_COLOR_LIST, HEADER_PRESET_BG_COLOR_LIST } from './designSetting';
import { primaryColor } from '../../build/config/themeConfig';

// TODO 注释
// ! You need to clear the browser cache after the change
/** 项目配置 */
const setting: ProjectConfig = {
  // Whether to show the configuration button  是否显示配置按钮
  showSettingButton: true,

  // Whether to show the theme switch button  是否显示主题切换按钮
  showDarkModeToggle: true,

  // `Settings` button position 配置按钮位置
  settingButtonPosition: SettingButtonPositionEnum.AUTO,

  // Permission mode 权限模式
  permissionMode: PermissionModeEnum.ROUTE_MAPPING,

  // Permission-related cache is stored in sessionStorage or localStorage 权限相关缓存存储在sessionStorage或localStorage
  permissionCacheType: CacheTypeEnum.LOCAL,

  // Session timeout processing 会话超时处理
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum.ROUTE_JUMP,

  // color  主题颜色
  themeColor: primaryColor,

  // Website gray mode, open for possible mourning dates 网站灰色模式
  grayMode: false,

  // Color Weakness Mode 色弱模式
  colorWeak: false,

  // Whether to cancel the menu, the top, the multi-tab page display, for possible embedded in other systems
  fullContent: false,

  // content mode 内容模式
  contentMode: ContentEnum.FULL,

  // Whether to display the logo 是否显示logo
  showLogo: true,

  // Whether to show footer 是否显示页脚
  showFooter: false,

  // Header configuration 顶栏配置
  headerSetting: {
    // header bg color 顶栏背景色
    bgColor: HEADER_PRESET_BG_COLOR_LIST[0],
    // Fixed at the top  固定在页面顶部
    fixed: true,
    // Whether to show top
    show: true,
    // theme  顶栏主题
    theme: ThemeEnum.LIGHT,
    // Whether to enable the lock screen function 是否启用锁屏功能
    useLockPage: true,
    // Whether to show the full screen button 是否显示全屏按钮
    showFullScreen: true,
    // Whether to show the document button 是否显示文档按钮
    showDoc: true,
    // Whether to show the notification button 是否显示通知按钮
    showNotice: true,
    // Whether to display the menu search 是否显示菜单搜索
    showSearch: true,
  },

  // Menu configuration 菜单配置
  menuSetting: {
    // sidebar menu bg color 菜单侧边栏背景色
    bgColor: SIDE_BAR_BG_COLOR_LIST[0],
    //  Whether to fix the left menu 是否固定侧边栏菜单
    fixed: true,
    // Menu collapse  菜单折叠
    collapsed: false,
    // Whether to display the menu name when folding the menu 折叠菜单显示名称
    collapsedShowTitle: false,
    // Whether it can be dragged   侧边菜单拖拽
    // Only limited to the opening of the left menu, the mouse has a drag bar on the right side of the menu
    canDrag: false,
    // Whether to show no dom
    show: true,
    // Whether to show dom
    hidden: false,
    // Menu width  菜单展开宽度
    menuWidth: 210,
    // Menu mode
    mode: MenuModeEnum.INLINE,
    // Menu type
    type: MenuTypeEnum.SIDEBAR,
    // Menu theme  主题风格
    theme: ThemeEnum.DARK,
    // Split menu
    split: false,
    // Top menu layout
    topMenuAlign: 'center',
    // Fold trigger position
    trigger: TriggerEnum.HEADER,
    // Turn on accordion mode, only show a menu
    accordion: true,
    // Switch page to close menu
    closeMixSidebarOnChange: false,
    // Module opening method ‘click’ |'hover'
    mixSideTrigger: MixSidebarTriggerEnum.CLICK,
    // Fixed expanded menu
    mixSideFixed: false,
  },

  // Multi-label
  multiTabsSetting: {
    cache: false,
    // Turn on
    show: true,
    // Is it possible to drag and drop sorting tabs
    canDrag: true,
    // Turn on quick actions
    showQuick: true,
    // Whether to show the refresh button
    showRedo: true,
    // Whether to show the collapse button
    showFold: true,
  },

  // Transition Setting
  transitionSetting: {
    //  Whether to open the page switching animation
    // The disabled state will also disable pageLoading
    enable: true,

    // Route basic switching animation
    basicTransition: RouterTransitionEnum.FADE_SIDE,

    // Whether to open page switching loading
    // Only open when enable=true
    openPageLoading: true,

    // Whether to open the top progress bar 顶部进度条
    openNProgress: true,
  },

  // Whether to enable KeepAlive cache is best to close during development, otherwise the cache needs to be cleared every time
  openKeepAlive: true,

  // Automatic screen lock time, 0 does not lock the screen. Unit minute default 0
  lockTime: 0,

  // Whether to show breadcrumbs
  showBreadCrumb: true,

  // Whether to show the breadcrumb icon
  showBreadCrumbIcon: false,

  // Use error-handler-plugin
  useErrorHandle: false,

  // Whether to open back to top
  useOpenBackTop: true,

  //  Is it possible to embed iframe pages
  canEmbedIFramePage: true,

  // Whether to delete unclosed messages and notify when switching the interface
  closeMessageOnSwitch: true,

  // Whether to cancel the http request that has been sent but not responded when switching the interface.
  // If it is enabled, I want to overwrite a single interface. Can be set in a separate interface
  removeAllHttpPending: false,
};

export default setting;
