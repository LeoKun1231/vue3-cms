<template>
  <div class="line-echart">
    <base-echarts :options="options"></base-echarts>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'
import BaseEcharts from '@/base-ui/echarts'
const props = defineProps<{
  xLabels: string[]
  values: number[]
}>()
const options = computed(() => {
  return {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: props.xLabels
    },
    yAxis: {
      type: 'value'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '0%',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    series: [
      {
        data: props.values,
        name: '分别销量',
        type: 'line',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        }
      }
    ]
  }
})
</script>

<style scoped lang="less"></style>
