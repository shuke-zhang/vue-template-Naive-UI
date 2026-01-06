<script setup lang="ts">
import { NButton } from 'naive-ui'
import { showMessageSuccess } from '@/utils'

// window.$message = useMessage()
function test() {
  showMessageSuccess('哈哈哈哈')
}
</script>

<template>
  <div class="app-container">
    <NButton @click="test">
      测试
    </NButton>
  </div>
</template>

<style scoped lang="scss">
</style>
