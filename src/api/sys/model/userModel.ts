/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string;
  password: string;
  // tenantId: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  // userId: string | number;
  // token: string;
  // role: RoleInfo;

  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  license: string;
  active: boolean;
  user_info: UserInfoModel;
}

/**
 * @description: 用户信息
 */
export interface UserInfoModel {
  id: number;
  username: string;
  deptId: number;
  avatar: string;
  authorities: Authorities[] | undefined;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  enabled: boolean;
}

/**
 * @description: 用户授权
 */
export interface Authorities {
  authority: string;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  roles: RoleInfo[];
  // 用户id
  userId: string | number;
  // 用户名
  username: string;
  // 真实名字
  realName: string;
  // 头像
  avatar?: string;
  // 介绍
  desc?: string;
}
