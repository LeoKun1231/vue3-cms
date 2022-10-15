<template>
  <div class="category">
    <page-search
      :search-form-config="searchFormConfig"
      @resetBtnClick="handlerReset"
      @queryBtnClick="handlerQuery"
    ></page-search>
    <page-content
      page-name="category"
      ref="pageContentRef"
      :content-table-config="contentTableConfig"
      @create-new="handlerCreate"
      @edit-something="handlerEdit"
      create-role="新建类别"
    ></page-content>
    <page-modal
      ref="pageModalRef"
      page-name="category"
      :default-ref="defaultRef"
      :modal-config="modalConfig"
    ></page-modal>
  </div>
</template>

<script setup lang="ts">
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageModal } from '@/hooks/usePageModal'
import { usePageSearch } from '@/hooks/usePageSearch'

const [pageModalRef, defaultRef, handlerCreate, handlerEdit] = usePageModal()
const [pageContentRef, handlerReset, handlerQuery] = usePageSearch()
</script>

<style scoped lang="less"></style>
