<template>
  <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
    <el-form-item prop="name" label="账号">
      <el-input v-model="account.name"></el-input>
    </el-form-item>
    <el-form-item prop="password" label="密码">
      <el-input v-model="account.password" show-password></el-input>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import { reactive, defineExpose, ref, computed } from 'vue'

import { rules } from '../config/account-config'
import { ElForm } from 'element-plus'
import localCache from '@/utils/cache'

const nameValue = computed(() => localCache.getCache('name') ?? '')
const passwordValue = computed(() => localCache.getCache('password') ?? '')

// vuex
const store = useStore()

const account = reactive({
  name: nameValue.value,
  password: passwordValue.value
})

// 登录判断
// InstanceType拿到组件的类型
const formRef = ref<InstanceType<typeof ElForm>>()
const accountLoginAction = (isKeepPassword: boolean) => {
  formRef.value?.validate((valid) => {
    if (valid) {
      // 1.判断是否记住账号密码
      if (isKeepPassword) {
        localCache.setCache('name', account.name)
        localCache.setCache('password', account.password)
      } else {
        // 如果没有保存密码就删除
        localCache.deleteCache('name')
        localCache.deleteCache('password')
      }
      // 2.开始登录验证
      store.dispatch('login/accountLoginAction', { ...account })
    }
  })
}

defineExpose({
  accountLoginAction
})
</script>

<style scoped lang="less"></style>
