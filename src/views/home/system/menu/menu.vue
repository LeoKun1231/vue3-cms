<template>
  <div class="menu">
    <page-content
      :contentTableConfig="contentTableConfig"
      page-name="menu"
      create-role="新建菜单"
    ></page-content>
  </div>
</template>

<script setup lang="ts">
import PageContent from '@/components/page-content'
import { contentTableConfig } from './config/content.config'
</script>

<style scoped lang="less"></style>
