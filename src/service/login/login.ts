import { ILogin, ILoginData } from './type'
import { IDataType } from '../types'
import myRequest from '../index'
enum LoginApi {
  AccountLogin = '/login',
  LoginUserInfo = '/users/', //用法 users/id
  UserMenu = '/role/' //用法 role/id/menu
}
export function accountLoginRequest(account: ILogin) {
  return myRequest.post<IDataType<ILoginData>>({
    url: LoginApi.AccountLogin,
    data: account
  })
}

export function requestUserInfoById(id: number) {
  return myRequest.get<IDataType>({
    url: LoginApi.LoginUserInfo + id,
    showLoading: false
  })
}

export function requestUserMenuByRoleId(id: number) {
  return myRequest.get<IDataType>({
    url: LoginApi.UserMenu + id + '/menu',
    showLoading: false
  })
}
