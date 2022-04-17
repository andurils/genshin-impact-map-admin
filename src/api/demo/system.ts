import {
  AccountParams,
  DeptListItem,
  RolePageParams,
  MenuListGetResultModel,
  DeptListGetResultModel,
  AccountListGetResultModel,
  RolePageListGetResultModel,
  RoleListGetResultModel,
  RoleEditParams,
  MenuEditParams,
} from './model/systemModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  AccountList = '/system/getAccountList',
  IsAccountExist = '/system/accountExist',
  DeptList = '/system/getDeptList',
  setRoleStatus = '/system/setRoleStatus',
  RolePageList = '/system/getRoleListByPage',
  MenuList = '/system/getMenuList',

  // API
  GetMenuTreeList = '/api/menu/tree',
  GetAllRoleList = '/api/role/list',
}

export const getAccountList = (params: AccountParams) =>
  defHttp.get<AccountListGetResultModel>(
    { url: Api.AccountList, params },
    { isTransformResponse: false },
  );

export const getDeptList = (params?: DeptListItem) =>
  defHttp.get<DeptListGetResultModel>(
    { url: Api.DeptList, params },
    { isTransformResponse: false },
  );

export const getMenuList = (params?: MenuEditParams) =>
  defHttp.get<MenuListGetResultModel>(
    { url: Api.MenuList, params },
    { isTransformResponse: false },
  );

export const getRoleListByPage = (params?: RolePageParams) =>
  defHttp.get<RolePageListGetResultModel>(
    { url: Api.RolePageList, params },
    {
      apiUrl: '/genshin-impact',
      withToken: true,
    },
  );

// export const getAllRoleList = (params?: RoleParams) =>
//   defHttp.get<RoleListGetResultModel>(
//     { url: Api.GetAllRoleList, params },
//     { isTransformResponse: false },
//   );

// 角色管理API
/**
 * @description: 角色列表
 */
export const getAllRoleList = () =>
  defHttp.get<RoleListGetResultModel>(
    {
      url: Api.GetAllRoleList,
    },
    {
      apiUrl: '/genshin-impact',
      withToken: true,
    },
  );

/**
 * @description: 新增角色
 */
export function saveRole(params?: RoleEditParams) {
  return defHttp.post<boolean>(
    {
      url: '/api/role',
      params,
    },
    {
      apiUrl: '/genshin-impact',
      withToken: true,
    },
  );
}

/**
 * @description: 更新角色
 */
export function updateRole(params?: RoleEditParams) {
  return defHttp.put<boolean>(
    {
      url: '/api/role',
      params,
    },
    {
      apiUrl: '/genshin-impact',
      withToken: true,
    },
  );
}

/**
 * @description: 删除角色
 */
export function deleteRole(id: number) {
  return defHttp.delete<boolean>(
    {
      url: `/api/role/${id}`,
    },
    {
      apiUrl: '/genshin-impact',
      withToken: true,
    },
  );
}

// 菜单管理API
/**
 * @description: 新增菜单
 */
export function saveMenu(params?: MenuEditParams) {
  return defHttp.post<boolean>(
    {
      url: '/api/menu',
      params,
    },
    {
      apiUrl: '/genshin-impact',
      withToken: true,
    },
  );
}
/**
 * @description: 更新角色
 */
export function updateMenu(params?: MenuEditParams) {
  return defHttp.put<boolean>(
    {
      url: '/api/menu',
      params,
    },
    {
      apiUrl: '/genshin-impact',
      withToken: true,
    },
  );
}
/**
 * @description: 删除菜单
 */
export function deleteMenu(id: number) {
  return defHttp.delete<boolean>(
    {
      url: `/api/menu/${id}`,
    },
    {
      apiUrl: '/genshin-impact',
      withToken: true,
    },
  );
}

export const getMenuTreeList = () =>
  defHttp.get<MenuListGetResultModel>(
    { url: Api.GetMenuTreeList },
    { apiUrl: '/genshin-impact', withToken: true },
  );

export const setRoleStatus = (id: number, status: string) =>
  defHttp.post({ url: Api.setRoleStatus, params: { id, status } }, { isTransformResponse: false });

export const isAccountExist = (account: string) =>
  defHttp.post(
    { url: Api.IsAccountExist, params: { account } },
    { errorMessageMode: 'none', isTransformResponse: false },
  );
