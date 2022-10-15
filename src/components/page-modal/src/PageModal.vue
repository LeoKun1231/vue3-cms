<template>
  <div class="page-modal">
    <el-dialog
      v-model="dialogVisible"
      :title="title"
      width="30%"
      destroy-on-close
    >
      <my-form v-bind="modalConfig" v-model="formData" />
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineExpose, watch } from 'vue'

import myForm from '@/base-ui/form'
import { useStore } from '@/store'

const props = defineProps({
  modalConfig: {
    type: Object,
    required: true
  },
  // 默认初始化数据
  // 即每一行的数据
  defaultRef: {
    type: Object,
    default: () => ({})
  },
  pageName: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  otherInfo: {
    type: Object,
    default: () => ({})
  }
})
const dialogVisible = ref(false)
const formData = ref({})

const feeName = ref<string>('')
feeName.value = ''

watch(
  () => props.defaultRef,
  (newValue: any) => {
    // 侦听数据的变化,数据回显
    for (const item of props.modalConfig.formItem) {
      formData.value[`${item.field}`] = newValue[`${item.field}`]
    }
  }
)

const store = useStore()
// 处理确认事件
const handleConfirmClick = () => {
  dialogVisible.value = false

  if (Object.keys(props.defaultRef).length) {
    // 编辑
    store.dispatch('system/editDataListAction', {
      pageName: props.pageName,
      editData: { ...formData.value, ...props.otherInfo },
      id: props.defaultRef.id
    })
  } else {
    // 新建
    store.dispatch('system/createDataListAction', {
      pageName: props.pageName,
      newData: { ...formData.value, ...props.otherInfo }
    })
  }
}

defineExpose({
  dialogVisible
})
</script>

<style scoped lang="less"></style>
