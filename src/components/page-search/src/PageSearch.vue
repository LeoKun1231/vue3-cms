<template>
  <div class="page-search">
    <my-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button icon="el-icon-refresh" @click="handleResetClick"
            >重置</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleQueryClick"
            >搜索</el-button
          >
        </div>
      </template>
    </my-form>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'

import MyForm from '@/base-ui/form'

const props = defineProps({
  searchFormConfig: {
    type: Object,
    required: true
  }
})

const emits = defineEmits(['resetBtnClick', 'queryBtnClick'])

// 优化
// 动态决定formData的属性
const formItems = props.searchFormConfig?.formItem ?? []
const formOriginData = {}
for (const item of formItems) {
  formOriginData[`${item.field}`] = ''
}
const formData = ref(formOriginData)

// 重置
const handleResetClick = () => {
  formData.value = formOriginData
  emits('resetBtnClick')
}
// 搜索
const handleQueryClick = () => {
  const obj = { ...formData.value }
  emits('queryBtnClick', obj)
}
</script>

<style scoped lang="less">
.header {
  color: red;
}
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
