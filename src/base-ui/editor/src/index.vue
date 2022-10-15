<template>
  <div class="myeditor">
    <div
      style="width: 100%; height: 600 px; border: 1px solid #ccc; z-index: 999"
      :style="{
        boxShadow: `var(--el-box-shadow-dark)`
      }"
    >
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 400px; overflow-y: hidden"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
      />
    </div>
    <div class="operation">
      <el-button type="primary" @click="handleClick">提交</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import {
  onBeforeUnmount,
  ref,
  shallowRef,
  defineEmits,
  defineExpose
} from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

const emits = defineEmits<{
  (e: 'click', text: string): void
}>()

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
// 内容 HTML
const valueHtml = ref('')
const mode = 'simple'
const toolbarConfig = {}
const editorConfig = { placeholder: '请输入您的故事...' }

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor: any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
const handleClick = () => {
  emits('click', editorRef.value.getHtml())
}
const clearText = () => {
  editorRef.value.setHtml('<span></span>')
}
defineExpose({
  clearText
})
</script>

<style scoped>
.myeditor {
  text-align: left;
}
.operation {
  margin: 20px 20px 0px 0;
  padding-bottom: 20px;
  text-align: right;
}
</style>
