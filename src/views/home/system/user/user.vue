<template>
  <div class="user">
    <!-- 搜索 -->

    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handlerReset"
      @queryBtnClick="handlerQuery"
    ></page-search>
    <!-- 列表 -->
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="users"
      createRole="新建用户"
      ref="pageContentRef"
      @createNew="handlerCreate"
      @editSomething="handlerEdit"
    >
      <!-- 状态 -->
      <template #status="scope">
        <el-button
          plain
          size="mini"
          :type="scope.row.enable ? 'success' : 'danger'"
        >
          {{ scope.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
    </page-content>
    <!-- 对话框 -->
    <page-modal
      :defaultRef="defaultRef"
      ref="pageModalRef"
      pageName="users"
      title="新建用户"
      :modalConfig="modalConfigRef"
    ></page-modal>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import PageSearch from '@/components/page-search/src/PageSearch.vue'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal/src/PageModal.vue'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'
import { useStore } from '@/store'

// 1.监听到点击后，调用子组件page-content里面的网络请求方法
const [pageContentRef, handlerReset, handlerQuery] = usePageSearch()

// 2.处理对话框按需导入问题
// 另外关掉对话框需要消除
// 否则没效果
// el-dialog要添加destroy-on-close
const createCallback = () => {
  const result = modalConfig.formItem.find((item) => {
    return item.field === 'password'
  })
  result!.isHidden = false
}
const editCallback = () => {
  const result = modalConfig.formItem.find((item) => {
    return item.field === 'password'
  })
  result!.isHidden = true
}

//3.动态添加部门和角色
//  返回一个可响应的对象，vuex里面的数据只有在computed中或template中，才响应
const store = useStore()
const modalConfigRef = computed(() => {
  const departmentData = modalConfig.formItem.find(
    (item) => item.field === 'departmentId'
  )
  departmentData!.options = store.state.entireDepartment.map((item) => {
    return { title: item.name, value: item.id }
  })
  const roleData = modalConfig.formItem.find((item) => item.field === 'roleId')
  roleData!.options = store.state.entireRole.map((item) => {
    return { title: item.name, value: item.id }
  })
  return modalConfig
})

const [pageModalRef, defaultRef, handlerCreate, handlerEdit] = usePageModal(
  createCallback,
  editCallback
)
</script>

<style scoped lang="less"></style>
