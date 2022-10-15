<template>
  <div class="rose-echart">
    <base-echarts :options="options"></base-echarts>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'
import BaseEcharts from '@/base-ui/echarts'

import { IDataType } from '../types'
const props = defineProps<{
  data: IDataType[]
}>()

const options = computed(() => {
  return {
    legend: {
      top: 'bottom'
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      },
      right: 0
    },
    series: [
      {
        name: '',
        type: 'pie',
        radius: [10, 80],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 5
        },
        data: props.data
      }
    ]
  }
})
</script>

<style scoped lang="less"></style>
