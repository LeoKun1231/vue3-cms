/*
 * @Author: hqk
 * @Date: 2022-02-03 14:06:30
 * @LastEditors: hqk
 * @LastEditTime: 2022-09-20 15:31:43
 * @Description:
 */
import { IRootState } from '../types'
import { ILoginState } from './types'
import { ILogin } from '@/service/login/type'
import { Module } from 'vuex'

import { mapMenusToPermissions, mapMenusToRoutes } from '@/utils/map-menus'
import localCache from '@/utils/cache'

import router from '@/router'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenuByRoleId
} from '@/service/login/login'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state: () => {
    return {
      token: '',
      userInfo: {},
      userMenu: [],
      permissions: []
    }
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenu(state, userMenu: any) {
      state.userMenu = userMenu
      // 获取菜单中的路由
      const routes = mapMenusToRoutes(userMenu)
      const permissions: any = mapMenusToPermissions(userMenu)
      state.permissions = permissions
      // 将路由添加到home
      routes.forEach((route) => {
        router.addRoute('home', route)
      })
    }
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: ILogin) {
      // 1.实现登录逻辑
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      localCache.setCache('token', token)
      // 只有当有token的时候才能获取部门和角色数据
      dispatch('getInitialDataAction', null, { root: true })
      // 2.请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)

      // 3.请求用户菜单
      const userMenuResult = await requestUserMenuByRoleId(userInfo.role.id)

      const userMenu = userMenuResult.data
      console.log(userMenu)

      commit('changeUserMenu', userMenu)
      localCache.setCache('userMenu', userMenu)

      // 4.跳到首页
      router.push('/home')
    },
    // 防止刷新vuex没有数据
    // 从本地缓存中直接获取数据
    loadLocalLogin({ commit, dispatch }) {
      const actionThings = ['changeToken', 'changeUserInfo', 'changeUserMenu']
      const stateInfo = ['token', 'userInfo', 'userMenu']
      for (let i = 0; i < actionThings.length; i++) {
        const info = localCache.getCache(stateInfo[i])

        if (info) {
          // 防止退出登录后刷新报错
          // 只有当有token的时候才能获取部门和角色数据
          if (i == 0) {
            dispatch('getInitialDataAction', null, { root: true })
          }
          commit(actionThings[i], info)
        }
      }
    }
  }
}
export default loginModule
