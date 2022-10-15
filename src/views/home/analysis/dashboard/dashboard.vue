<template>
  <div class="dashboard">
    <!-- 1.顶部数据统计 -->
    <el-row :gutter="10">
      <template v-for="item in topPanelData" :key="item.title">
        <el-col :md="12" :lg="6" :xl="6">
          <statistical-panel :panelData="item" />
        </el-col>
      </template>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="7">
        <card title="分类商品数量(饼图)">
          <pie-echart :data="pieData"></pie-echart>
        </card>
      </el-col>
      <el-col :span="10">
        <card title="不同城市商品销量">
          <map-echart :mapData="mapData"></map-echart>
        </card>
      </el-col>
      <el-col :span="7">
        <card title="分类商品数量(玫瑰图)">
          <rose-echart :data="pieData"></rose-echart
        ></card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="bottomCard">
      <el-col :span="12">
        <card title="分类商品的销量">
          <line-echart v-bind="barData"></line-echart>
        </card>
      </el-col>
      <el-col :span="12">
        <card title="分类商品的收藏">
          <bar-echart v-bind="lineData"></bar-echart> </card
      ></el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import StatisticalPanel from '@/components/statistical-panel'
import {
  PieEchart,
  RoseEchart,
  BarEchart,
  LineEchart,
  MapEchart
} from '@/components/page-echarts'
import Card from '@/base-ui/card'

import { useStore } from '@/store'

const store = useStore()
store.dispatch('dashboard/getCategoryGoodsAction')

const topPanelData = computed(() => store.state.dashboard.topPanelDatas)
console.log(topPanelData.value)

const pieData = computed(() => {
  return store.state.dashboard.goodsCategoryCount.map((item) => {
    return { value: item.goodsCount, name: item.name }
  })
})

const barData = computed(() => {
  const xLabels: any[] = []
  const values: any[] = []
  const saleResult = store.state.dashboard.goodsSaleCount
  saleResult.forEach((item) => {
    xLabels.push(item.name)
    values.push(item.goodsCount)
  })
  return { xLabels, values }
})

const lineData = computed(() => {
  const xLabels: any[] = []
  const values: any[] = []
  const saleResult = store.state.dashboard.goodsFavorCount
  saleResult.forEach((item) => {
    xLabels.push(item.name)
    values.push(item.goodsFavor)
  })
  return { xLabels, values }
})

const mapData = computed(() => {
  return store.state.dashboard.goodsAddressSaleCount.map((item) => {
    return { name: item.address, value: item.count }
  })
})
</script>

<style scoped lang="less">
.bottomCard {
  margin-top: 25px;
}
</style>
