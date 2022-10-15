<template>
  <div class="pie-echart">
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
    title: {
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {},
    series: [
      {
        name: '',
        type: 'pie',
        radius: '60%',
        data: props.data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})
</script>

<style scoped lang="less"></style>
