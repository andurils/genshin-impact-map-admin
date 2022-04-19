import {
  MenuListGetResultModel,
  RoleListGetResultModel,
  MenuParams,
  UserParams,
  UserPageListGetResultModel,
  RoleMenuModel,
  RoleModel,
  MenuModel,
  UserModel,
} from './model/systemModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  // API
  GetMenuTreeList = '/api/menu/tree',
  GetAllRoleList = '/api/role/list',
  GetUserPageList = '/api/user/page',
}

/********************** 角色管理API **********************/
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
export function saveRole(params: RoleModel) {
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
export function updateRole(params: RoleModel) {
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

/********************** 菜单管理API **********************/
/**
 * @description: 新增菜单
 */
export function saveMenu(params: MenuModel) {
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
export function updateMenu(params: MenuModel) {
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
export function deleteMenu(menuId: number) {
  return defHttp.delete<boolean>(
    {
      url: `/api/menu/${menuId}`,
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
export function saveRoleMenus(params: RoleMenuModel) {
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

/********************** 用户管理 API **********************/
/**
 * @description: 获取用户分页列表
 */
export const getUserPageList = (params: UserParams) =>
  defHttp.get<UserPageListGetResultModel>(
    { url: Api.GetUserPageList, params },
    {
      apiUrl: '/genshin-impact',
      withToken: true,
    },
  );

/**
 * @description: 新增角色
 */
export function saveUser(params: UserModel) {
  return defHttp.post<boolean>(
    {
      url: '/api/user',
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
export function updateUser(params: UserModel) {
  return defHttp.put<boolean>(
    {
      url: '/api/user',
      params,
    },
    {
      apiUrl: '/genshin-impact',
      withToken: true,
    },
  );
}

/**
 * @description: 删除用户
 */
export function deleteUser(userId: number) {
  return defHttp.delete<boolean>(
    {
      url: `/api/user/${userId}`,
    },
    {
      apiUrl: '/genshin-impact',
      withToken: true,
    },
  );
}

/**
 * @description: 获取用户信息
 */
export function getUser(userId: number) {
  return defHttp.get<UserModel>(
    {
      url: `/api/user/${userId}`,
    },
    {
      apiUrl: '/genshin-impact',
      withToken: true,
    },
  );
}

// export const setUserLockStatus = (id: number, status: string) =>
//   defHttp.post({ url: Api.setRoleStatus, params: { id, status } }, { isTransformResponse: false });
