<template>
  <div class="login-phone">
    <el-form
      :rules="rules"
      :model="phone"
      label-width="80px"
      label-position="left"
    >
      <el-form-item prop="num" label="手机账号">
        <el-input v-model="phone.num"></el-input>
      </el-form-item>
      <el-form-item prop="verificationCode" label="验证码">
        <div class="login-send-code">
          <el-input v-model="phone.verificationCode"></el-input>
          <el-button type="primary" class="send-code">发送验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { rules } from '../config/phone-config'
const phone = reactive({
  num: '',
  verificationCode: ''
})
</script>

<style scoped lang="less">
.login-send-code {
  display: flex;
  .send-code {
    margin-left: 10px;
  }
}
</style>
