import { BasicPageParams, BasicFetchPageResult } from '/@/api/model/baseModel';

/*********** 查询参数 ***********/
// 用户分页查询参数
export type UserParams = BasicPageParams & {
  username?: string;
  // nickname?: string;
};

// 角色查询参数
export type RoleParams = {
  roleName?: string;
  roleCode?: string;
  roleDesc?: string;
};

// 菜单查询参数
export type MenuParams = {
  parentId?: number; // 菜单父id
};

/*********** 新增/更新 实体 ***********/
/*角色实体*/
export type RoleModel = {
  roleId?: number;
  roleCode: string;
  roleName: string;
  roleDesc?: string;
  dsType: number;
  dsScope?: string;
};
/*菜单实体*/
export type MenuModel = {
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

/*角色菜单实体*/
export type RoleMenuModel = {
  roleId: number;
  menuIds?: string;
};

/*用户实体*/
export type UserModel = {
  userId?: number;
  username: string;
  role: number[];
  password: string;
  newpassword1?: string;
  // giteeLogin?: string;
  lockFlag: string; // 锁定状态
  deptId?: number; // 部门
  avatar?: string;
  version?: number;
};

/*********** 查询列表实体 ***********/
// 用户列表项实体
export interface UserListItem {
  userId: number;
  username: string;
  password: string;
  avatar?: string;
  delFlag: string; // 删除标记,1:已删除,0:正常
  lockFlag: string; // 锁定标记,0:正常,9:已锁定
  roleList: RoleListItem[];
}

// 角色列表项实体
export interface RoleListItem {
  roleId: number;
  roleName: string;
  roleCode: string;
  roleDesc: string;
  dsScope: string;
  dsType: number;
}

// 菜单列表项实体
export interface MenuListItem {
  id: string;
  orderNo: string;
  createTime: string;
  status: number;
  icon: string;
  component: string;
  permission: string;
}

/**
 * @description: Request list return value
 */
export type UserPageListGetResultModel = BasicFetchPageResult<UserListItem>; // 用户分页实体
export type RoleListGetResultModel = RoleListItem[];
export type MenuListGetResultModel = MenuListItem[];
