import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';

export type AccountParams = BasicPageParams & {
  account?: string;
  nickname?: string;
};

export type RoleParams = {
  roleName?: string;
  roleCode?: string;
  roleDesc?: string;
};

export type RoleEditParams = {
  roleId?: string;
  roleCode: string;
  roleName: string;
  roleDesc?: string;
  dsType: number;
  dsScope?: string;
};

export type RolePageParams = BasicPageParams & RoleParams;

export type DeptParams = {
  deptName?: string;
  status?: string;
};

export type MenuEditParams = {
  menuId?: number; //菜单id
  name: string; // 菜单名称
  type: string; // 菜单类型,0:菜单 1:按钮
  parentId: number; // 菜单父id
  sort?: number; // 排序值
  icon?: string; //菜单图标
  keepAlive?: string; //路由缓冲
  path?: string; // 前端路由标识路径
  permission?: string; // 菜单权限标识
};

export interface AccountListItem {
  id: string;
  account: string;
  email: string;
  nickname: string;
  role: number;
  createTime: string;
  remark: string;
  status: number;
}

export interface DeptListItem {
  id: string;
  orderNo: string;
  createTime: string;
  remark: string;
  status: number;
}

export interface MenuListItem {
  id: string;
  orderNo: string;
  createTime: string;
  status: number;
  icon: string;
  component: string;
  permission: string;
}

export interface RoleListItem {
  id: string;
  roleName: string;
  roleValue: string;
  status: number;
  orderNo: string;
  createTime: string;
}

/**
 * @description: Request list return value
 */
export type AccountListGetResultModel = BasicFetchResult<AccountListItem>;

export type DeptListGetResultModel = BasicFetchResult<DeptListItem>;

export type MenuListGetResultModel = BasicFetchResult<MenuListItem>;

export type RolePageListGetResultModel = BasicFetchResult<RoleListItem>;

export type RoleListGetResultModel = RoleListItem[];

/**
 * 角色实体
 * @export
 * @interface RoleItem
 */
// export interface RoleItem {
//   roleId: string;
//   roleCode: string;
//   roleName: string;
//   roleDesc?: string;
//   dsType: number;
//   dsScope?: string;
// }
