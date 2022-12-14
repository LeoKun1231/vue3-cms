import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { ISystemState } from './types'
import {
  createDataList,
  deleteListData,
  editDataList,
  getPageListData
} from '@/service/home/system/system'
import { getAllStory } from '@/service/home/story'
const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0,
      departmentList: [],
      departmentCount: 0,
      categoryList: [],
      categoryCount: 0,
      storyCount: 0,
      storyList: []
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return state[`${pageName}List`]
      }
    },
    pageListDataCount(state) {
      return (pageName: string) => {
        return state[`${pageName}Count`]
      }
    }
  },
  mutations: {
    changeUsersList(state, usersList: any[]) {
      state.usersList = usersList
    },
    changeUsersCount(state, usersCount: number) {
      state.usersCount = usersCount
    },
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount
    },
    changeGoodsList(state, goodsList: any[]) {
      state.goodsList = goodsList
    },
    changeGoodsCount(state, goodsCount: number) {
      state.goodsCount = goodsCount
    },
    changeMenuList(state, menuList: any[]) {
      state.menuList = menuList
    },
    changeMenuCount(state, menuCount: number) {
      state.menuCount = menuCount
    },
    changeDepartmentList(state, departmentList: any[]) {
      state.departmentList = departmentList
    },
    changeDepartmentCount(state, departmentCount: number) {
      state.departmentCount = departmentCount
    },
    changeCategoryList(state, categoryList: any[]) {
      state.categoryList = categoryList
    },
    changeCategoryCount(state, categoryCount: number) {
      state.categoryCount = categoryCount
    },
    changeStoryCount(state, totalCount: number) {
      state.storyCount = totalCount
    },
    changeStoryList(state, storyList: any) {
      state.storyList = storyList
    }
  },
  actions: {
    // ??????????????????
    async getPageListAction({ commit }, payload: any) {
      // ??????pageUrl
      const pageName = payload.pageUrl ?? payload.pageName
      const pageUrl = `${pageName}/list`

      const mutationsName =
        pageName.charAt(0).toLocaleUpperCase() +
        pageName.split(pageName.charAt(0))[1]
      let listResult = null
      // ?????????????????????
      if (pageName === 'story') {
        listResult = await getAllStory(payload.queryInfo)
      } else {
        listResult = await getPageListData(pageUrl, payload.queryInfo)
      }
      const { list, totalCount } = listResult.data
      // console.log(list, totalCount)

      commit(`change${mutationsName}List`, list)
      commit(`change${mutationsName}Count`, totalCount)
    },
    // ??????????????????
    async deleteDataListAction({ dispatch }, payload: any) {
      // 1.??????url
      const { id, pageName } = payload

      const pageUrl = `/${pageName}/${id}`

      // 2.??????????????????
      await deleteListData(pageUrl)

      // 3.??????????????????
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    // ????????????
    async createDataListAction({ dispatch }, payload: any) {
      const { pageName, newData } = payload
      const pageUrl = `/${pageName}`

      await createDataList(pageUrl, newData)

      // ??????????????????

      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    // ????????????
    async editDataListAction({ dispatch }, payload: any) {
      const { editData, pageName, id } = payload
      const pageUrl = `/${pageName}/${id}`
      await editDataList(pageUrl, editData)

      // ??????????????????
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}

export default systemModule
