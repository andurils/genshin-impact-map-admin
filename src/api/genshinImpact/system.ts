import {
  MenuListGetResultModel,
  RoleListGetResultModel,
  RoleEditParams,
  MenuEditParams,
  MenuParams,
  RoleMenuParams,
} from './model/systemModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  // API
  GetMenuTreeList = '/api/menu/tree',
  GetAllRoleList = '/api/role/list',
}

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
export function deleteRole(roleId: number) {
  return defHttp.delete<boolean>(
    {
      url: `/api/role/${roleId}`,
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

/**
 * @description: 获取树形菜单
 */
export const getMenuTreeList = (params?: MenuParams) =>
  defHttp.get<MenuListGetResultModel>(
    { url: Api.GetMenuTreeList, params },
    { apiUrl: '/genshin-impact', withToken: true },
  );

/**
 * @description: 获取角色菜单
 */
export const getRoleMenuList = (roleId: number) =>
  defHttp.get<number[]>(
    { url: `/api/menu/tree/${roleId}` },
    { apiUrl: '/genshin-impact', withToken: true },
  );

/**
 * @description: 分配角色菜单
 */
export function saveRoleMenus(params: RoleMenuParams) {
  return defHttp.put<boolean>(
    {
      url: '/api/role/menu',
      params,
    },
    {
      apiUrl: '/genshin-impact',
      withToken: true,
    },
  );
}
