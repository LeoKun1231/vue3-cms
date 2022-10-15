<template>
  <div class="nav-header">
    <div class="change-icon" @click="handleFold">
      <expand class="icon" v-if="isFold" />
      <fold class="icon" v-else />
    </div>
    <div class="header-content">
      <div class="left-content">
        <nav-breadcrumb :breadcrumbs="breadcrumbs"></nav-breadcrumb>
      </div>
      <UserInfo />
    </div>
  </div>
</template>

<script setup lang="ts">
import UserInfo from './cpns/UserInfo.vue'
import NavBreadcrumb from '@/base-ui/breadcrumb'
import { pathMapToMenu } from '@/utils/map-menus'

import { ref, defineEmits, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

import { Expand, Fold } from '@element-plus/icons-vue'

const emits = defineEmits<{
  (e: 'foldChange', isFold: boolean): void
}>()

const store = useStore()
const breadcrumbs = computed(() => {
  const userMenu = store.state.login.userMenu
  const route = useRoute()
  const currentPath = route.path
  return pathMapToMenu(userMenu, currentPath)
})

const isFold = ref(false)
// 菜单折叠
const handleFold = () => {
  isFold.value = !isFold.value
  emits('foldChange', isFold.value)
}
</script>

<style scoped lang="less">
.nav-header {
  width: 100%;
  display: flex;
  .change-icon {
    cursor: pointer;
    .icon {
      width: 30px;
      height: 30px;
    }
  }
  .header-content {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }
}
</style>
