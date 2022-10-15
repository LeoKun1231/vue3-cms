<template>
  <div class="goods">
    <PageContent
      :contentTableConfig="contentTableConfig"
      pageName="goods"
      create-role="新建产品"
    >
      <!-- 照片 -->
      <template #image="scope">
        <el-image
          style="width: 60px; height: 60px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
          :initial-index="4"
          fit="cover"
        >
        </el-image>
      </template>
      <!-- 状态 -->
      <template #status="scope">
        <el-button
          plain
          size="mini"
          :type="scope.row.status ? 'success' : 'danger'"
        >
          {{ scope.row.status ? '启用' : '禁用' }}
        </el-button>
      </template>
      <!-- 旧价格 -->
      <template #oldPrice="scope">
        {{ '￥' + scope.row.oldPrice }}
      </template>
      <!-- 新价格 -->
      <template #newPrice="scope">
        {{ '￥' + scope.row.newPrice }}
      </template>
    </PageContent>
  </div>
</template>
<script setup lang="ts">
import PageContent from '@/components/page-content'
import { contentTableConfig } from './config/content.config'
</script>

<style scoped lang="less"></style>
