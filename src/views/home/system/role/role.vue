<template>
  <div class="role">
    <PageSearch
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handlerReset"
      @queryBtnClick="handlerQuery"
    ></PageSearch>
    <PageContent
      :contentTableConfig="contentTableConfig"
      pageName="role"
      createRole="新建角色"
      ref="pageContentRef"
      @createNew="handlerCreate"
      @editSomething="handlerEdit"
    ></PageContent>
    <page-modal
      :modalConfig="modalConfig"
      :defaultRef="defaultRef"
      ref="pageModalRef"
      title="新建角色"
      :otherInfo="otherInfo"
      pageName="role"
    >
      <div class="modal-tree">
        <el-tree
          :data="menuData"
          ref="elTreeRef"
          accordion
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheck"
        />
      </div>
    </page-modal>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick } from 'vue'

import PageContent from '@/components/page-content'
import PageSearch from '@/components/page-search'
import PageModal from '@/components/page-modal'

import { contentTableConfig } from './config/content.config'
import { searchFormConfig } from './config/search.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'
import { useStore } from '@/store'

import { mapLeaf } from '@/utils/map-menus'

import { ElTree } from 'element-plus'

const store = useStore()
const menuData = computed(() => store.state.entireMenu)

// 数据回显
const elTreeRef = ref<InstanceType<typeof ElTree>>()
const editCallback = (item: any) => {
  const mapResult = mapLeaf(item.menuList)
  nextTick(() => {
    elTreeRef.value?.setCheckedKeys(mapResult, false)
  })
}

const otherInfo = ref({})

// data1为全部的数据，data2为当前节点的数据
// 获取选中的菜单,并把数据传给page-modal
const handleCheck = (data1: any, data2: any) => {
  const checkedKeys = data2.checkedKeys
  const halfCheckedKeys = data2.halfCheckedKeys
  const menuList = [...checkedKeys, ...halfCheckedKeys]
  otherInfo.value = { menuList }
}
const [pageContentRef, handlerReset, handlerQuery] = usePageSearch()
const [pageModalRef, defaultRef, handlerCreate, handlerEdit] = usePageModal(
  undefined,
  editCallback
)
</script>

<style scoped lang="less">
.modal-tree {
  margin-left: 25px;
}
</style>
