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
  GetMenuTreeList = '/menu/tree',
  GetAllRoleList = '/role/list',
  GetUserPageList = '/user/page',
  ROLE = '/role',
  MENU = '/menu',
  MENU_TREE = '/menu/tree',
  ROLE_MENU = '/role/menu',
  USER = '/user',
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
      // apiUrl: '/genshin-impact',
      withToken: true,
    },
  );

/**
 * @description: 新增角色
 */
export function saveRole(params: RoleModel) {
  return defHttp.post<boolean>(
    {
      url: Api.ROLE,
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
      url: Api.ROLE,
      params,
    },
    {
      // apiUrl: '/genshin-impact',
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
      url: `${Api.ROLE}/${roleId}`,
    },
    {
      // apiUrl: '/genshin-impact',
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
      url: Api.MENU,
      params,
    },
    {
      // apiUrl: '/genshin-impact',
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
      url: Api.MENU,
      params,
    },
    {
      // apiUrl: '/genshin-impact',
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
      url: `${Api.MENU}/${menuId}`,
    },
    {
      // apiUrl: '/genshin-impact',
      withToken: true,
    },
  );
}

/**
 * @description: 获取树形菜单
 */
export const getMenuTreeList = (params?: MenuParams) =>
  defHttp.get<MenuListGetResultModel>({ url: Api.GetMenuTreeList, params }, { withToken: true });

/**
 * @description: 获取角色菜单
 */
export const getRoleMenuList = (roleId: number) =>
  defHttp.get<number[]>({ url: `${Api.MENU_TREE}/${roleId}` }, { withToken: true });

/**
 * @description: 分配角色菜单
 */
export function saveRoleMenus(params: RoleMenuModel) {
  return defHttp.put<boolean>(
    {
      url: Api.ROLE_MENU,
      params,
    },
    {
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
      withToken: true,
    },
  );

/**
 * @description: 新增角色
 */
export function saveUser(params: UserModel) {
  return defHttp.post<boolean>(
    {
      url: Api.USER,
      params,
    },
    {
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
      url: Api.USER,
      params,
    },
    {
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
      url: `${Api.USER}/${userId}`,
    },
    {
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
      url: `${Api.USER}/${userId}`,
    },
    {
      withToken: true,
    },
  );
}
