<template>
  <div class="my-table">
    <div class="header">
      <div class="title">{{ title }}</div>
      <div class="handler">
        <slot name="header-handler"></slot>
      </div>
    </div>
    <el-table
      border
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-bind="childrenProps"
    >
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        align="center"
        width="50px"
      ></el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        label="序号"
        align="center"
        width="50px"
      >
      </el-table-column>
      <template v-for="prop in propList" :key="prop.prop">
        <el-table-column v-bind="prop" align="center" show-overflow-tooltip>
          <template #default="scope">
            <!-- prop.prop每一列的数据 -->
            <slot :name="prop.slotName" :row="scope.row">
              {{ scope.row[prop.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <!-- 对话框 -->
    <slot name="modal"></slot>
    <!-- 分页器 -->
    <template v-if="showFooter">
      <div class="footer">
        <slot name="footer">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.currentPage"
            :page-sizes="[10, 20, 30]"
            :page-size="page.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="listCount"
          >
          </el-pagination>
        </slot>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, PropType } from 'vue'

import { IPropList } from '../types/types'

const props = defineProps({
  // 表头标题
  title: {
    type: String,
    default: ''
  },
  // 整个table的数据
  tableData: {
    type: Object,
    required: true
  },
  // 底下分页器数
  listCount: {
    type: Number,
    default: 0
  },
  // 配置信息
  propList: {
    type: Array as PropType<IPropList[]>,
    required: true
  },
  // 是否展示序号
  showIndexColumn: {
    type: Boolean,
    default: false
  },
  // 是否展示复选框
  showSelectColumn: {
    type: Boolean,
    default: false
  },
  // 分页器数据
  page: {
    type: Object,
    default: () => ({ currentPage: 1, pageSize: 10 })
  },
  // 菜单树形折叠
  childrenProps: {
    type: Object,
    default: () => ({})
  },
  // 是否显示分页器
  showFooter: {
    type: Boolean,
    default: true
  }
})

const emits = defineEmits(['selectionChange', 'update:page'])

const handleSizeChange = (pageSize: any) => {
  emits('update:page', { ...props.page, pageSize })
}
const handleCurrentChange = (currentPage: any) => {
  emits('update:page', { ...props.page, currentPage })
}

const handleSelectionChange = (value: any) => {
  emits('selectionChange', value)
}
</script>

<style scoped lang="less">
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}

.footer {
  margin-top: 15px;

  .el-pagination {
    text-align: right;
  }
}
</style>
