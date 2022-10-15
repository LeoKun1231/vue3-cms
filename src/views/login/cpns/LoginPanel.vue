<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs
      type="border-card"
      class="demo-tabs"
      stretch
      v-model="currentTabs"
      @tab-click="handleClick"
    >
      <el-tab-pane name="account">
        <template #label>
          <span> <i class="el-icon-user-solid"></i>登录账号 </span>
        </template>
        <LoginAccount ref="accountRef"></LoginAccount>
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span> <i class="el-icon-mobile-phone"></i>手机登录 </span>
        </template>
        <LoginPhone ref="phoneRef"></LoginPhone>
      </el-tab-pane>
    </el-tabs>
    <div class="account-control" v-show="isShowAccount">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码?</el-link>
    </div>
    <div class="account-control" v-show="!isShowAccount">
      <el-checkbox v-model="isKeepPhone">记住手机账号</el-checkbox>
    </div>
    <el-button type="primary" class="login-button" @click="HandlerLogin"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts" setup>
import LoginAccount from './LoginAccount.vue'
import LoginPhone from './LoginPhone.vue'
import { ref } from 'vue'

// 自定义属性
const isShowAccount = ref(true)
const isKeepPassword = ref(false)
const isKeepPhone = ref(false)
const currentTabs = ref('account')
const accountRef = ref<InstanceType<typeof LoginAccount>>()
const phoneRef = ref<InstanceType<typeof LoginPhone>>()

// tabs切换改变记住内容
let lastTabs = 'account'
const handleClick = () => {
  if (currentTabs.value === lastTabs) {
    return
  }
  isShowAccount.value = !isShowAccount.value
  lastTabs = currentTabs.value
}

// 立即登录处理
const HandlerLogin = () => {
  // 账号登录
  if (currentTabs.value === 'account') {
    accountRef.value?.accountLoginAction(isKeepPassword.value)
  } else {
    // 手机登录
  }
}
</script>

<style scoped lang="less">
.login-panel {
  width: 320px;
  margin-bottom: 120px;
  .title {
    text-align: center;
  }
  .account-control {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
  .login-button {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
