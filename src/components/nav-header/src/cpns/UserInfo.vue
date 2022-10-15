<template>
  <div>
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar :size="30" :src="circleUrl" class="icon-avatar"></el-avatar>
        <span>{{ userName }}</span>
        <span class="userName">
          <arrow-down class="el-icon--right" />
        </span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="el-icon-circle-close" @click="handleExitClick"
            >退出登录</el-dropdown-item
          >
          <el-dropdown-item icon="el-icon-user">用户信息</el-dropdown-item>
          <el-dropdown-item icon="el-icon-edit">系统管理</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue'
import { computed } from 'vue'

import { useStore } from '@/store'
import localCache from '@/utils/cache'
import { useRouter } from 'vue-router'
const circleUrl =
  'http://mms1.baidu.com/it/u=3268960684,2039862071&fm=253&app=138&f=JPEG&fmt=auto&q=75?w=360&h=360'
const store = useStore()
const userName = computed(() => {
  return store.state.login.userInfo.name
})

const router = useRouter()
const handleExitClick = () => {
  localCache.deleteCache('token')
  router.push('/main')
}
</script>

<style scoped lang="less">
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
.el-dropdown-link:hover {
  color: var(--el-color-primary);
}
.el-icon--right {
  width: 10px;
  height: 10px;
}

.icon-avatar {
  vertical-align: middle;
  margin-right: 5px;
}
</style>
