<script setup>
/**
 * App 根组件
 * - 整个应用 = 浏览器视口（100vw × 100vh）
 * - 不允许任何内边距 / 外边距
 * - 内部由 Presentation.vue 渲染 PPT 放映舞台
 */
import PresentationView from '@/views/Presentation.vue'
</script>

<template>
  <div class="app-root">
    <PresentationView />
  </div>
</template>

<style scoped>
.app-root {
  /* 关键：铺满整个浏览器视口 */
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
  /* 黑底：超宽屏时左右出现电影黑边 */
  background: #000;
  /* 不允许内部撑开 */
  position: relative;
}
</style>
