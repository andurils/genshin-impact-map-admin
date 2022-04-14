import {
  AccountParams,
  DeptListItem,
  MenuParams,
  // RoleParams,
  RolePageParams,
  MenuListGetResultModel,
  DeptListGetResultModel,
  AccountListGetResultModel,
  RolePageListGetResultModel,
  RoleListGetResultModel,
} from './model/systemModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  AccountList = '/system/getAccountList',
  IsAccountExist = '/system/accountExist',
  DeptList = '/system/getDeptList',
  setRoleStatus = '/system/setRoleStatus',
  MenuList = '/system/getMenuList',
  RolePageList = '/system/getRoleListByPage',
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

export const getMenuList = (params?: MenuParams) =>
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

export const setRoleStatus = (id: number, status: string) =>
  defHttp.post({ url: Api.setRoleStatus, params: { id, status } }, { isTransformResponse: false });

export const isAccountExist = (account: string) =>
  defHttp.post(
    { url: Api.IsAccountExist, params: { account } },
    { errorMessageMode: 'none', isTransformResponse: false },
  );
