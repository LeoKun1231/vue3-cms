<template>
  <div class="page-content">
    <MyTable
      :tableData="userList"
      v-bind="contentTableConfig"
      :propList="contentTableConfig.propList"
      :listCount="userCount"
      v-model:page="pageInfo"
    >
      <!-- 固定的插槽 -->
      <!-- 新建类型 -->
      <template #header-handler v-if="isCreate">
        <el-button type="primary" size="medium" @click="handleCreateClick">
          {{ createRole }}
        </el-button>
      </template>

      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler="scope">
        <div class="handle-btns">
          <el-button
            v-if="isUpdate"
            @click="handleEditClick(scope.row)"
            icon="el-icon-edit"
            size="mini"
            type="text"
            >编辑</el-button
          >
          <el-button
            v-if="isDelete"
            @click="dialogVisibleTrue(scope.row)"
            icon="el-icon-delete"
            size="mini"
            type="text"
            >删除</el-button
          >
        </div>
      </template>
      <!-- 对话框 -->
      <template #modal>
        <el-dialog v-model="dialogVisible" title="提示" width="30%">
          <span>您是否确定删除?</span>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogVisible = false">取消</el-button>
              <el-button type="primary" @click="handleDeleteClick"
                >确定</el-button
              >
            </span>
          </template>
        </el-dialog></template
      >
      <template #footer></template>

      <!-- 特殊的插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </MyTable>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  ref,
  defineProps,
  defineExpose,
  watch,
  defineEmits
} from 'vue'
import { useStore } from 'vuex'

import { usePermissions } from '@/hooks/usePermissions'

import MyTable from '@/base-ui/table'

const store = useStore()
const props = defineProps({
  contentTableConfig: {
    type: Object,
    required: true
  },
  pageName: {
    type: String,
    required: true
  },
  createRole: {
    type: String,
    required: false
  }
})

const emit = defineEmits(['createNew', 'editSomething'])

// 获取操作权限
const isCreate = usePermissions(props.pageName, 'create')
let isQuery = usePermissions(props.pageName, 'query')
const isUpdate = usePermissions(props.pageName, 'update')
const isDelete = usePermissions(props.pageName, 'delete')

// 1.双向绑定pageInfo
const pageInfo = ref({ currentPage: 1, pageSize: 10 })
watch(pageInfo, () => {
  getPageData()
})

// 2.发送网络请求
const getPageData = (queryInfo: any = {}) => {
  if (props.pageName == 'story') isQuery = true
  if (!isQuery) return
  store.dispatch('system/getPageListAction', {
    pageUrl: props.pageName,
    queryInfo: {
      offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
      size: pageInfo.value.pageSize,
      ...queryInfo
    }
  })
}

getPageData()

// 3.获取vuex里面的用户列表和数目
const userList = computed(() => {
  return store.getters['system/pageListData'](props.pageName)
})
const userCount = computed(() => {
  return store.getters['system/pageListDataCount'](props.pageName)
})

// 4.获取其他的动态插槽名称
const otherPropSlots = props.contentTableConfig?.propList.filter(
  (item: any) => {
    if (item.slotName === 'createAt') return false
    if (item.slotName === 'updateAt') return false
    if (item.slotName === 'handler') return false
    return true
  }
)

// 5.用户创建/删除/修改

// 删除显示对话窗
const dialogVisible = ref(false)
const scopeRow = ref({ id: '' })
const dialogVisibleTrue = (value: any) => {
  dialogVisible.value = true
  scopeRow.value.id = { ...value }.id
}

// 删除操作
const handleDeleteClick = () => {
  store.dispatch('system/deleteDataListAction', {
    pageName: props.pageName,
    id: scopeRow.value.id
  })
  dialogVisible.value = false
}

// 创建操作
const handleCreateClick = () => {
  emit('createNew')
}

// 编辑操作
const handleEditClick = (value: any) => {
  emit('editSomething', value)
}

defineExpose({
  getPageData
})
</script>

<style scoped lang="less">
.handle-btns {
  width: 100%;
}

.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
:deep(.el-overlay) {
  background: rgba(0, 0, 0, 0.5);
}
</style>
