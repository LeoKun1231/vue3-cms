import { createStore, useStore as vuexStore, Store } from 'vuex'
import { IRootState, IStoreType } from './types'
import login from './login/login'
import system from './home/system/system'
import dashboard from './home/analysis/dashboard'
import { getPageListData } from '@/service/home/system/system'
const store = createStore<IRootState>({
  state() {
    return {
      name: 'leo',
      age: 18,
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  mutations: {
    changeDepartList(state, payload) {
      state.entireDepartment = payload
    },
    changeRoleList(state, payload) {
      state.entireRole = payload
    },
    changeMenuList(state, payload) {
      state.entireMenu = payload
    }
  },
  actions: {
    async getInitialDataAction({ commit }) {
      // 获取部门的所有信息
      const departDataResult = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      })
      const { list: departmentList } = departDataResult.data
      // 获取所有角色信息
      const roleDataResult = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleDataResult.data
      // 获取所有菜单信息
      const menuDataResult = await getPageListData('/menu/list', {})
      const { list: menuList } = menuDataResult.data
      commit('changeDepartList', departmentList)
      commit('changeRoleList', roleList)
      commit('changeMenuList', menuList)
    }
  },
  modules: {
    login,
    system,
    dashboard
  }
})
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}
export function useStore(): Store<IStoreType> {
  return vuexStore()
}
export default store
