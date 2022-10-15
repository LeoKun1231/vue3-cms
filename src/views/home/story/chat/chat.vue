<!--
 * @Author: hqk
 * @Date: 2022-02-04 14:52:02
 * @LastEditors: hqk
 * @LastEditTime: 2022-09-15 14:41:42
 * @Description:
-->
<template>
  <div class="chat">
    <div class="input">
      <span class="title">请输入标题：</span>
      <el-input v-model="title" placeholder="请输入标题" clearable />
    </div>
    <MyEditor @click="handleClick" ref="Editor" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import MyEditor from '@/base-ui/editor'
import { useStore } from '@/store'
import { addStory } from '@/service/home/story/index'
const store = useStore()
const userName = computed(() => {
  return store.state.login.userInfo.name
})
const title = ref<string>()
const Editor = ref<InstanceType<typeof MyEditor> | null>(null)
const handleClick = (value: string) => {
  const obj = { username: userName.value, info: value, title: title.value }
  addStory(JSON.stringify(obj))
  title.value = ''
  Editor.value?.clearText()
}
</script>

<style scoped lang="less">
.title {
  width: 150px;
  height: 40px;
  line-height: 40px;
  font-weight: 600;
}
.input {
  display: flex;
  padding: 30px 10px;
}
</style>
