<template>
  <div class="list">
    <page-content :contentTableConfig="contentTableConfig" pageName="story">
      <template #info="scope">
        <el-collapse accordion>
          <el-collapse-item
            :title="'《' + scope.row.title + '》--' + scope.row.username"
            name="1"
          >
            <div v-html="scope.row.info" class="info"></div>
          </el-collapse-item>
        </el-collapse>
      </template>
    </page-content>
  </div>
</template>

<script setup lang="ts">
import PageContent from '@/components/page-content'
import { contentTableConfig } from './config/content.config'
</script>

<style scoped lang="less">
.info {
  min-width: 500px;
  overflow-x: auto;
}
</style>
