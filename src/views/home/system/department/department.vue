<!--
 * @Author: hqk
 * @Date: 2022-02-04 14:50:19
 * @LastEditors: hqk
 * @LastEditTime: 2022-10-15 13:18:26
 * @Description:
-->
<template>
  <div class="department">
    <page-search
      :search-form-config="searchFormConfig"
      @resetBtnClick="handlerReset"
      @queryBtnClick="handlerQuery"
    ></page-search>
    <page-content
      create-role="新建部门"
      :content-table-config="contentTableConfig"
      page-name="department"
      ref="pageContentRef"
      @create-new="handlerCreate"
      @edit-something="handlerEdit"
    ></page-content>
    <page-modal
      ref="pageModalRef"
      :modal-config="modalDataConfig"
      page-name="department"
      :default-ref="defaultRef"
      title="新建部门"
    ></page-modal>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'
import { useStore } from '@/store'

// diglog选择数据
const store = useStore()
store.dispatch('system/getPageListAction', { pageName: 'users' })
const modalDataConfig = computed(() => {
  //上级部门回显
  const parentId = modalConfig.formItem.find((item) => {
    return item.field === 'parentId'
  })
  parentId!.options = store.state.system.departmentList?.map((item) => {
    return { title: item.name, value: item.id }
  })
  //领导回显
  const leader = modalConfig.formItem.find((item) => {
    return item.field === 'leader'
  })
  leader!.options = store.state.system.usersList.map((item) => {
    return { title: item.name, value: item.name }
  })
  return modalConfig
})
const createCallBack = () => {
  return
}

// 1.监听到点击后，调用子组件page-content里面的网络请求方法
const [pageContentRef, handlerReset, handlerQuery] = usePageSearch()
const [pageModalRef, defaultRef, handlerCreate, handlerEdit] =
  usePageModal(createCallBack)
</script>

<style scoped lang="less"></style>
