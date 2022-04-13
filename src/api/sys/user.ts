import { defHttp } from '/@/utils/http/axios';
import { LoginParams, LoginResultModel } from './model/userModel';
import { ErrorMessageMode } from '/#/axios';
import qs from 'qs';
import md5 from 'js-md5';

enum Api {
  Login = '/api/oauth/token',
  Logout = '/logout',
  GetUserInfo = '/getUserInfo',
  GetPermCode = '/getPermCode',
  TestRetry = '/testRetry',
}

/**
 * @description: 用户登录
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login + '?grant_type=password',
      headers: {
        Authorization: 'Basic YXBwOmFwcA==',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify({
        username: params.username,
        password: md5(params.password),
      }),
    },
    {
      errorMessageMode: mode,
      isTransformResponse: false, // 不进行任何处理，直接返回
      apiUrl: '/genshin-impact',
    },
  );
}

/**
 * @description: getUserInfo
 */
// export function getUserInfo() {
//   return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
// }

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
  // console.log('doLogout');
}

export function testRetry() {
  return defHttp.get(
    { url: Api.TestRetry },
    {
      retryRequest: {
        isOpenRetry: true,
        count: 5,
        waitTime: 1000,
      },
    },
  );
}
