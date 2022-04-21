import type { UserInfo } from '/#/store';

/**
 * @description: 登录方法参数
 */
export interface LoginParams {
  username: string;
  password: string;
  // tenantId: string;
}

/**
 * @description: 登录用户信息
 */
export interface LoginUserInfo {
  sysUser: UserInfo;
  // 角色
  roles: number[];
  // 权限标记
  permissions: string[];
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  license: string;
  active: boolean;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  // 用户id
  userId: number;
  // 用户名
  username: string;
  // 真实名字
  realName?: string;
  // 头像
  avatar?: string;

  // 角色
  roles: number[];
  // 权限标记
  permissions: string[];
}
