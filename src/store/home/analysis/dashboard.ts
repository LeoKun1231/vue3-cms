import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { IDashboardState } from './types'
import {
  getCategoryGoodsCount,
  getCategoryGoodsFavorCount,
  getCategoryGoodsSaleCount,
  getGoodsAddressSaleCount,
  getGoodsSaleTop10,
  getAmountList
} from '@/service/home/analysis/dashborad'

const dashboardModule: Module<IDashboardState, IRootState> = {
  namespaced: true,
  state: () => {
    return {
      goodsCategoryCount: [],
      goodsSaleCount: [],
      goodsFavorCount: [],
      goodsAddressSaleCount: [],
      goodsSaleTop10: [],
      topPanelDatas: []
    }
  },
  mutations: {
    changeTopPanelDatas(state, list) {
      state.topPanelDatas = list
    },
    changeGoodCount(state, payload) {
      state.goodsCategoryCount = payload
    },
    changeGoodSaleCount(state, payload) {
      state.goodsSaleCount = payload
    },
    changeGoodFavorCount(state, payload) {
      state.goodsFavorCount = payload
    },
    changeAddressSaleCount(state, payload) {
      state.goodsAddressSaleCount = payload
    },
    changeGoodsSaleTop10(state, list) {
      state.goodsSaleTop10 = list
    }
  },
  actions: {
    // 获取分类数据
    async getCategoryGoodsAction({ commit }) {
      const countResulet = await getCategoryGoodsCount()
      const saleResulet = await getCategoryGoodsSaleCount()
      const favorResulet = await getCategoryGoodsFavorCount()
      const addressResulet = await getGoodsAddressSaleCount()
      commit('changeGoodCount', countResulet.data)
      commit('changeGoodSaleCount', saleResulet.data)
      commit('changeGoodFavorCount', favorResulet.data)
      commit('changeAddressSaleCount', addressResulet.data)
      const saleTop10 = await getGoodsSaleTop10()
      commit('changeGoodsSaleTop10', saleTop10)
      const resultTopPanelDatas = await getAmountList()
      commit('changeTopPanelDatas', resultTopPanelDatas.data)
    }
  }
}

export default dashboardModule
