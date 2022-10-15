<!--
 * @Author: hqk
 * @Date: 2022-01-28 20:49:41
 * @LastEditors: hqk
 * @LastEditTime: 2022-09-15 14:42:00
 * @Description:
-->
<template>
  <div class="app">
    <el-config-provider :locale="locale">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
const locale = zhCn
</script>

<style lang="less">
.app {
  height: 100%;
}
</style>
