import type { UserInfo } from '/#/store';
import type { ErrorMessageMode } from '/#/axios';
import { defineStore } from 'pinia';
import { store } from '/@/store';
import { PageEnum } from '/@/enums/pageEnum';
import { ROLES_KEY, TOKEN_KEY, USER_INFO_KEY } from '/@/enums/cacheEnum';
import { getAuthCache, setAuthCache } from '/@/utils/auth';
import { GetUserInfoModel, LoginParams } from '/@/api/sys/model/userModel';
import { doLogout, getUserInfo, loginApi } from '/@/api/sys/login';
import { useI18n } from '/@/hooks/web/useI18n';
import { useMessage } from '/@/hooks/web/useMessage';
import { router } from '/@/router';
import { usePermissionStore } from '/@/store/modules/permission';
import { RouteRecordRaw } from 'vue-router';
import { PAGE_NOT_FOUND_ROUTE } from '/@/router/routes/basic';
// import { isArray } from '/@/utils/is';
import { h } from 'vue';

interface UserState {
  userInfo: Nullable<UserInfo>;
  token?: string;
  roleList: number[];
  sessionTimeout?: boolean;
  lastUpdateTime: number;
}

/** 用户状态信息存储  */
export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    // user info
    userInfo: null,
    // token
    token: undefined,
    // roleList
    roleList: [],
    // Whether the login expired   登录是否过期
    sessionTimeout: false,
    // Last fetch time 最后更新时间
    lastUpdateTime: 0,
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || getAuthCache<UserInfo>(USER_INFO_KEY) || {};
    },
    getToken(): string {
      return this.token || getAuthCache<string>(TOKEN_KEY);
    },
    /**
     * 获取用户角色列表
     *
     * @return {*}  {RoleEnum[]}
     */
    getRoleList(): number[] {
      return this.roleList.length > 0 ? this.roleList : getAuthCache<number[]>(ROLES_KEY);
    },
    getSessionTimeout(): boolean {
      return !!this.sessionTimeout;
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime;
    },
  },
  actions: {
    setToken(info: string | undefined) {
      this.token = info ? info : ''; // for null or undefined value
      setAuthCache(TOKEN_KEY, info);
    },
    /**
     * 设置用户角色列表 RoleEnum[] 转换为 number[]
     *
     * @param {number[]} roleList
     */
    setRoleList(roleList: number[]) {
      this.roleList = roleList;
      setAuthCache(ROLES_KEY, roleList);
    },
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info;
      this.lastUpdateTime = new Date().getTime();
      setAuthCache(USER_INFO_KEY, info);
    },
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag;
    },
    resetState() {
      this.userInfo = null;
      this.token = '';
      this.roleList = [];
      this.sessionTimeout = false;
    },
    /**
     * @description: login
     */
    async login(
      params: LoginParams & {
        goHome?: boolean;
        mode?: ErrorMessageMode;
      },
    ): Promise<GetUserInfoModel | null> {
      try {
        const { goHome = true, mode, ...loginParams } = params;
        const data = await loginApi(loginParams, mode);

        const { access_token } = data;
        this.setToken(access_token); // save token

        return this.afterLoginAction(goHome);
      } catch (error) {
        return Promise.reject(error);
      }
    },

    /**
     * @description: 用户登录后,获取用户信息、鉴权等操作
     * @param {boolean} [goHome]
     * @return {*}  {(Promise<GetUserInfoModel | null>)}
     */
    async afterLoginAction(goHome?: boolean): Promise<GetUserInfoModel | null> {
      if (!this.getToken) return null;
      // get user info
      const userInfo = await this.getUserInfoAction();

      const sessionTimeout = this.sessionTimeout;
      if (sessionTimeout) {
        this.setSessionTimeout(false);
      } else {
        // 路由鉴权
        const permissionStore = usePermissionStore();
        if (!permissionStore.isDynamicAddedRoute) {
          // 获取路由配置、生成菜单配置
          const routes = await permissionStore.buildRoutesAction();
          routes.forEach((route) => {
            router.addRoute(route as unknown as RouteRecordRaw);
          });
          router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw);
          permissionStore.setDynamicAddedRoute(true);
        }
        goHome && (await router.replace(userInfo?.homePath || PageEnum.BASE_HOME));
      }
      console.log('afterLoginAction', userInfo);
      return userInfo as GetUserInfoModel;
    },

    /**
     * @description: 根据 token 获取用户信息
     */
    async getUserInfoAction(): Promise<UserInfo | null> {
      if (!this.getToken) return null;
      const data = await getUserInfo();

      const { sysUser: userInfo, permissions = [], roles = [] } = data;
      userInfo.roles = roles;
      userInfo.permissions = permissions;
      // 数据处理
      userInfo.avatar = undefined; // 使用默认头像
      userInfo.realName = userInfo.username;
      this.setRoleList(roles);
      this.setUserInfo(userInfo);
      return userInfo;
    },

    /**
     * @description: 用户注销
     */
    async logout(goLogin = false) {
      this.setToken(undefined);
      this.setSessionTimeout(false);
      this.setUserInfo(null);
      goLogin && router.push(PageEnum.BASE_LOGIN);
    },

    /**
     * @description: Confirm before logging out
     */
    confirmLoginOut() {
      const { createConfirm } = useMessage();
      const { t } = useI18n();
      createConfirm({
        iconType: 'warning',
        title: () => h('span', t('sys.app.logoutTip')),
        content: () => h('span', t('sys.app.logoutMessage')),
        onOk: async () => {
          await this.logout(true);
        },
      });
    },
  },
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}
