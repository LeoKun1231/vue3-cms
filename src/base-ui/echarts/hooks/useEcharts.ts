import * as echarts from 'echarts'

import chinaMapData from '../data/china.json'

echarts.registerMap('china', chinaMapData)

export function useEcharts(el: HTMLElement) {
  const echartsInstance = echarts.init(el)
  const setOptions = (value: echarts.EChartsOption) => {
    echartsInstance.setOption(value)
  }
  const updateResize = () => {
    echartsInstance.resize()
  }

  window.addEventListener('resize', () => {
    echartsInstance.resize()
  })

  return {
    echartsInstance,
    setOptions,
    updateResize
  }
}
