<script setup>
/**
 * SlidePlaceholder.vue
 * 占位组件 - 用于未完成设计的页面
 * 后期会逐个替换为正式组件
 */
defineProps({
  pageNum: { type: Number, required: true },
  pageTitle: { type: String, default: '待设计' }
})
</script>

<template>
  <div class="slide-placeholder">
    <div class="placeholder-box">
      <div class="placeholder-num">{{ String(pageNum).padStart(2, '0') }}</div>
      <div class="placeholder-title">{{ pageTitle }}</div>
      <div class="placeholder-hint">此页待设计</div>
    </div>
  </div>
</template>

<style scoped>
.slide-placeholder {
  width: 1920px;
  height: 1080px;
  background: #0a0a1a;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
}

.placeholder-box {
  text-align: center;
  padding: 60px 100px;
  border: 2px dashed rgba(74, 108, 247, 0.3);
  border-radius: var(--radius-lg);
  background: rgba(74, 108, 247, 0.05);
}

.placeholder-num {
  font-size: 120px;
  font-weight: 900;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: 24px;
}

.placeholder-title {
  font-size: var(--text-3xl);
  color: white;
  margin-bottom: 16px;
}

.placeholder-hint {
  font-size: var(--text-base);
  color: var(--color-text-dim);
  letter-spacing: 4px;
}
</style>
