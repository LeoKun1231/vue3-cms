<template>
  <div class="base-echarts">
    <div ref="divRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, withDefaults, watchEffect } from 'vue'

import { useEcharts } from '../hooks/useEcharts'

const props = withDefaults(
  defineProps<{
    options: any
    width?: string
    height?: string
  }>(),
  {
    width: '100%',
    height: '350px'
  }
)

const divRef = ref<HTMLElement>()

onMounted(() => {
  const { setOptions } = useEcharts(divRef.value!)
  watchEffect(() => {
    setOptions(props.options)
  })
})
</script>

<style scoped lang="less"></style>
