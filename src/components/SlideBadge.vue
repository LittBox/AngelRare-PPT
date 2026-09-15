<script setup>
/**
 * SlideBadge.vue
 * 共享二级标题徽章
 *
 * 视觉规范：
 * - 徽章：12px 字母间距，金/蓝色边框，透明背景
 * - 永不喧宾夺主
 */
defineProps({
  label: { type: String, required: true },
  color: { type: String, default: 'blue' }, // 'blue' | 'gold'
})
</script>

<template>
  <div class="badge" :class="'badge-' + color">
    {{ label }}
  </div>
</template>

<style scoped>
.badge {
  display: inline-block;
  padding: 6px 20px;
  border-radius: 999px;
  font-size: var(--text-xs);
  letter-spacing: 5px;
  font-weight: 400;
  border: 1px solid;
  text-transform: uppercase;
}
.badge-blue {
  background: rgba(57, 141, 255, 0.10);
  color: var(--color-blue-bright);
  border-color: rgba(57, 141, 255, 0.30);
}
.badge-gold {
  background: rgba(232, 179, 92, 0.10);
  color: var(--color-gold-bright);
  border-color: rgba(232, 179, 92, 0.30);
}
</style>
