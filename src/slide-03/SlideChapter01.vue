<script setup>
/**
 * SlideChapter01.vue
 * 第一章扉页：个人成长
 *
 * 类型：section（一级章节扉页）
 * 视觉规范：极简，仅显示章节编号 + 章节名 + 引导语
 *
 * 文案铁律遵守检查：
 * ✅ 章节名 = 「个人成长」（来自 Page Manifest）
 * ✅ 章节编号 = 「01」
 * ✅ 引导语可调整（不是 Slogan）
 */
import { ref } from 'vue'

// ============== 定稿文案（不可修改） ==============
const sectionIndex = ref('01')
const sectionTitle = ref('个人成长')
const leadText = ref('从真实问题中成长，在创新实践中成为更好的问题解决者')
</script>

<template>
  <div class="slide-chapter">
    <div class="chapter-inner">
      <div class="chapter-index">{{ sectionIndex }}</div>
      <h1 class="chapter-title">{{ sectionTitle }}</h1>
      <div class="chapter-divider"></div>
      <p class="chapter-lead">{{ leadText }}</p>
    </div>
  </div>
</template>

<style scoped>
.slide-chapter {
  width: 1920px;
  height: 1080px;
  background: radial-gradient(ellipse at center, #0a0a2a 0%, #000010 100%);
  color: white;
  font-family: var(--font-display);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.chapter-inner {
  text-align: center;
  position: relative;
  z-index: 2;
}

.chapter-index {
  font-size: 160px;
  font-weight: 900;
  line-height: 1;
  background: linear-gradient(135deg, #4a6cf7 0%, #00d4ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: var(--font-mono);
  letter-spacing: 8px;
  margin-bottom: 40px;
}

.chapter-title {
  font-size: 140px;
  font-weight: 800;
  letter-spacing: 24px;
  margin: 0;
  background: linear-gradient(135deg, #ffffff 0%, #4a6cf7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.chapter-divider {
  width: 200px;
  height: 4px;
  background: linear-gradient(90deg, transparent, #00d4ff, transparent);
  margin: 60px auto;
}

.chapter-lead {
  font-size: 32px;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 300;
  letter-spacing: 6px;
  max-width: 1200px;
  margin: 0 auto;
  line-height: 1.6;
}
</style>
