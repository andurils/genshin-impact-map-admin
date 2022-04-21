import { ErrorTypeEnum } from '/@/enums/exceptionEnum';
import { MenuModeEnum, MenuTypeEnum } from '/@/enums/menuEnum';
import { RoleInfo } from '/@/api/sys/model/userModel';

// Lock screen information
export interface LockInfo {
  // Password required
  pwd?: string | undefined;
  // Is it locked?
  isLock?: boolean;
}

// Error-log information
export interface ErrorLogInfo {
  // Type of error
  type: ErrorTypeEnum;
  // Error file
  file: string;
  // Error name
  name?: string;
  // Error message
  message: string;
  // Error stack
  stack?: string;
  // Error detail
  detail: string;
  // Error url
  url: string;
  // Error time
  time?: string;
}

export interface UserInfo {
  userId: number; // 用户id
  username: string; // 用户名
  realName: string;
  avatar?: string; // 头像
  desc?: string;
  homePath?: string;
  lockFlag: string; // 锁定标记,0:正常,9:已锁定
  giteeLogin?: string; // 码云 标识
  delFlag: string; // 删除标记,1:已删除,0:正常
  roles: RoleInfo[] | number[]; // 角色
  permissions: string[]; // 权限标记
}

export interface BeforeMiniState {
  menuCollapsed?: boolean;
  menuSplit?: boolean;
  menuMode?: MenuModeEnum;
  menuType?: MenuTypeEnum;
}
